export default function validateInfoPost(editedValues){
    let errors = {}

    if(editedValues.postTitle.length > 2) {
        errors.postTitle = ""
    }

    //Content
    if(editedValues.postContent.length) {
        errors.postContent = ""
    }

    return errors;
}