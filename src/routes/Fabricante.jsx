import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { LiaUserEditSolid } from "react-icons/lia";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiPlusCircleFill, PiCaretRightBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { GrClose } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdOutlineModeEdit, MdOutlineHome } from "react-icons/md";
import ReactInputMask from 'react-input-mask';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";


function Fabricante() {

  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [openModal, setOpenModal] = useState (false);
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 

  const [typeForm, setTypeForm] = useState ('Insert');
  const [loadingModal, setLoadingModal] = useState (false);

  const [aeronave, setaeronave] = useState ('');
  const [idData, setIdData] = useState ('');

  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [newData, setNewData] = useState (true);;
  const [masterTitle, setMasterTitle] = useState ('Fabricantes');
  


  useEffect(() => {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_fabricante` ORDER BY `aeronave` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setListTotal(response.data.length)
      }
    })
    .catch(error=> alert(error))
    setLoading(false);
  }, [])

  function limpaForm() {
    setLoading(true);
    setNewData(true)
    setIdData("")
    setaeronave("")
    setTimeout(()=> setLoading(false),1000);
  }

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();

    setTimeout(function() {
      if (!newData) {
        var query = "UPDATE `vpcharter_fabricante` SET `aeronave` = '"+aeronave.trim()+"' WHERE `vpcharter_fabricante`.`id` = '"+idData+"';";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setTypeAlert('alert-success')
            settitleAlert('Sucesso!')
            setTxtAlert('Altrado com sucesso.')
            setTimeout(()=> setTypeAlert(''),5000);
            limpaForm();
            var query = "SELECT * FROM `vpcharter_fabricante` ORDER BY `aeronave` ";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) {  
                limpaForm();
                seListData(response.data)
              }
            })
            .catch(error=> alert(error))
          }
        })
        .catch(error=> alert(error))

      } else {
        var query = "SELECT * FROM `vpcharter_fabricante` WHERE `id` = '"+idData+"' ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setTypeAlert('alert-danger')
            settitleAlert('Aeroporto cadastrado!')
            setTxtAlert('Por favor, verifique os dados.')
            setTimeout(()=> setTypeAlert(''),5000);
          } else {
            var query = "INSERT INTO `vpcharter_fabricante` (`id`, `aeronave`) VALUES (NULL, '"+aeronave+"') ";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) {
                setTypeAlert('alert-success')
                settitleAlert('Sucesso!')
                setTxtAlert('Cadastrado com sucesso.')
                setTimeout(()=> setTypeAlert(''),5000);
                limpaForm();
                var query = "SELECT * FROM `vpcharter_fabricante` ORDER BY `aeronave` ";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response=> {
                  if (response.data.length > 0) { seListData(response.data) }
                })
                .catch(error=> alert(error))
          } else {
            setTypeAlert('alert-danger')
            settitleAlert('Erro na Gravação!')
            setTimeout(()=> setTypeAlert(''),5000);
          }
        })
        .catch(error=> alert(error))
        }
      })
      .catch(error=> alert(error))
      }
      setLoading(false)
    }, 1000)  

  }


  function editaData(idData, aeronave) {
    setLoading(true)
    limpaForm()
    setNewData(false)
    setIdData(idData)
    setaeronave(aeronave)
    setTimeout(()=> setLoading(false),1000);
  }


  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    setIdData('')
    var query = "SELECT * FROM `vpcharter_fabricante` WHERE `aeronave` LIKE '%"+buscaFiltro+"%' ORDER BY `aeronave` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setLoading(false);
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Dados não encontrados!')
        setTimeout(()=> setTypeAlert(''),5000);
        setLoading(false);
      }
    })
    .catch(error=> alert(error))
  }
  function changeBuscaFiltro(e) {
    setBuscaFiltro(e)
    setTypeAlert('')
    if (e.trim().length == 0) {
      setLoading(true);
      var query = "SELECT * FROM `vpcharter_fabricante` ORDER BY `aeronave` ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          seListData(response.data)
          setListTotal(response.data.length)
          setLoading(false);
        }
      })
      .catch(error=> alert(error))
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listSearch()
    }
  }


  return (
    <>


    {loading && <LoadingAnimation />}
    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        <div className={typeAlert ? "alert "+typeAlert : 'hide'} role="alert">
          <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
          {txtAlert}
        </div>
        <div className='breadCrumb'><Link to="/admin" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> Admin</Link>&nbsp;/&nbsp;{masterTitle}</div>


          <div className="lineButtons row ">
            <div className="col">
              <h1>{masterTitle}</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col'>
                  <form onSubmit={(e)=> validaForm(e)}>
                    <div className='row'>

                      <div className='col-9'>
                        <label>Característica</label>
                        <input type='text' value={aeronave} onChange={(e) => setaeronave(e.target.value)} required />
                      </div>

                      <div className='col-3'>
                          <button type='submit' >
                            <span className={loading ? 'hide' : ''}>
                              <span className={newData ? '' : 'hide'}><PiCaretRightBold /> Salvar</span>
                              <span className={!newData ? '' : 'hide'}><FiEdit /> Alterar</span>
                              </span>
                            <span className={loading ? 'loader' : 'hide'}></span>
                          </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>

          <div className='contentAll mt-3'>
              
              <div className='row lineButtons'>
                <div className="col ">
                  <h4>{masterTitle}</h4>
                </div>
                
                <div className="col btnTable">
                  <div className="buscaFiltro">
                    <input type='text' 
                      className='inputSearch' 
                      placeholder='Procurar por' 
                      value={buscaFiltro} 
                      onChange={(e)=>changeBuscaFiltro(e.target.value)}
                      onKeyDown={handleKeyDown} />
                    <FaMagnifyingGlass onClick={()=>listSearch()} />
                  </div>
                  <div className='rightBtn'>
                    <div>{listData.length}</div>
                    <div>de</div>
                    <div className='listTotal'>{listTotal}</div>
                    <button type="button" className="btn btnNew" onClick={()=>limpaForm()}>Novo <PiPlusCircleFill /></button>
                  </div>
                </div>
                
              </div>

              <div className='row'>
                <div className='table_list'> 
                  
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col" className='tdMaster'>Nome</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {listData.map((data, index) => (
                      <tr key={index} onClick={() => editaData(data.id, data.aeronave)} className={idData == data.id?'trSelect':''}>
                        <td>{data.id}</td>
                        <td>{data.aeronave}</td>
                        <td><BiSolidEdit /></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
      </div>
    </div>

    </>
  )
}
  
export default Fabricante