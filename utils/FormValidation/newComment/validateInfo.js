export default function validateInfoPost(values){
    let errors = {}

    if(values.content.length > 2) {
        errors.content = ""
    }

    return errors;
}