import { useEffect } from 'react';

//formValidation
import useForm from '../../utils/FormValidation/register/useForm';
import validateInfo from '../../utils/FormValidation/register/validateInfo';

//CSS
import styles from './register.module.scss'

export default function Register(){
    const { handleChange, values, handleSubmit, errors, isDisabled } = useForm(validateInfo);
    
    useEffect(() => {
      
      if(localStorage.getItem('usersList') == null){
        localStorage.setItem('usersList', '[]')
      }

    }, []);

    return (
      <div className={styles.alignBox}>
        <img       
          src="./logo-main.svg"
          alt="Picture of the author"
          style={{marginBottom: '1.6rem'}}
          className={styles.logo}
        />
        <div className={styles.whiteBox}>
          <form method='POST' onSubmit={handleSubmit}>
            <input 
              onChange={handleChange}
              onMouseEnter={handleChange} 
              value={values.Name} 
              type="text" 
              name="Name" 
              id="Name" 
              placeholder='Nome' 
            />
            {errors.Name && <small> {errors.Name} </small>}
            
            <input 
              onChange={handleChange}
              onMouseEnter={handleChange} 
              value={values.Username} 
              type="text" 
              name="Username" 
              id="Username" 
              placeholder='Username' 
            />
            {errors.Username && <small> {errors.Username} </small>}
  
  
            <input 
              onChange={handleChange}
              onMouseEnter={handleChange}  
              value={values.Password} 
              type="password" 
              name="Password" 
              id="Password" 
              placeholder='Senha' 
            />
            {errors.Password && <small> {errors.Password} </small>}
  
  
            <button type='submit' disabled={isDisabled}>Cadastrar</button>
          </form>
        </div>
      </div>
    )
}