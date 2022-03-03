import {useState} from 'react';
import swal from 'sweetalert';


const useFormEditComment = validate => {
    const [editedCommentValues, setEditedCommentValues] = useState({
        content: '',
    })

    const [errors, setErrors] = useState({})
    const [isDisabledEditComment, setisDisabledEditComment] = useState(true)
    const [isRedirectingEditComment, setisRedirectingEditComment] = useState(false)

    const handleEditionComment = (e) => {
        const {name, value} = e.target

        setEditedCommentValues({
            ...editedCommentValues,
            [name]: value
        })

        setErrors(validate(editedCommentValues))

        if(errors.content != ''){
            setisDisabledEditComment(true)
        }
        
        if(editedCommentValues.content != ''){
            setisDisabledEditComment(false)
        }
    };

    const handleSubmitEditComment = e => {
        const {content} = editedCommentValues

        if((content == '' || errors.content != '')){
            e.preventDefault()
        } 

        if(content){
            setisRedirectingEditComment(true)

            const allPosts = JSON.parse(localStorage.getItem('postsList'))

            //AntigoPost
            let obj = allPosts.filter(item => item.id === editedCommentValues.post_id)[0]

            //AntigoComentário
            let oldComment = obj.comments.filter(item => item.id === editedCommentValues.id)
            let postIndex = allPosts.indexOf(obj, 0)
            let commentIndex = obj.comments.indexOf(oldComment, 0)

            const editedComment = {
                id: editedCommentValues.id,
                user_id: editedCommentValues.user_id,
                content: editedCommentValues.content,
                username: editedCommentValues.username
            }

            obj.comments.splice(commentIndex, 1, editedComment)

            allPosts.splice(postIndex, 1, obj)

            localStorage.setItem('postsList', JSON.stringify(allPosts))

            window.location.reload()
        
        }
        
        setErrors(validate(editedCommentValues))
    }

    return { handleEditionComment, editedCommentValues, setEditedCommentValues, handleSubmitEditComment, errors, isDisabledEditComment,isRedirectingEditComment }
}; 

export default useFormEditComment;