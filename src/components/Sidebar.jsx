import { PiCaretRight, PiAirplaneTiltThin, PiCallBellLight, PiUsers, PiCaretDown } from "react-icons/pi";
import { MdAttachMoney, MdOutlineLocalOffer, MdOutlineAirplaneTicket, MdOutlineConnectingAirports, MdOutlineAirlineSeatReclineNormal, MdOutlineHotelClass, MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import Globals from '../components/Globals'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBusFrontFill } from "react-icons/bs";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaSuitcaseRolling } from "react-icons/fa";
import { PiAirplaneInFlight, PiBuildingsBold } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { AiOutlineFlag } from "react-icons/ai";



function Sidebar() {

  const [statusUser, setStatusUser] = useState ();
  const [host, setHost] = useState ('');
  const [page, setPage] = useState ('');


  useEffect(() => {
    setStatusUser(Globals.userStatus)

    document.getElementById("subLinksAereo").style.display = "none";
    document.getElementById("subLinksAdmin").style.display = "none";

    var url = window.location.pathname.split('/');
    
    for (var i = 0; i < url.length; ++i) {
      //console.log(url[i])
      setHost(url[1])
      if (i == 2) { setPage(url[2]) }

      if (url[i] == 'aereo') {
        document.getElementById("subLinksAereo").style.display = "block";
      }
      if (url[i] == 'admin') {
        document.getElementById("subLinksAdmin").style.display = "block";
      }
    }
    
  })


  
  return (
    <>
      <div className='sidebar' id="sidebar" >
        <Link to="/aereo" relative="path"><div className={host == 'aereo' ? 'itemMenu masterMenu':'itemMenu masterMenu50'}><GiCommercialAirplane className='iconMenu' title='Aéreo saidas' /> <PiCaretRight className='mob opacity-25' /> <span className='mob'>Aéreo saidas</span></div></Link>

        <div id="subLinksAereo" className={host == 'aereo' ? '':'hide'}>
          <Link to="/aereo/aeronaves" relative="path"><div className={Globals.userStatus == '9' ? page == 'frota'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><PiAirplaneTiltThin className='iconMenu' title='Aeronaves' /> <PiCaretRight className='mob' /> <span className='mob'>Aeronaves</span></div></Link>
          <Link to="/aereo/saidas" relative="path"><div className={Globals.userStatus == '9' ? page == 'saidas'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdOutlineLocalOffer className='iconMenu flip' title='Saídas' /> <PiCaretRight className='mob' /> <span className='mob'>Saídas</span></div></Link>

          <Link to="/aereo/tarifas" relative="path"><div className={Globals.userStatus == '9' ? page == 'tarifas'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdAttachMoney className='iconMenu' title='Tarifas' /> <PiCaretRight className='mob' /> <span className='mob'>Tarifas</span></div></Link>
          <Link to="/aereo/reserva" relative="path"><div className={Globals.userStatus == '9' ? page == 'reserva'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><PiCallBellLight className='iconMenu' title='Reserva' /> <PiCaretRight className='mob' /> <span className='mob'>Reserva</span></div></Link>
          <Link to="/aereo/checkin" relative="path"><div className={page == 'checkin'? 'itemMenu masterMenu': 'itemMenu'}><MdOutlineAirplaneTicket className='iconMenu' /> <PiCaretRight className='mob' title='Check In' /> <span className='mob'>Check In</span></div></Link>
          {/*<Link to="/home" relative="path"><div className={Globals.userStatus == '9' ? 'itemMenu' : 'hide'}><BiSearchAlt className='iconMenu' title='Busca' /> <PiCaretRight className='mob' /> <span className='mob'>Busca</span></div></Link>*/}
        </div>


        <div className={host == 'aereoregular' ? 'itemMenu masterMenu':'itemMenu masterMenu50'}><PiAirplaneInFlight className='iconMenu' title='Aéreo Regular' /> <PiCaretRight className='mob opacity-25' /> <span className='mob'>Aéreo Regular</span></div>
        <div className={host == 'onibus' ? 'itemMenu masterMenu':'itemMenu masterMenu50'}><BsBusFrontFill className='iconMenu' title='Rodoviário saidas' /> <PiCaretRight className='mob opacity-25' /> <span className='mob'>Rodoviário </span></div>

        <div className={host == 'pacote' ? 'itemMenu masterMenu':'itemMenu masterMenu50'}><FaSuitcaseRolling  className='iconMenu' title='Pacote Fixo' /> <PiCaretRight className='mob opacity-25' /> <span className='mob'>Pacote Fixo</span></div>


        <Link to="/admin" relative="path"><div className={Globals.userStatus == '9' ? host == 'admin' ? 'itemMenu masterMenu':'itemMenu masterMenu50' : 'hide'} ><IoSettingsOutline className='iconMenu' title='Admin' /> <PiCaretRight className='mob opacity-25' /> <span className='mob'>Admin</span></div></Link>
        <div id="subLinksAdmin" className={host == 'aereo' ? '':'hide'}>
          <Link to="/admin/usuarios" relative="path"><div className={Globals.userStatus == '9' ? page == 'usuarios'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><PiUsers className='iconMenu' title='Usuários' /> <PiCaretRight className='mob' /> <span className='mob'>Usuários</span></div></Link>
          <Link to="/admin/agenciacliente" relative="path"><div className={Globals.userStatus == '9' ? page == 'agenciacliente'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><IoStorefrontOutline className='iconMenu' title='Agência/Cliente' /> <PiCaretRight className='mob' /> <span className='mob'>Agência/Cliente</span></div></Link>
          <Link to="/admin/aeroportos" relative="path"><div className={Globals.userStatus == '9' ? page == 'aeroportos'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdOutlineConnectingAirports  className='iconMenu' title='Aeroportos' /> <PiCaretRight className='mob' /> <span className='mob'>Aeroportos</span></div></Link>
          <Link to="/admin/assentos" relative="path"><div className={Globals.userStatus == '9' ? page == 'assentos'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdOutlineAirlineSeatReclineNormal className='iconMenu' title='Caract. Assentos' /> <PiCaretRight className='mob' /> <span className='mob'>Caract. Assentos</span></div></Link>
          <Link to="/admin/classe" relative="path"><div className={Globals.userStatus == '9' ? page == 'classe'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdOutlineHotelClass className='iconMenu' title='Caract. Classes' /> <PiCaretRight className='mob' /> <span className='mob'>Caract. Classe</span></div></Link>
          <Link to="/admin/fabricante" relative="path"><div className={Globals.userStatus == '9' ? page == 'fabricante'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><PiBuildingsBold className='iconMenu' title='Fabricante' /> <PiCaretRight className='mob' /> <span className='mob'>Fabricante</span></div></Link>
          <Link to="/admin/servicobordo" relative="path"><div className={Globals.userStatus == '9' ? page == 'servicobordo'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><MdOutlineEmojiFoodBeverage className='iconMenu' title='Serviço de Bordo' /> <PiCaretRight className='mob' /> <span className='mob'>Serviço de Bordo</span></div></Link>
          <Link to="/admin/companhias" relative="path"><div className={Globals.userStatus == '9' ? page == 'companhias'? 'itemMenu masterMenu': 'itemMenu' : 'hide'}><AiOutlineFlag className='iconMenu' title='Companhias' /> <PiCaretRight className='mob' /> <span className='mob'>Companhias</span></div></Link>

        </div>

        <div className='bgSidebar'></div>
      </div>
    </>
  )
}

export default Sidebar