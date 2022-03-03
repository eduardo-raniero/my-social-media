export default function validateInfoPost(editedValues){
    let errors = {}

    if(editedValues.content.length > 2) {
        errors.content = ""
    }

    return errors;
}