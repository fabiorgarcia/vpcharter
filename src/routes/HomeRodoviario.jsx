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
import { AiOutlineClose } from "react-icons/ai"


function HomeRodoviario() {

  const [statusUser, setStatusUser] = useState ();
  const [openModal, setOpenModal] = useState (false);


  useEffect(() => {
    setStatusUser(Globals.userStatus)
  })
  
    return (
      <>

      <div className={openModal ? 'bg_loading' : 'hide'} >
        <div className='globalModal unavailableModal'>
          <AiOutlineClose className='closeModalTrash' onClick={()=>setOpenModal(false)} />
              <h2>Obrigado!</h2>
              <span>Você será avisado quando estiver disponível.</span>
        </div>
      </div>


      <Header />
      <div className='allTab'>
        <Sidebar />
        <div className='content'>
            <div className='breadCrumb'><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> <Link to="/home" relative="path">Home</Link>&nbsp; / Rodoviário</div>
            <div className='contentAll msnAguarde'>
              <span>Este produto ainda não está disponível. Aguarde, em breve teremos novidades!</span>
              <button onClick={()=>setOpenModal(true)}>Avisar quando tiver disponível</button>
            </div>
        </div>
      </div>

      </>
    )
  }
  
  export default HomeRodoviario