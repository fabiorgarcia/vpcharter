import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { GrClose } from "react-icons/gr";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiAirplaneTiltThin, PiCaretRightBold } from "react-icons/pi";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineModeEdit, MdOutlineHome } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";



function EditaAeronave() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [openModal, setOpenModal] = useState (false);
  const [loading, setLoading] = useState (false);
  const [loadingBtn, setLoadingBtn] = useState (false);
  const [loadingModal, setLoadingModal] = useState (false);
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [fabricanteModelo, setFabricanteModelo] = useState ('');
  const [idFabricanteModelo, setIdFabricanteModelo] = useState ('');
  const [typeForm, setTypeForm] = useState ('Insert');

  const [inputFabricanteEdit, setInputFabricanteEdit] = useState ('');
  

  const [fabricante, setFabricante] = useState ('');
  const [fabricanteData, setFabricanteData] = useState ([]);
  const [tipo, setTipo] = useState ('');
  const [modelo, setModelo] = useState ('');
  const [aeronave, setAeronave] = useState (''); 
  const [companhia, seCompanhia] = useState (''); 
  const [companhiaData, seCompanhiaData] = useState ([]); 
  const [fabricacao, setFabricacao] = useState (''); 
  const [ultimaRevisao, setUltimaRevisao] = useState (''); 
  const [aeroporto, setAeroporto] = useState ('');
  const [aeroportoData, setAeroportoData] = useState ([]); 
  const [angarPrincipal, setAngarPrincipal] = useState ('');
  const [registro, setRegistro] = useState (''); 
  const { id } = useParams();


  useEffect(() => {

    setLoading(true);

    var query = "SELECT * FROM `vpcharter_fabricante` order by `aeronave` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setFabricanteData(response.data)
        setFabricante(response.data[0]['id'])
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_companhia` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seCompanhiaData(response.data)
        seCompanhia(response.data[0]['id'])
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_aeroportos` order by `uf` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAeroportoData(response.data)
        setAeroporto(response.data[0]['iata'])
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))



    setTimeout(function() {    
      var query = "SELECT * FROM `vpcharter_frota` WHERE `id` = '"+id+"' ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setFabricante(response.data[0]['fabricante'])
          setAeronave(response.data[0]['nomeAeronave'])
          seCompanhia(response.data[0]['companhia'])
          setFabricacao(response.data[0]['fabricacao'])
          setUltimaRevisao(response.data[0]['ultimaRevisao'])
          setAeroporto(response.data[0]['aeroporto'])
          setAngarPrincipal(response.data[0]['angarPrincipal'])
          setRegistro(response.data[0]['registro'])
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Usuário não encontrado!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
      setLoading(false);
    }, 1000)


  }, [])


  function closeModal() {
    setFabricanteModelo('')
    setTypeAlert('')
  }


  function validaFormFabricante(e) {
    e.preventDefault();
    setLoading(true)

    if (fabricanteModelo) {
      var query = "INSERT INTO `vpcharter_fabricante` (`id`, `aeronave`) VALUES (NULL, '"+fabricanteModelo+"');";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        
          var query = "SELECT * FROM `vpcharter_fabricante` order by `aeronave` ";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
              setFabricanteData(response.data)
              setLoading(false)
              setOpenModal(false)
              setTypeAlert('alert-success')
              settitleAlert('Dados gravados com Sucesso!')
              setTimeout(()=> closeModal(),5000);

          })
          .catch(error=> alert(error))
      })
      .catch(error=> alert(error))
    }
  }
  

  function validaForm(e) {
    setLoadingBtn(true)
    e.preventDefault();
    setTimeout(function() {      
      
      var query = "UPDATE `vpcharter_frota` SET `fabricante` = '"+fabricante+"', `nomeAeronave` = '"+aeronave+"', `companhia` = '"+companhia+"', `fabricacao` = '"+fabricacao+"', `ultimaRevisao` = '"+ultimaRevisao+"', `aeroporto` = '"+aeroporto+"', `angarPrincipal` = '"+angarPrincipal+"', `registro` = '"+registro+"' WHERE `vpcharter_frota`.`id` = '"+id+"';";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setLoadingBtn(false)
          navigate('/aereo/frota/mapaassentos/'+id )
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Erro na Gravação!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
      
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


  function limpaFabricante() {
    for(let i = 0; i < fabricanteData.length; i = i + 1) {
      document.getElementById('inputFabricante'+fabricanteData[i].id).style.display = 'none';
      document.getElementById('nomeFabricante'+fabricanteData[i].id).style.display = 'block';
      document.getElementById('btnEditFabricante'+fabricanteData[i].id).style.opacity = '0';
    }
  }


  function updateFabricante(idEidt) {

    if (document.getElementById('inputFabricante'+idEidt).value) {

      setLoading(true)
      setTimeout(function() {      
        var query = "UPDATE `vpcharter_fabricante` SET `aeronave` = '"+document.getElementById('inputFabricante'+idEidt).value+"' WHERE `vpcharter_fabricante`.`id` = '"+idEidt+"' ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            
            var query = "SELECT * FROM `vpcharter_fabricante` order by `aeronave` ";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
                setFabricanteData(response.data)
                setLoading(false)
                setOpenModal(false)
                setTypeAlert('alert-success')
                settitleAlert('Dados alterados com Sucesso!')
                setTimeout(()=> closeModal(),5000);
            })
            .catch(error=> alert(error))
          } else {
            setTypeAlert('alert-danger')
            settitleAlert('Erro na Gravação!')
            setTimeout(()=> setTypeAlert(''),5000);
          }
        })
        .catch(error=> alert(error))
        
      }, 1000)


    }
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
            <button type='submit' ><span className={loadingModal ? 'hide' : ''}><BsCheckLg /></span><span className={loadingModal ? 'loader' : 'hide'}></span></button>
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/frota" relative="path">Frota</Link>&nbsp;/ Aeronave</div>

          <div className="lineButtons row ">
            <div className="col">
              <h1>Aeronave</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col'>
                  <form onSubmit={(e)=> validaForm(e)}>
                    <div className='row'>
                      <div className='col-4'>
                        <label>Fabricante/Modelo</label>
                        <select name="select" value={fabricante} onChange={(e) => changeFabricante(e.target.value)} >
                          <option disabled></option>
                          <option value="new">❯ Cadastrar/Editar</option>
                          <option disabled>━━━━━━━━━━━━━━</option>
                          {fabricanteData.map((data, index) => (
                            <option key={index} value={data.id}>{data.aeronave}</option>
                          ))}
                        </select>
                      </div>

                      <div className='col-5'>
                        <label>Companhia Aérea</label>
                        <select name="select" value={companhia} onChange={(e) => seCompanhia(e.target.value)} >
                          {companhiaData.map((data, index) => (
                            <option key={index} value={data.id}>{data.nome}</option>
                          ))}
                        </select>
                      </div>

                      <div className='col-3'>
                          <button type='submit' ><span className={loadingBtn ? 'hide' : ''}><PiCaretRightBold /> Avançar</span><span className={loadingBtn ? 'loader' : 'hide'}></span></button>
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
  
export default EditaAeronave