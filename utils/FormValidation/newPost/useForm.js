import {useState} from 'react';

const useFormPost = validate => {
    const [values, setValues] = useState({
        postTitle: '',
        postContent: '',
    })

    const [errors, setErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)
    const [isRedirecting, setIsRedirecting] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })

        setErrors(validate(values))

        if(errors.postTitle != '' || errors.postContent != ''){
            setIsDisabled(true)
        }
        
        if(values.postTitle != '' && values.postContent != ''){
            setIsDisabled(false)
        }
    };

    const handleSubmit = e => {
        const {postTitle, postContent} = values

        if((postTitle == '' || errors.postTitle != '') || (postContent == '' || errors.postContent != '') 
        ){
            e.preventDefault()
        } 

        if(postTitle && postContent){
            setIsRedirecting(true)
            const currentUser = JSON.parse(localStorage.getItem('loggedUser'))
            const postsLength = JSON.parse(localStorage.getItem('postsList')).length

            //Get current time for the post
            let today = new Date();

            let time = today.getHours() + ":" + today.getMinutes()

            const newPost = {
                id: (postsLength + 1),
                user_id: currentUser[0].id,
                title: postTitle,
                content: postContent,
                username: currentUser[0].username,
                date: time,
                comments: []
            }

            let oldData = JSON.parse(localStorage.getItem('postsList'))
            oldData.push(newPost)

            localStorage.setItem('postsList', JSON.stringify(oldData))

            window.location.reload()
        
        }
        
        setErrors(validate(values))
    }

    return { handleChange, values, handleSubmit, errors, isDisabled, isRedirecting }
};

export default useFormPost;