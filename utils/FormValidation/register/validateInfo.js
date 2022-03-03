export default function validateInfo(values){
    let errors = {}

    if(!values.Name.trim()){
        errors.Name = "Nome é obrigatório*"
    }   else if(values.Name.length < 2){
        errors.Name = "Nome muito curto"
    }   else if(values.Name.length > 99){
        errors.Name = "Nome muito longo"
    }   else if(values.Name.length > 2){
        errors.Name = ""
    }

    if(!values.Username.trim()){
        errors.Username = "Username é obrigatório*"
    }  else if(values.Username.length < 2) {
        errors.Username = "Username muito curto*"
    }  else if(values.Username.length > 191) {
        errors.Username = "Muito longo*"
    }  else if(values.Username.length > 2) {
        errors.Username = ""
    }

    if(!values.Password){
        errors.Password = "Senha é obrigatório*"
    } else if(values.Username.length < 3) {
        errors.Username = "Senha muito curta*"
    } else if(values.Username.length > 191) {
        errors.Username = "Senha muito longa*"
    } else if(values.Username.length > 2) {
        errors.Username = ""
    }

    return errors;
}