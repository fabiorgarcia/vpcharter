import { useState } from "react";
import '../components/Login.css'
import hero from "../assets/logo-vp.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Globals from '../components/Globals'
import { CookiesProvider, useCookies } from "react-cookie";


const RecuperarSenha = () => {

  const navigate = useNavigate()
  var endpoint = Globals.endPoint;

  const [isLoggedIn, setIsLoggedIn] = useState (false);
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [emailError, setEmailError] = useState (false);
  const [titleError, setTitleError] = useState ('');
  const [txtError, setTxtError] = useState ('');
  const [password, setPassword] = useState ('');
  const [passwordlError, setPasswordError] = useState (false);
  const [googleId, setGoogleId] = useState ('');
  const [firstName, setFirstName] = useState ('');
  const [image, setImage] = useState ('');
  const [cookies, setCookie] = useCookies(["vpcharter"]);
  const [loading, setLoading] = useState (false);
  const [envioEmail, setEnvioEmail] = useState (false);



  function validaForm(e) {
    e.preventDefault();
    setEmailError(false)
    setPasswordError(false)
    setTxtError('')


    if (!email) {
      setEmailError(true)
      setTxtError('Por favor digite seu E-mail!')
      setTimeout(()=> setTxtError(''),5000);
    } else {

      setLoading(true)

      setTimeout(function() {
        
        // Consultar Email
        var fData = new FormData();
        fData.append('email', email);
        axios.post(endpoint+'recuperarsenha.php', fData)
        .then(response=> {

          console.log(response.data)

          if (response.data == "0") {

            
            setEnvioEmail(true)

          } else {
            setTitleError('Seu E-mail não foi encontrado!')
            setTxtError('Por favor digite novamente.')
            setTimeout(()=> setTxtError(''),5000);
            setLoading(false)
          }

        })
        .catch(error=> alert(error))
      
        setLoading(false)
      }, 1000)
      
    }
  }



  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      validaForm()
    }
  }



  return (
    <div id="login">

      <div className='col01'>
        <div className='bg_01'></div>
      </div>

      <div className='col02'>
          <div className='formLogin'>

            <div className={txtError ? "alert alert-danger " : 'hide'} role="alert">
              <h4 className={titleError ? '' : 'hide'}>{titleError}</h4>
              {txtError}
            </div>

            <div className='book2bLogin' alt="book2b"> </div>

            <form className={ envioEmail ? 'hide' : 'inputFormLogin'} onSubmit={(e)=> validaForm(e)}>
              <div className="mt-5 mb-5">
                <h2>Recuperar Senha</h2>
                <p>Por favor, digite seu e-mail de cadastro.</p>
              </div>
              <div className="mt-5">
                <label>E-mail</label>
                <input type='email' 
                  className={emailError ? "error" : ''} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder='Digite seu e-mail' 
                  required
                  onKeyDown={handleKeyDown}
                ></input>
                <button type='submit' ><span className={loading ? 'hide' : ''}>Enviar</span><span className={loading ? 'loader' : 'hide'}></span></button>
              </div>
            </form>


            <div className={ envioEmail ? 'mt-5 mb-5' : 'hide'} >
              <h2>E-mail Enviado!</h2>
              <p></p>
              <p>Em instantes você receberá o link de recuperação no e-mail <b>{email}</b>.</p>
              <p>Caso não encontre na caixa de entrada, por favor verifique na caixa de span.</p>
            </div>


          </div>
      </div>
        
    </div>
  )
}



export default RecuperarSenha