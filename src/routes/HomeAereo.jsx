import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";
import Header from '../components/Header';
import { PiAirplaneTilt, PiCallBellLight, PiUsers } from "react-icons/pi";
import { MdAttachMoney, MdOutlineLocalOffer, MdOutlineAirplaneTicket } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function HomeAereo() {

  const [statusUser, setStatusUser] = useState ();

  useEffect(() => {
    setStatusUser(Globals.userStatus)
  })
  
    return (
      <>
      <Header />
      <div className='allTab'>
        <Sidebar />
            <div className='content'>

                <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/ Aéreo</div>
                <div className='contentHome'>
                  <Link to="/aereo/frota" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><PiAirplaneTilt /><p>Frota</p></div></div></Link>
                  <Link to="/aereo/tarifas" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdAttachMoney /><p>Tarifas</p></div> </div></Link>
                  <Link to="/aereo/fretamento" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineLocalOffer /><p>Fretamento</p></div> </div></Link>
                  <Link to="/aereo/reserva" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><PiCallBellLight /><p>Reserva</p></div> </div></Link>
                  <Link to="/aereo/checkin" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineAirplaneTicket /><p>Check In</p></div> </div></Link>
                  {/*<div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><BiSearchAlt /><p>Busca</p></div> </div>*/}
                </div>
            </div>
      </div>

      </>
    )
  }
  
  export default HomeAereo