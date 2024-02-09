import { useState } from "react";
import '../components/Login.css'
import hero from "../assets/logo-vp.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Globals from '../components/Globals'
import { CookiesProvider, useCookies } from "react-cookie";
import ReactInputMask from 'react-input-mask';


const NovoUsuario = () => {

  const navigate = useNavigate()
  var endpoint = Globals.endPoint;
  const [typeAlert, setTypeAlert] = useState ('');
  const [alert, setAlert] = useState (false);
  const [txtAlert, settxtAlert] = useState ('');
  const [isLoggedIn, setIsLoggedIn] = useState (false);
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [password, setPassword] = useState ('');
  const [passwordlError, setPasswordError] = useState (false);
  const [googleId, setGoogleId] = useState ('');
  const [firstName, setFirstName] = useState ('');
  const [familyName, setFamilyName] = useState ('');
  const [agencia, setAgencia] = useState ('');
  const [cpf, setCpf] = useState ('');
  const [cookies, setCookie] = useCookies(["vpcharter"]);
  const [loading, setLoading] = useState (false);
  const [envioEmail, setEnvioEmail] = useState (false);


  function validaForm(e) {
    e.preventDefault();
    setLoading(true)
    var now  = new Date;
    var dia = ("0" + (now.getDate())).slice(-2);
    var mes = ("0" + (now.getMonth() + 1)).slice(-2);
    var hora = ("0" + (now.getHours())).slice(-2);
    var minutos = ("0" + (now.getMinutes())).slice(-2);
    var segundos = ("0" + (now.getSeconds())).slice(-2);
    var dataHoje = now.getFullYear()+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
    var query = "INSERT INTO `vpcharter_leads` (`id`, `nome`, `email`, `agencia`, `date`) VALUES (NULL, '"+name+"', '"+email+"', '"+agencia+"', '"+dataHoje+"'); "
    var fData = new FormData();
    fData.append('query', query);
    axios.post(Globals.endPoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setLoading(false)
        setEnvioEmail(true)
      } 
    })
    .catch(error=> alert(error))
  }

  function validaFormOld(e) {
    e.preventDefault();
    setPasswordError(false)
    settxtAlert('')

      setLoading(true)
      setTimeout(function() {

        var query = "SELECT * FROM `vpcharter_users` WHERE `email` = '"+email+"'  ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(Globals.endPoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setAlert(true)
            setTypeAlert('alert-danger')
            settitleAlert('E-mail já cadastrado!')
            settxtAlert('Por favor, use outro e-mail.')
            setTimeout(()=> setAlert(false),5000);
          } else {

            if (!validaCpf(cpf)) {
              setAlert(true)
              setTypeAlert('alert-danger')
              settxtAlert('CPF Inválido!')
              document.getElementById('f_cpf').focus();
              document.getElementById('f_cpf').style.outline = '1px solid red';
              setTimeout(()=> setAlert(false),5000);
            } else {
              document.getElementById('f_cpf').style.outline = 'none';
              var now  = new Date;
              var dia = ("0" + (now.getDate())).slice(-2);
              var mes = ("0" + (now.getMonth() + 1)).slice(-2);
              var hora = ("0" + (now.getHours())).slice(-2);
              var minutos = ("0" + (now.getMinutes())).slice(-2);
              var segundos = ("0" + (now.getSeconds())).slice(-2);
              var dataHoje = now.getFullYear()+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
              var query = "INSERT INTO `vpcharter_users` (`id`, `googleId`, `name`, `familyName`, `firstName`, `status`, `pass`, `image`, `imageUrl`, `email`, `cpf`, `dateRegister`, `userActive`) VALUES (NULL, NULL, '', '"+familyName+"', '"+firstName+"', '0', '"+password+"', NULL, NULL, '"+email+"', '"+cpf+"', '"+dataHoje+"', '0');";
              var fData = new FormData();
              fData.append('query', query);
              axios.post(Globals.endPoint+'query.php', fData)
              .then(response=> {
                if (response.data.length > 0) {
                  var query = "SELECT * FROM `vpcharter_users` WHERE `email` = '"+email+"'  ";
                  var fData = new FormData();
                  fData.append('query', query);
                  axios.post(Globals.endPoint+'query.php', fData)
                  .then(response=> {
                    if (response.data.length > 0) {
                      var cok = '0|' + response.data[0].id + '|' + firstName;
                      Globals.userId = response.data[0].id;
                      Globals.userName = firstName;
                      Globals.userEmail = email;
                      setTypeAlert('alert-success')
                      settxtAlert('Usuário criado com sucesso!')
                      setAlert(true)
                      setCookie("vpcharter", cok, {path: '/', maxAge: 7200} );
                      setTimeout(()=> navigate('/home'),3000);
                    } else {
                      setAlert(true)
                      setTypeAlert('alert-danger')
                      settxtAlert('Email já cadastrado!')
                      setTimeout(()=> setAlert(false),5000);
                    }
                  })
                  .catch(error=> alert(error))
  
                } else {
                  setAlert(true)
                  setTypeAlert('alert-danger')
                  settxtAlert('Erro na Gravação!')
                  setTimeout(()=> setAlert(false),5000);
                }
              })
              .catch(error=> alert(error))
            }
          }
        })
        .catch(error=> alert(error))

        setLoading(false)
      }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      validaForm()
    }
  }

  function validaCpf(cpf){
    var result = true;
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) result = false;
    
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
}


  return (
    <div id="login">

      <div className='col01'>
        <div className='bg_01'></div>
      </div>

      <div className='col02'>
          <div className='formLogin'>

            <div className={alert ? "alert "+typeAlert : 'hide'} role="alert">
              <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
              {txtAlert}
            </div>

            <div className='book2bLogin' alt="book2b"> </div>

            <form className={ envioEmail ? 'hide' : 'inputFormLogin'} onSubmit={(e)=> validaForm(e)}>
              
              <div>
                <h2>Saiba mais sobre a plataforma.</h2>
                <p>Por favor, digite seus dados.</p>
              </div>
              <div>
                <label>Nome Completo</label>
                <input type='text' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder='Digite seu nome completo' 
                  required
                ></input>

                <label>E-mail</label>
                <input type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder='Digite seu e-mail' 
                  required
                ></input>

                <label>Agência de Turismo</label>
                <input type='text' 
                  value={agencia} 
                  onChange={(e) => setAgencia(e.target.value)} 
                  placeholder='Digite o nome da Agência de Turismo' 
                ></input>



                <button type='submit' ><span className={loading ? 'hide' : ''}>Enviar</span><span className={loading ? 'loader' : 'hide'}></span></button>
              </div>
            </form>


            <div className={ envioEmail ? 'mt-5 mb-5 ' : 'hide'} >
              <h2>Obrigado!</h2>
              <p></p>
              <p>Entraremos em contato em breve.</p>
              <div className="row ">
                <div className="col-4"></div>
                <div className="col-4">
                  <Link to="/" relative="path"><button type='button' className="btnPeq mt-0" ><span >Voltar</span></button></Link>
                </div>
                <div className="col-4"></div>
              </div>
              
            </div>


          </div>
      </div>
        
    </div>
  )
}



export default NovoUsuario