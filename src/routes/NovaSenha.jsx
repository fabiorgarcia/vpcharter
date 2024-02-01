import '../components/Login.css'
import hero from "../assets/logo-vp.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const NovaSenha = () => {

  const navigate = useNavigate()

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const [idUser, setIdUser] = useState ('');
  const [email, setEmail] = useState ('');
  const [emailError, setEmailError] = useState (false);
  const [titleError, setTitleError] = useState ('');
  const [txtError, setTxtError] = useState ('');
  const [pass, setPass] = useState (''); 
  const [password, setPassword] = useState ('');
  const [password2, setPassword2] = useState ('');
  const [loading, setLoading] = useState (false);
  const [updatePass, setupdatePass] = useState (false);


  useEffect(() => {
    var params = window.location.search.substring(1).split('?');
    setIdUser(params[0]);
    if (params[0]) {
      var query = "SELECT * FROM `vpcharter_users` WHERE `id` = '"+params[0]+"'  ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setPass(response.data[0].pass)
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Usuário não encontrado!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
    }

  }, [])



  function validaForm(e) {
    e.preventDefault();
    setEmailError(false)
    setTxtError('')


    if (password != password2) {
      setEmailError(true)
      setTxtError('Senhas não conferem!')
      setTimeout(()=> setTxtError(''),5000);
    } else {

      setLoading(true)

      setTimeout(function() {
        
        var query = "UPDATE `vpcharter_users` SET  `pass` = '"+password+"' WHERE `vpcharter_users`.`id` = '"+idUser+"'  ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setupdatePass(true)
          } else {
            setTypeAlert('alert-danger')
            settitleAlert('Usuário não encontrado!')
            setTimeout(()=> setTypeAlert(''),5000);
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

            <img className="logovplogin" src={hero} alt="Viagens Promo" />

            <div className={ idUser ? '' : 'hide'}>

              <form className={ updatePass ? 'hide' : 'inputFormLogin'} onSubmit={(e)=> validaForm(e)}>
                <div className="mt-5 mb-5">
                  <h2>Redefinir Senha</h2>
                  <p>Por favor, digite a nova senha.</p>
                </div>
                <div className="mt-5">
                  <label>Nova Senha</label>
                  <input type='password' 
                    className={emailError ? "error" : ''} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Nova Senha' 
                    required
                    onKeyDown={handleKeyDown}
                  ></input>

                  <label>Confirme a nova Senha</label>
                  <input type='password' 
                    className={emailError ? "error" : ''} 
                    value={password2} 
                    onChange={(e) => setPassword2(e.target.value)} 
                    placeholder='Nova Senha' 
                    required
                    onKeyDown={handleKeyDown}
                  ></input>

                  <button type='submit' ><span className={loading ? 'hide' : ''}>Enviar</span><span className={loading ? 'loader' : 'hide'}></span></button>
                </div>
              </form>

              <div className={ updatePass ? 'mt-5 mb-5' : 'hide'} >
                <h2>Senha Alterada!</h2>
                <p></p>
                <p>Senha alterada com sucesso.</p>
              </div>

            </div>



            <div className={ idUser ? 'hide' : 'mt-5 mb-5'}>
              Usuário não encontrado!
            </div>


          </div>
      </div>
        
    </div>
  )
}



export default NovaSenha