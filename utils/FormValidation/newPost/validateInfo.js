export default function validateInfoPost(values){
    let errors = {}

    if(values.postTitle.length > 2) {
        errors.postTitle = ""
    }

    //Content
    if(values.postContent.length) {
        errors.postContent = ""
    }

    return errors;
}