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
  const [cpf, setCpf] = useState ('');
  const [cookies, setCookie] = useCookies(["vpcharter"]);
  const [loading, setLoading] = useState (false);
  const [envioEmail, setEnvioEmail] = useState (false);



  function validaForm(e) {
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

            <img className="logovplogin" src={hero} alt="Viagens Promo" />

            <form className={ envioEmail ? 'hide' : 'inputFormLogin'} onSubmit={(e)=> validaForm(e)}>
              <div>
                <h2>Faça seu Cadastro</h2>
                <p>Por favor, digite seus dados.</p>
              </div>
              <div>
                <label>Primerio Nome</label>
                <input type='text' 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder='Digite seu primeiro nome' 
                  required
                  onKeyDown={handleKeyDown}
                ></input>

                <label>Sobrenome</label>
                <input type='text' 
                  value={familyName} 
                  onChange={(e) => setFamilyName(e.target.value)} 
                  placeholder='Digite seu sobrenome' 
                  onKeyDown={handleKeyDown}
                ></input>

                <label>E-mail</label>
                <input type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder='Digite seu e-mail' 
                  required
                  onKeyDown={handleKeyDown}
                ></input>

                <label>CPF</label>

                <ReactInputMask
                 mask="999.999.999-99" 
                 id="f_cpf" 
                 className='defaultField' 
                 value={cpf} 
                 onChange={(e)=>setCpf(e.target.value)} 
                 onBlur={(e)=>validaCpf(e.target.value)}  
                 onKeyDown={handleKeyDown}  
                 required 
                  />


                <label>Senha</label>
                <input type='password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder='Digite a senha' 
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



export default NovoUsuario