import logovp from '../assets/logo-vp.png'
import { PiUserCircleFill } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import Globals from '../components/Globals'
import { Link, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import { CgLogOut } from "react-icons/cg";
import { LiaUserEditSolid } from "react-icons/lia";
import axios from "axios";



const Header = () => {

  const [cookies, setCookie] = useCookies(["vpcharter"]);
  const [opemMenu, setOpemMenu] = useState (false);
  const [nameUser, setNameUser] = useState ();
  const [imageUser, setImageUser] = useState ();
  const [statusUser, setStatusUser] = useState ();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState (false);
  var endpoint = Globals.endPoint;

  useEffect(() => {
    if (Globals.userId) {
      setNameUser(Globals.userName)
      setStatusUser(Globals.userStatus)
      setImageUser(Globals.userImage)
      if (Globals.userImage) {
        var typeUrl = Globals.userImage.indexOf("http");
        if (typeUrl >= 0) {
          document.getElementById("imageUser").style.backgroundImage = "url('"+Globals.userImage+"')";
        } else {
          document.getElementById("imageUser").style.backgroundImage = "url('"+Globals.endPoint+"usersimage/"+Globals.userImage+"')";
        }
      }
      
    } else {

      if (cookies.vpcharter == undefined )  {
        navigate('/');
      } else {
        var ss = cookies.vpcharter.split('|')[0];
        var ii = cookies.vpcharter.split('|')[1];
        var nn = cookies.vpcharter.split('|')[2];
        var aa = cookies.vpcharter.split('|')[3];
        var rs = cookies.vpcharter.split('|')[4];

        Globals.userId = ii;
        Globals.userStatus = ss;
        Globals.userName = nn;
        Globals.userIdAgencia = aa;
        Globals.userNameAgencia = rs;
        setStatusUser(nn)
        setNameUser(ss)

        // Consultar Usuário
        var query = "SELECT * FROM `vpcharter_users` WHERE  `id` = '"+ii+"'  ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {          
          if (response.data[0].imageUrl) { Globals.userImage = response.data[0].imageUrl; } else { Globals.userImage = response.data[0].image; }
          setImageUser(Globals.userImage)
        })
        .catch(error=> alert(error))
        
      }
      
    }
  })


  function openMenu() {
    if (document.getElementById("sidebar").style.display == "none" || document.getElementById("sidebar").style.display == '') {
      document.getElementById("sidebar").style.display = "block";
      setOpemMenu(true)
    } else {
      document.getElementById("sidebar").style.display = "";
      setOpemMenu(false)
    }
  }

  const logOut = () => {
    setShowUserMenu(false)
    Globals.userId = '';
    Globals.userName = '';
    Globals.userImage = '';
    Globals.userStatus = '';
    setCookie("vpcharter", '', {path: '/', maxAge: 1} );
    navigate('/');
  }

  const meusDados = () => {
    setShowUserMenu(false)
    navigate('/meusdados');
  }

  function gohome() {
    navigate('/home');
  }



  return (
    <header>
        <div className='header' >
          {/*<Link to="/home"><img src={logovp} className="logovp" alt="Viagens Promo" /></Link>*/}
          <div className='book2b' alt="Viagens Promo" onClick={()=>gohome()} ></div>
          <div className='hederUser' onClick={() => setShowUserMenu(!showUserMenu)}>
            <span className='nameIconUser'>
              <span className='nameUser'>{nameUser}</span> <PiUserCircleFill className={ imageUser ? 'hide' : 'icoUser'} /></span>
            <div id="imageUser" className={ imageUser ? 'userImageHeader' : 'hide'} ></div>
            <HiMenu className={!opemMenu ? 'hamburger' : 'hide'} id='hamburger' onClick={() => openMenu()} />
            <HiX className={opemMenu ? 'hamburger' : 'hide'} id='hix' onClick={() => openMenu()} />
          </div>

          <div className={showUserMenu ? "userMenu" : 'hide'}>
            <div className='itemMenuUser' onClick={() => meusDados()}><LiaUserEditSolid /> Meus Dados</div>
            <div className='itemMenuUser' onClick={() => logOut()}><CgLogOut /> Logout</div>
          </div>
        </div>
    </header>
  )
}

export default Header