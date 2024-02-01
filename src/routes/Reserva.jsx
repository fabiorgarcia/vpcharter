import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { BsChevronLeft, BsChevronRight  } from "react-icons/bs";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { PiPlusCircleFill } from "react-icons/pi";
import { VscArrowBoth } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { GrClose } from "react-icons/gr";
import { MdOutlineHome, MdModeEdit } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";



function Reserva() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState (false);
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [dataBase, setDataBase] = useState ([]); 
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [dataBaseRotas, setDataBaseRotas] = useState ([]); 
  const [dataVolta, setDataVolta] = useState ([]); 
  const [dataTotal, setDataTotal] = useState (0);
  const [startQuery, setStartQuery] = useState (0);
  const [limitQuery, setLimitQuery] = useState (25);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [stepsQuery, setStepsQuery] = useState (1);
  const [orderby, setOrderby] = useState ('name');
  const [orderDirection, setOrderDirection] = useState ('ASC');
  const [dataBaseAeroportos, setDataBaseAeroportos] = useState ([]); 
  
  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [newData, setNewData] = useState (true);;
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 
  

  useEffect(() => {
    carregaPagina()
    listaTotal()
  }, [])

  function carregaPagina() {
    setLoading(true);
    var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_fretamento.cancelamento,  vpcharter_contratante.razaosocial FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)
        seListData(response.data)
        setListTotal(response.data.length)
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_rotas` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBaseRotas(response.data)
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_aeroportos` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBaseAeroportos(response.data)
        setLoading(false);
      }
    })
    .catch(error=> alert(error))

    

  }




  function listaTotal() {
    var newQuery = 'SELECT COUNT(*) AS total from vpcharter_frota';
    setLoading(true);
    let fData = new FormData();
        fData.append('query', newQuery);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
            setLoading(false)
            setDataTotal(response.data[0].total)

            if (response.data[0].total < 25) {
              setNewStartQuery(response.data[0].total)
            }
        })
        .catch(error=> alert(error))
  }

  function validaassentos(x) {
    navigate('/aereo/reserva/validacaoassentos/'+x);
  }


  function cadastro(x) {
    navigate('/aereo/fretamento/cadastrofretamento/'+x);
  }

  function formatDate(x) {
    const dataCriada = new Date(x);
    const dataFormatada = dataCriada.toLocaleDateString('pt-BR', {timeZone: 'UTC',});
    return dataFormatada;
  }

  const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  function formatUf (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        //return dataBaseAeroportos[i]['cidade'] + '/' + dataBaseAeroportos[i]['uf'];
        return  dataBaseAeroportos[i]['uf'];
        break
      }
    }
  }

  function formatAeroporto (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        return dataBaseAeroportos[i]['nome'];
        break
      }
    }
  }

  function formatCidadeAeroporto (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        return dataBaseAeroportos[i]['cidade']+'/'+dataBaseAeroportos[i]['uf']
        break
      }
    }
  }

  function formatTime (x) {
    return x.substring(0, 5) + 'h';
  }
  
  function formatDataChegada(data_saida, hora, duracao) {
    var duracao_horas = duracao.split(':');
    duracao_horas = parseInt(duracao_horas[0])
    var tt = data_saida + ' ' + hora;
    var time = new Date(tt);
    time.setHours(time.getHours() + duracao_horas);
    var chedada = time.toLocaleDateString('pt-BR');
    return chedada;
  }

  function formatHoraChegada(data_saida, hora, duracao) {
    var duracao_horas = duracao.split(':');
    duracao_horas = parseInt(duracao_horas[0]);
    var duracao_minutos = duracao.split(':');
    var duracao_minutos = parseInt(duracao_minutos[1]);
    var tt = data_saida + ' ' + hora;
    var time = new Date(tt);
    time.setHours(time.getHours() + duracao_horas);
    time.setMinutes(time.getMinutes() + duracao_minutos);
    var chedada = time.toLocaleTimeString('pt-BR');
    return chedada.substring(0, 5) + 'h';
  }

  function newId() {
    navigate('/aereo/frota/cadastroaeronave');
  }
  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_fretamento.cancelamento,  vpcharter_contratante.razaosocial FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia   WHERE vpcharter_fretamento.id LIKE '%"+buscaFiltro+"%' OR vpcharter_fretamento.data_frete LIKE '%"+buscaFiltro+"%' OR c1.nome LIKE '%"+buscaFiltro+"%' OR r1.voo LIKE '%"+buscaFiltro+"%' OR r1.origem LIKE '%"+buscaFiltro+"%' OR r1.destino LIKE '%"+buscaFiltro+"%' OR vpcharter_fretamento.rota_volta LIKE '%"+buscaFiltro+"%' OR vpcharter_fretamento.date_volta LIKE '%"+buscaFiltro+"%' OR c2.nome LIKE '%"+buscaFiltro+"%' OR r2.voo LIKE '%"+buscaFiltro+"%' OR r2.origem LIKE '%"+buscaFiltro+"%' OR r2.destino LIKE '%"+buscaFiltro+"%' OR vpcharter_contratante.razaosocial LIKE '%"+buscaFiltro+"%'   ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setDataBase(response.data)
        setLoading(false);
      } else {
        seListData([])
        setDataBase([])
        setLoading(false);
      }
    })
    .catch(error=> alert(error))
  }
  function changeBuscaFiltro(e) {
    setBuscaFiltro(e)
    setTypeAlert('')
    if (e.trim().length == 0) {
      carregaPagina()
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listSearch()
    }
  }

  function newId() {
    navigate('/aereo/fretamento/cadastrofretamento/');
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;Reserva</div>

          <div className='row lineButtons mt-3 mb-2'>
            <div className="col "><h1>Reserva</h1></div>
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
              </div>
            </div>
          </div>

          <div className='contentAll'>
            <h5 className='m-0'> Fretes</h5>


            <div className='row'>
              <div className='col-12 table_list'> 
                <table className='tblDefault'>
                  <thead>
                    <tr>
                      <th scope="col">Frete</th>
                      <th scope="col" colSpan="3">Rota de Ida</th>
                      <th scope="col" colSpan="3">Rota de Volta</th>
                      <th scope="col">Contratante</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataBase.map((data, index) => (
                    <tr key={index} onClick={() => validaassentos(data.id_fretamento)} className={data.multa > 0 ? 'fretamentoCancelado' : ''}>
                      <td>{data.id_fretamento}</td>
                      <td>{formatDate(data.data_frete)}</td>
                      <td>
                        <img className={data.r1cia ? 'imgCia' : 'hide'} src={data.r1logo} /> {data.r1logo ? '' : data.r1cia}
                      </td>
                      <td className='d-flex'>
                        <div>
                          <b>{data.r1origem}</b> • {formatTime(data.r1saida)}<br />{formatCidadeAeroporto(data.r1origem)}
                        </div>
                          <h5 className='m-2'>→</h5>
                          <div>
                            <b>{data.r1destino}</b> • {formatTime(data.r1chegada)}<br />{formatCidadeAeroporto(data.r1destino)}
                          </div>
                      </td>
                      <td>{formatDate(data.date_volta)}</td>
                      <td>
                        <img className={data.r2cia ? 'imgCia' : 'hide'} src={data.r2logo} /> {data.r2logo ? '' : data.r2cia}
                      </td>
                      <td className='d-flex'>
                        <div>
                          <b>{data.r2origem}</b> • {formatTime(data.r2saida)}<br />{formatCidadeAeroporto(data.r2origem)}
                        </div>
                          <h5 className='m-2'>→</h5>
                          <div>
                            <b>{data.r2destino}</b> • {formatTime(data.r2chegada)}<br />{formatCidadeAeroporto(data.r2destino)}
                          </div>
                      </td>
                      <td>{data.razaosocial}</td>
                      <td><span className={data.multa > 0 ? '' : 'hide'}>Cancelado</span></td>
                      <td><button>Reservar ✔</button></td>
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
  
export default Reserva