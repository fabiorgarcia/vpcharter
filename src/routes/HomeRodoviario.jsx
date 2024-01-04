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


function HomeRodoviario() {

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

                <div className='breadCrumb'><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> <Link to="/home" relative="path">Home</Link>&nbsp; / Ônibus</div>
                <div className='contentHome'>


                </div>
            </div>
      </div>

      </>
    )
  }
  
  export default HomeRodoviario