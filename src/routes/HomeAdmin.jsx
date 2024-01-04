import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import { MdOutlineHome, MdOutlineConnectingAirports, MdOutlineAirlineSeatReclineNormal, MdOutlineHotelClass, MdOutlineEmojiFoodBeverage } from "react-icons/md";
import Header from '../components/Header';
import { PiUsers, PiBuildingsBold } from "react-icons/pi";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { AiOutlineFlag } from "react-icons/ai";



function HomeAdmin() {

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

                <div className='breadCrumb'><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />&nbsp;/ Admin</div>

                <div className='contentHome'>
                  <Link to="/admin/usuarios" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><PiUsers /><p>Usuários</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/agenciacliente" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><IoStorefrontOutline /><p>Agências / Clientes</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/aeroportos" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineConnectingAirports /><p>Aeroportos</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/assentos" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineAirlineSeatReclineNormal /><p>Caract. Assentos</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/classe" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineHotelClass /><p>Caract. Classes</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/fabricante" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><PiBuildingsBold /><p>Fabricantes</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/servicobordo" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><MdOutlineEmojiFoodBeverage /><p>Serviço de Bordo</p></div></div></Link>
                </div>
                <div className='contentHome'>
                  <Link to="/admin/companhias" relative="path"><div className={Globals.userStatus == '9' ? 'btnHome' : 'hide'}><div className='icoHome'><AiOutlineFlag /><p>Companhias</p></div></div></Link>
                </div>
            </div>
      </div>

      </>
    )
  }
  
  export default HomeAdmin