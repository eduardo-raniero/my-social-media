export default function validateInfoLogin(values){
    let errors = {}

    if(!values.Username.trim()){
        errors.Username = "Username é obrigatório*"
    }  else if(values.Username.length > 2) {
        errors.Username = ""
    }

    //Password
    if(!values.Password){
        errors.Password = "Senha é obrigatório*"
    } else if(values.Username.length) {
        errors.Username = ""
    }

    return errors;
}