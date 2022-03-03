import {useState} from 'react';

const useFormComment = validate => {
    const [commentValues, setCommentValues] = useState({
        content: ''
    })

    const [errors, setErrors] = useState({})
    const [isDisabledComment, setIsDisabledComment] = useState(true)
    const [isRedirectingComment, setIsRedirectingComment] = useState(false)

    const handleCommentChange = e => {
        const {name, value} = e.target
        setCommentValues({
            ...commentValues,
            [name]: value
        })

        setErrors(validate(commentValues))

        if(errors.content != ''){
            setIsDisabledComment(true)
        }
        
        if(commentValues.content != ''){
            setIsDisabledComment(false)
        }
    };

    const handleCommentSubmit = e => {
        const {content} = commentValues

        if((content == '' || errors.content != '')){
            e.preventDefault()
        } 

        if(content){
            setIsRedirectingComment(true)
            const posts = JSON.parse(localStorage.getItem('postsList'))
            const obj = posts.filter(item => item.id === commentValues.post_id)[0]

            let index = posts.indexOf(obj, 0)
            const commentId = posts[index].comments.length

            const newComment = {
                id: (commentId + 1),
                user_id: commentValues.user_id,
                content: commentValues.content,
                username: commentValues.username
            }

            obj.comments.push(newComment)

            posts.splice(index, 1, obj)

            localStorage.setItem('postsList', JSON.stringify(posts))

            window.location.reload()
        
        }
        
        setErrors(validate(commentValues))
    }

    return { handleCommentChange, setCommentValues, commentValues, handleCommentSubmit, errors, isDisabledComment, isRedirectingComment }
};

export default useFormComment;