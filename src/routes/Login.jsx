import { useState, useEffect } from "react";
import '../components/Login.css'
import hero from "../assets/logo-vp.png";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import Globals from '../components/Globals'
import { CookiesProvider, useCookies } from "react-cookie";


const Login = () => {

  const navigate = useNavigate()
  var endpoint = 'http://frgarcia.com.br/vpcharter/';

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


  useEffect(() => {
    var params = window.location.href.substring(1).split('?');
    if (params[1]=="home") { navigate('home'); }
    if (params[1]=="meusdados") { navigate('meusdados'); }
    if (params[1]=="recuperarsenha") { navigate('recuperarsenha'); }
    if (params[1]=="novousuario") { navigate('novousuario'); }
    if (params[1]=="usuarios") { navigate('usuarios'); }
}, [])



  function validaForm() {

    setEmailError(false)
    setPasswordError(false)
    setTxtError('')


    if (!email) {
      setEmailError(true)
      setTxtError('Por favor digite seu E-mail!')
      setTimeout(()=> setTxtError(''),5000);
    } else if (!password)   {
      setPasswordError(true)
      setTxtError('Por favor digite sua Senha!')
      setTimeout(()=> setTxtError(''),5000);
    } else {

      setLoading(true)

      // Consultar Email
      var query = "SELECT * FROM `vpcharter_users` WHERE `email` = '"+email+"'  ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {

          // Consultar Pass
          var query = "SELECT * FROM `vpcharter_users` WHERE `email` = '"+email+"' AND `pass` = '"+password+"'  ";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {

              if (response.data[0].userActive == 0) {
                var cok = response.data[0].status + '|' + response.data[0].id + '|' + response.data[0].firstName;

                Globals.userId = response.data[0].id;
                Globals.userName = response.data[0].firstName;
                Globals.userEmail = response.data[0].email;
                Globals.userStatus = response.data[0].status;

                if (response.data[0].imageUrl) { 
                  Globals.userImage = response.data[0].imageUrl; 
                } else { 
                  if (response.data[0].image != null) {
                    Globals.userImage = response.data[0].image; 
                  }
                }

                setCookie("vpcharter", cok, {path: '/', maxAge: 7200} );
                navigate('/home');

              } else {
                setTitleError('Usuário Desabilitado!')
                setTxtError('Por favor entre em contato o suporte.')
                setTimeout(()=> setTxtError(''),5000);
              }
              

            } else {
              setTitleError('Sua Senha não confere!')
              setTxtError('Por favor digite novamente.')
              setTimeout(()=> setTxtError(''),5000);
              setLoading(false)
            }
          })
          .catch(error=> alert(error))


        } else {
          setTitleError('Seu E-mail não foi encontrado!')
          setTxtError('Por favor digite novamente.')
          setTimeout(()=> setTxtError(''),5000);
          setLoading(false)
        }

      })
      .catch(error=> alert(error))
      
    }
    
  }

  function responseGoogle(response) {

    //console.log(response)

    var idGoogle = response.profileObj.googleId;
    var emailGoogle = response.profileObj.email;
    var nomeGoogle = response.profileObj.name;
    var primeironomeGoogle = response.profileObj.givenName;
    var sobrenomeGoogle = response.profileObj.familyName;
    var imageGoole = response.profileObj.imageUrl;

    if (idGoogle) {

      

      // Consultar por googleId
      setGoogleId(idGoogle);
      var query = "SELECT * FROM `vpcharter_users` WHERE `googleId` = '"+idGoogle+"'";
      var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
              if (response.data.length > 0) {
                Globals.userId = response.data[0].id;
                Globals.userName = nomeGoogle;
                Globals.userEmail = emailGoogle;
                navigate('/home');

              } else {

                // Consultar por Email
                var query = "SELECT * FROM `vpcharter_users` WHERE `email` = '"+emailGoogle+"'";
                var fData = new FormData();
                    fData.append('query', query);
                    axios.post(endpoint+'query.php', fData)
                    .then(response=> {
                        if (response.data.length > 0) {
                          Globals.userId = response.data[0].id;
                          Globals.userName = nomeGoogle;
                          Globals.userEmail = emailGoogle;
                          navigate('/home');

                        } else {

                          var date = new Date();
	                        var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
                          var query = "INSERT INTO `vpcharter_users` (`id`, `googleId`, `name`, `familyName`, `firstName`, `status`, `pass`, `image`, `imageUrl`, `email`, `dateRegister`, `userActive`) VALUES (NULL, '"+idGoogle+"', '"+nomeGoogle+"', '"+sobrenomeGoogle+"', '"+primeironomeGoogle+"', '0', '', NULL, '"+imageGoole+"', '"+emailGoogle+"', '"+current_date+"', '0')";
                          var fData = new FormData();
                          fData.append('query', query);
                          axios.post(endpoint+'query.php', fData)
                          .then(response=> {
                            
                              // Pegar id do usuário
                              var query = "SELECT * FROM `vpcharter_users` WHERE `googleId` = '"+idGoogle+"'";
                              var fData = new FormData();
                              fData.append('query', query);
                              axios.post(endpoint+'query.php', fData)
                              .then(response=> {
                                  // Consultar por Nome
                                  Globals.userId = response.data[0].id;
                                  Globals.userName = nomeGoogle;
                                  Globals.userEmail = emailGoogle;
                                  navigate('/home');

                              })
                              .catch(error=> alert(error))
                          })
                          .catch(error=> alert(error))

                        }
                    })
                    .catch(error=> alert(error))

              }
          })
          .catch(error=> alert(error))
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

            <div className={txtError ? "alert alert-danger" : 'hide'} role="alert">
              <h4 className={titleError ? '' : 'hide'}>{titleError}</h4>
              {txtError}
            </div>

            <img className="logovplogin" src={hero} alt="Viagens Promo" />

            <form className='inputFormLogin' >
              <label>Login</label>
              <input type='text' 
                className={emailError ? "error" : ''} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Digite seu e-mail' 
                required
                onKeyDown={handleKeyDown}
              ></input>

              <label>Senha</label>
              <input type='password' 
                className={passwordlError ? "error" : ''} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Digite sua Senha' 
                required
                onKeyDown={handleKeyDown}
              ></input>


              <div className='row lkLogin'>
                <div className='col-6 lk1'><Link to="/recuperarsenha" relative="path">Esqueceu a senha?</Link></div>
                <div className='col-6 lk2'><Link to="/novousuario" relative="path">Não tem cadastro?</Link></div>
              </div>

              <button type='button' onClick={() => validaForm()}><span className={loading ? 'hide' : ''}>Entrar</span><span className={loading ? 'loader' : 'hide'}></span></button>
              <div className='divOu'>
                <hr></hr>
                <div className='txtOu'>ou</div>
              </div>

              <div className='btnGoogle'>
                <GoogleLogin
                  clientId='864486011996-hvqn4jbaljvvim72dlb2dmlq11f50gct.apps.googleusercontent.com'
                  buttonText="Entrar com sua conta Google"
                  onSuccess={responseGoogle}
                  //onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

              </div>

            </form>
          </div>
      </div>
        
    </div>
  )
}



export default Login