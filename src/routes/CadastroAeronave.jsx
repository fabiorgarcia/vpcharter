import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { LiaUserEditSolid } from "react-icons/lia";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiAirplaneTiltThin, PiCaretRightBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { GrClose } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";


function CadastroAeronave() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [openModal, setOpenModal] = useState (false);
  const [fabricante, setFabricante] = useState ('');
  const [fabricanteData, setFabricanteData] = useState ([]);
  const [aeronave, setAeronave] = useState (''); 
  const [companhia, seCompanhia] = useState (''); 
  const [companhiaData, seCompanhiaData] = useState ([]); 

  const [aeroporto, setAeroporto] = useState ('');
  const [angarPrincipal, setAngarPrincipal] = useState ('');
  const [registro, setRegistro] = useState (''); 
  const [fabricanteModelo, setFabricanteModelo] = useState ('');
  const [idFabricanteModelo, setIdFabricanteModelo] = useState ('');
  const [typeForm, setTypeForm] = useState ('Insert');
  const [loadingModal, setLoadingModal] = useState (false);



  useEffect(() => {

    setLoading(true);
    var query = "SELECT * FROM `vpcharter_companhia` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seCompanhiaData(response.data)
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Registro não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_fabricante` order by `aeronave` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setFabricanteData(response.data)
        setLoading(false);
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Registro não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))

  }, [])
  

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();
    
    setTimeout(function() {      
      var query = "INSERT INTO `vpcharter_frota` (`id`, `fabricante`, `companhia` ) VALUES (NULL, '"+fabricante+"', '"+companhia+"' );";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setTypeAlert('alert-success')
          setTxtAlert('Cadastro com sucesso')


          var query = "SELECT * FROM `vpcharter_frota` WHERE `fabricante` = '"+fabricante+"' AND `companhia` = '"+companhia+"'  ";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {
              setFabricanteData(response.data)
              var newID = response.data[0]['id'];
              setTimeout(()=> navigate('/aereo/frota/mapaassentos/'+newID ),1000);
              setLoading(false);
            } else {
              setTypeAlert('alert-danger')
              settitleAlert('Registro não encontrado!')
              setTimeout(()=> setTypeAlert(''),5000);
            }
          })
          .catch(error=> alert(error))


          
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Erro na Gravação!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
      
      setLoading(false)
    }, 1000)
  }

  function changeFabricante (e) {
    if (e == "new") {
      setOpenModal(true)
    } else {
      setFabricante(e)
    }
  }


  function editFabricante(id, fabricante) {
    setTypeForm('Update')
    setIdFabricanteModelo(id)

    for(let i = 0; i < fabricanteData.length; i = i + 1) {
      if (fabricanteData[i].id != id) {
        document.getElementById('inputFabricante'+fabricanteData[i].id).style.display = 'none';
        document.getElementById('nomeFabricante'+fabricanteData[i].id).style.display = 'block';
        document.getElementById('btnEditFabricante'+fabricanteData[i].id).style.opacity = '0';
      }
    }
    document.getElementById('btnEditFabricante'+id).style.opacity = '1';
    document.getElementById('nomeFabricante'+id).style.display = 'none';
    const elem = document.getElementById('inputFabricante'+id);
    elem.style.display = 'block';
    if (elem.value == "") {
      elem.value = fabricante;
    }
    elem.focus();
  }


  return (
    <>

    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal'>
        <GrClose className='closeModal' onClick={()=>setOpenModal(false)} />
        <h5>Cadastro Fabricante/Modelo</h5>
        <form onSubmit={(e)=> validaFormFabricante(e)} onFocus={()=>limpaFabricante()}>

          <div className='row mt-3 mb-3'>
            <div className='col-9 pr-0 mr-0'>
              <input type='text' required placeholder='Fabricante/Modelo' value={fabricanteModelo} onChange={(e)=>setFabricanteModelo(e.target.value)}></input>
            </div>
            <div className='col  pl-0 ml-0'>
            <button type='submit' ><span ><BsCheckLg /></span></button>
            </div>
          </div>

        </form>
        
        <div className='listModal'> 
          <table className='table table-hover'>
            <tbody>
              {fabricanteData.map((data, index) => (
                <tr key={index} >
                  <td>
                    {data.id}
                  </td>
                  <td onMouseOver={()=>editFabricante(data.id, data.aeronave)}>
                    <input type='text' required id={'inputFabricante'+data.id} style={{display: 'none' }}></input>
                    <span id={'nomeFabricante'+data.id}>{data.aeronave}</span></td>
                  <td>
                    <MdOutlineModeEdit className='icoEdit' id={'btnEditFabricante'+data.id} onClick={()=>updateFabricante(data.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>


    {loading && <LoadingAnimation />}
    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        <div className={typeAlert ? "alert "+typeAlert : 'hide'} role="alert">
          <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
          {txtAlert}
        </div>
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/frota" relative="path">Frota</Link>&nbsp;/&nbsp;Cadastro Aeronave</div>

          <div className="lineButtons row ">
            <div className="col">
              <h1>Cadastro Aeronave</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col'>
                  <form onSubmit={(e)=> validaForm(e)}>
                    <div className='row'>
                      <div className='col-4'>
                      <label>Fabricante/Modelo</label>
                        <select name="select" value={fabricante} onChange={(e) => changeFabricante(e.target.value)} required>
                          {/*
                          <option disabled></option>
                          <option value="new">❯ Cadastrar/Editar</option>
                          <option disabled>━━━━━━━━━━━━━━</option>
                          */}
                          <option value=''> </option>
                          {fabricanteData.map((data, index) => (
                            <option key={index} value={data.id}>{data.aeronave}</option>
                          ))}
                        </select>
                      </div>

                      <div className='col-5'>
                        <label>Companhia Aérea</label>
                        <select name="select" value={companhia} onChange={(e) => seCompanhia(e.target.value)} required>
                          <option value=''></option>
                          {companhiaData.map((data, index) => (
                            <option key={index} value={data.id}>{data.nome}</option>
                          ))}
                        </select>
                      </div>
                      <div className='col-3'>
                          <button type='submit' ><span className={loading ? 'hide' : ''}><PiCaretRightBold /> Avançar</span><span className={loading ? 'loader' : 'hide'}></span></button>
                      </div>
                    </div>
                  </form>
                </div>
                
              </div>
          </div>
      </div>
    </div>

    </>
  )
}
  
export default CadastroAeronave