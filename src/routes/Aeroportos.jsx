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


function Aeroportos() {

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

  const [iata, setIata] = useState ('');
  const [icao, setIcao] = useState ('');
  const [nome, setNome] = useState ('');
  const [uf, setUf] = useState ('');
  const [cidade, setCidade] = useState ('');

  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [newData, setNewData] = useState (true);;
  const [masterTitle, setMasterTitle] = useState ('Aeroportos');
  


  useEffect(() => {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_aeroportos` ORDER BY `nome`, `uf` ";
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
    setIata("")
    setIcao("")
    setNome("")
    setUf("")
    setCidade("")
    setTimeout(()=> setLoading(false),1000);
  }

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();

    setTimeout(function() {
      if (!newData) {
        var query = "UPDATE `vpcharter_aeroportos` SET `iata` = '"+iata.toUpperCase().trim()+"', `icao` = '"+icao.toUpperCase().trim()+"', `nome` = '"+nome.trim()+"', `cidade` = '"+cidade.trim()+"', `uf` = '"+uf+"' WHERE `vpcharter_aeroportos`.`iata` = '"+iata.trim()+"';";
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
            var query = "SELECT * FROM `vpcharter_aeroportos` ORDER BY `nome`, `uf`";
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
        var query = "SELECT * FROM `vpcharter_aeroportos` WHERE `iata` = '"+iata+"' ";
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
            var query = "INSERT INTO `vpcharter_aeroportos` (`iata`, `icao`, `nome`, `cidade`, `uf`) VALUES ('"+iata+"', '"+icao+"', '"+nome+"', '"+cidade+"', '"+uf+"') ";
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
                var query = "SELECT * FROM `vpcharter_aeroportos` ORDER BY `nome`, `uf` ";
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


  function editaData(iata, icao, nome, cidade, uf) {
    setLoading(true)
    limpaForm()
    setNewData(false)
    setIata(iata)
    setIcao(icao)
    setNome(nome)
    setUf(uf)
    setCidade(cidade)
    setTimeout(()=> setLoading(false),1000);
  }


  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    var query = "SELECT * FROM `vpcharter_aeroportos` WHERE `iata` LIKE '%"+buscaFiltro+"%' OR `icao` LIKE '%"+buscaFiltro+"%' OR `nome` LIKE '%"+buscaFiltro+"%' OR `cidade` LIKE '%"+buscaFiltro+"%' OR `uf` LIKE '%"+buscaFiltro+"%'  ORDER BY `nome`, `uf` ";
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
      var query = "SELECT * FROM `vpcharter_aeroportos`  ORDER BY `nome`, `uf` ";
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

                      <div className='col-2'>
                        <label>IATA</label>
                        <input type='text' value={iata} onChange={(e) => setIata(e.target.value)} required />
                      </div>
                      
                      <div className='col-2'>
                        <label>ICAO</label>
                        <input type='text' value={icao} onChange={(e) => setIcao(e.target.value)} required />
                      </div>

                      <div className='col-8'>
                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
                      </div>

                      <div className='col-4'>
                        <label>Estado</label>
                        <select value={uf} onChange={(e) => setUf(e.target.value)} required >
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espirito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                      <div className='col-8'>
                        <label>Cidade</label>
                        <input type='text' value={cidade} onChange={(e) => setCidade(e.target.value)} required />
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
                        <th scope="col">IATA</th>
                        <th scope="col">ICAO</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {listData.map((data, index) => (
                      <tr key={index} onClick={() => editaData(data.iata, data.icao, data.nome, data.cidade, data.uf)} className={iata == data.iata?'trSelect':''}>
                        <td>{data.iata}</td>
                        <td>{data.icao}</td>
                        <td>{data.nome}</td>
                        <td>{data.cidade}</td>
                        <td>{data.uf}</td>
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
  
export default Aeroportos