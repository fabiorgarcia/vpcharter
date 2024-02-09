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


function Companhias() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
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

  const [cod, setCod] = useState ('');
  const [iata, setIata] = useState ('');
  const [icao, setIcao] = useState ('');
  const [nome, setNome] = useState ('');
  const [tipo, setTipo] = useState ('');
  const [logo, setLogo] = useState ('');
  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [newData, setNewData] = useState (true);;
  const [masterTitle, setMasterTitle] = useState ('Companhias');
  const [nomenPC, setNomenPC] = useState ('');
  const [nomenPR, setNomenPR] = useState ('');
  const [nomenEX, setNomenEX] = useState ('');
  const [nomenEC, setNomenEC] = useState ('');




  useEffect(() => {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_companhia` ORDER BY `id`";
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
    setCod('')
    setIata('')
    setIcao('')
    setTipo('')
    setNome('')
    setLogo('')
    setNomenPC('')
    setNomenPR('')
    setNomenEX('')
    setNomenEC('')
    setTimeout(()=> setLoading(false),1000);
  }

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();

    setTimeout(function() {
      if (!newData) {
        var query = "UPDATE `vpcharter_companhia` SET `cod` = '"+cod.toUpperCase().trim()+"', `iata` = '"+iata.toUpperCase().trim()+"', `icao` = '"+icao.toUpperCase().trim()+"', `nome` = '"+nome.trim()+"', `tipo` = '"+tipo.trim()+"', `logo` = '"+logo+"', `nomen_pc` = '"+nomenPC+"', `nomen_pr` = '"+nomenPR+"', `nomen_ex` = '"+nomenEX+"', `nomen_ec` = '"+nomenEC+"' WHERE `vpcharter_companhia`.`iata` = '"+iata.trim()+"';";
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
            var query = "SELECT * FROM `vpcharter_companhia` ORDER BY `id`";
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
        var query = "SELECT * FROM `vpcharter_companhia` WHERE `iata` = '"+iata+"' ";
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
            var query = "INSERT INTO `vpcharter_companhia` (`cod`, `iata`, `icao`, `nome`, `tipo`, `logo`, `nomen_pc`, `nomen_pr`, `nomen_ex`, `nomen_ec`) VALUES ('"+cod+"', '"+iata+"', '"+icao+"', '"+nome+"', '"+tipo+"', '"+logo+"', '"+nomenPC+"', '"+nomenPR+"', '"+nomenEX+"', '"+nomenEC+"') ";
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
                var query = "SELECT * FROM `vpcharter_companhia` ORDER BY `id` ";
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


  function editaData(cod, iata, icao, tipo, nome, nomenPC, nomenPR, nomenEX, nomenEC, logo) {
    setLoading(true)
    limpaForm()
    setNewData(false)
    setCod(cod)
    setIata(iata)
    setIcao(icao)
    setTipo(tipo)
    setNome(nome)
    setNomenPC(nomenPC)
    setNomenPR(nomenPR)
    setNomenEX(nomenEX)
    setNomenEC(nomenEC)
    setLogo(logo)
    setTimeout(()=> setLoading(false),1000);
  }


  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    var query = "SELECT * FROM `vpcharter_companhia` WHERE `iata` LIKE '%"+buscaFiltro+"%' OR `icao` LIKE '%"+buscaFiltro+"%' OR `nome` LIKE '%"+buscaFiltro+"%' OR `cidade` LIKE '%"+buscaFiltro+"%' OR `uf` LIKE '%"+buscaFiltro+"%'  ORDER BY `nome`, `uf` ";
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
      var query = "SELECT * FROM `vpcharter_companhia`  ORDER BY `nome`, `uf` ";
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
                      <div className='col'>
                        <label>COD</label>
                        <input type='text' value={cod} onChange={(e) => setCod(e.target.value)} required />
                      </div>
                      <div className='col'>
                        <label>IATA</label>
                        <input type='text' value={iata} onChange={(e) => setIata(e.target.value)} required />
                      </div>
                      <div className='col'>
                        <label>ICAO</label>
                        <input type='text' value={icao} onChange={(e) => setIcao(e.target.value)} required />
                      </div>
                      <div className='col'>
                        <label>Tipo</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required >
                          <option value=""></option>
                          <option value="AERO">Aéreo</option>
                          <option value="RODO">Rodoviário</option>
                        </select>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-6'>
                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
                      </div>
                      <div className='col-6'>
                        <label>URL Logo</label>
                        <input type='text' placeholder='http://www.' value={logo} onChange={(e) => setLogo(e.target.value)} required />
                      </div>

                      <div className='col-12'>
                        <label><b>Nomenclatura das Categorias</b></label>
                      </div>

                      <div className='col-3'>
                        <label>Primeira Classe</label>
                        <input type='text' value={nomenPC} onChange={(e) => setNomenPC(e.target.value)} required />
                      </div>
                      <div className='col-3'>
                        <label>Premium</label>
                        <input type='text' value={nomenPR} onChange={(e) => setNomenPR(e.target.value)} required />
                      </div>
                      <div className='col-3'>
                        <label>Executiva</label>
                        <input type='text' value={nomenEX} onChange={(e) => setNomenEX(e.target.value)} required />
                      </div>
                      <div className='col-3'>
                        <label>Econômica</label>
                        <input type='text' value={nomenEC} onChange={(e) => setNomenEC(e.target.value)} required />
                      </div>

                    </div>

                    <div className='row'>
                      <div className='col'></div>
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
                        <th scope="col">COD</th>
                        <th scope="col">IATA</th>
                        <th scope="col">ICAO</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nome</th>
                        <th scope="col" colSpan='4'>Nomenclatura das Categorias</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {listData.map((data, index) => (
                      <tr key={index} onClick={() => editaData(data.cod, data.iata, data.icao, data.tipo, data.nome, data.nomen_pc, data.nomen_pr, data.nomen_ex, data.nomen_ec, data.logo)} className={iata == data.iata?'trSelect':''}>
                        <td>{data.cod}</td>
                        <td>{data.iata}</td>
                        <td>{data.icao}</td>
                        <td>{data.tipo}</td>
                        <td>{data.nome}</td>
                        <td>{data.nomen_pc}</td>
                        <td>{data.nomen_pr}</td>
                        <td>{data.nomen_ex}</td>
                        <td>{data.nomen_ec}</td>
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
  
export default Companhias