import {useState} from 'react';

//NEXT
import useRouter from 'next/router';

//POPUP
import swal from 'sweetalert';

const useForm = validate => {
    const [values, setValues] = useState({
        id: '',
        Name: '',
        Username: '',
        Password: '',
    })
    const [errors, setErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        setErrors(validate(values))

        if(errors.Name != '' || errors.Username != '' || errors.Password != ''){
            setIsDisabled(true)
        }
        
        if(values.Name != '' && values.Username != '' && values.Password != ''){
            setIsDisabled(false)
        }
    };

    const handleSubmit = e => {
        const {Name, Username, Password} = values

        if((Name == '' || errors.Name != '') || (Username == '' || errors.Username != '') || (Password == '' || errors.Password != '')){
            e.preventDefault()
        } 
        
        if(Name && Username && Password){
            
            const usersLength = JSON.parse(localStorage.getItem('usersList')).length
            
            const newUser = {
                id: (usersLength + 1),
                name: Name,
                username: Username,
                password: Password
            }

            let oldData = JSON.parse(localStorage.getItem('usersList'))
            const obj = oldData.filter(item => item.username === newUser.username)

            if(obj.length > 0){
                swal("Ops", "Esse nome de usuário já foi escolhido por outra pessoa, tente outro!", "error")
                setErrors(validate(values))
            }
            
            if(obj.length === 0){
                oldData.push(newUser)
                
                localStorage.setItem('usersList', JSON.stringify(oldData))
                swal("Parabéns!", "Seu usuário foi cadastrado com sucesso!", "success")
                useRouter.push('/')

            }

        }
        
        setErrors(validate(values))
    }

    return { handleChange, values, handleSubmit, errors, isDisabled }
};

export default useForm;