//formValidation
import useFormLogin from '../utils/FormValidation/login/useForm';
import validateInfoLogin from '../utils/FormValidation/login/validateInfo';

//CSS
import styles from '../styles/Home.module.scss'

export default function Home() {
  const { handleChange, values, handleSubmit, errors, isDisabled, isRedirecting } = useFormLogin(validateInfoLogin);

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


          <button type='submit' disabled={isDisabled}> {isRedirecting ? 'Entrando...' : 'Entrar'} </button>
        </form>
        <br />
        <small>Ainda não é cadastrado? <a href={'/cadastrar'}>Cadastre aqui</a> </small>
      </div>
    </div>
  )
}
