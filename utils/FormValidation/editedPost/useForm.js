import {useState} from 'react';
import swal from 'sweetalert';


const useFormEdit = validate => {
    const [editedValues, setEditedValues] = useState({
        postTitle: '',
        postContent: '',
    })

    const [errors, setErrors] = useState({})
    const [isDisabledEdit, setIsDisabledEdit] = useState(true)
    const [isRedirectingEdit, setIsRedirectingEdit] = useState(false)

    const handleEdition = (e) => {
        const {name, value} = e.target

        setEditedValues({
            ...editedValues,
            [name]: value
        })

        setErrors(validate(editedValues))

        if(errors.postTitle != '' || errors.postContent != ''){
            setIsDisabledEdit(true)
        }
        
        if(editedValues.postTitle != '' && editedValues.postContent != ''){
            setIsDisabledEdit(false)
        }
    };

    const handleSubmitEdit = e => {
        const {postTitle, postContent} = editedValues

        if((postTitle == '' || errors.postTitle != '') || (postContent == '' || errors.postContent != '') 
        ){
            e.preventDefault()
        } 

        if(postTitle && postContent){
            setIsRedirectingEdit(true)

            const editedPost = {
                id: editedValues.id,
                user_id: editedValues.user_id,
                
                title: postTitle,
                content: postContent,
                
                username: editedValues.username,
                date: editedValues.date,
                comments: editedValues.comments
            }

            const allPosts = JSON.parse(localStorage.getItem('postsList'))
    
            let obj = allPosts.filter(item => item.id === editedValues.id)[0]

            let index = allPosts.indexOf(obj, 0)

            allPosts.splice(index, 1, editedPost)
            
            localStorage.setItem('postsList', JSON.stringify(allPosts))
        
            swal("Post editado com sucesso!", {
                icon: "success",
            });

                window.location.reload()
        
        }
        
        setErrors(validate(editedValues))
    }

    return { handleEdition, editedValues, setEditedValues, handleSubmitEdit, errors, isDisabledEdit, isRedirectingEdit }
};

export default useFormEdit;