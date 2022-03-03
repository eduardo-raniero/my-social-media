import {useState} from 'react';
import useRouter from 'next/router';
import swal from 'sweetalert';


const useFormLogin = validate => {
    const [values, setValues] = useState({
        Username: '',
        Password: '',
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

        if(errors.Username != '' || errors.Password != ''){
            setIsDisabled(true)
        }
        
        if(values.Username != '' && values.Password != ''){
            setIsDisabled(false)
        }
    };

    const handleSubmit = e => {
        
        if(localStorage.getItem('usersList') === null){
            localStorage.setItem('usersList', '[]')
        }
        
        const {Username, Password} = values

        if((Username == '' || errors.Username != '') || (Password == '' || errors.Password != '') 
        ){
            e.preventDefault()
        } 

        if(Username && Password){
            
            const usersList = JSON.parse(localStorage.getItem('usersList'))

            let obj = usersList.filter(obj => obj.username === Username && obj.password === Password)

            if(obj.length === 0){
                swal("Erro!", "As credenciais fornecidas não conferem com as cadastradas", "error");
            }

            if(obj.length > 0){
                setIsRedirecting(true)
                localStorage.setItem('loggedUser', JSON.stringify(obj))
                useRouter.push('/postagens');
            }
        
        }
        
        setErrors(validate(values))
    }

    return { handleChange, values, handleSubmit, errors, isDisabled, isRedirecting }
};

export default useFormLogin;