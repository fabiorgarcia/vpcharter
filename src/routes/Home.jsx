import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";
import Header from '../components/Header';
import { PiAirplaneInFlight } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBusFrontFill } from "react-icons/bs";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaSuitcaseRolling } from "react-icons/fa";



function Home() {

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
              {/*<div className='breadCrumb'><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> Home</div>*/}

              {/*<h4 className={Globals.userNameAgencia?'':'hide'}>{Globals.userNameAgencia}</h4>*/}

              <div className='row contentHomeMaster'>
                <div className='col-6'>
                  <Link to={Globals.userStatus=='3'?"/aeroagencia":"/aereo"} relative="path"><div className='btnHomeMaster'><GiCommercialAirplane /><span>Aéreo</span><span className='h5'>Fretamento</span></div></Link>
                </div>
                <div className='col-6'>
                  <Link to="/rodoviario" relative="path" ><div className='btnHomeMaster btnHomeMasterOff'><BsBusFrontFill /><span>Rodoviário</span><span className='h5'>Fretamento</span></div></Link>
                </div>
                <div className='col-6'>
                  <Link to="/aereoregular" relative="path"><div className='btnHomeMaster btnHomeMasterOff'><PiAirplaneInFlight /><span>Aéreo</span><span className='h5'>Regular</span></div></Link>
                </div>
                <div className='col-6'>
                  <Link to="/pacotefixo" relative="path"><div className='btnHomeMaster btnHomeMasterOff'><FaSuitcaseRolling /><span>Pacote</span><span className='h5'>Fixo</span></div></Link>
                </div>

                <div className='col-6'>
                  <Link to="/admin" relative="path" className={Globals.userStatus == '9' ? 'lkHomeAdmin':'hide'}><div className='btnHomeMaster'><IoSettingsOutline /><span>Admin</span></div></Link>
                </div>
                
              </div>
            </div>
      </div>

      </>
    )
  }
  
  export default Home