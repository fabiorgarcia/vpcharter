import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { BsChevronLeft, BsChevronRight  } from "react-icons/bs";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { MdOutlineHome, MdNetworkCheck  } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { HiCheck } from "react-icons/hi";



function Checkin() {

  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState (true);
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [dataBase, setDataBase] = useState ([]); 
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [dataBaseFretamento, setDataBaseFretamento] = useState ([]); 
  const [dataTotal, setDataTotal] = useState (0);
  const [startQuery, setStartQuery] = useState (0);
  const [limitQuery, setLimitQuery] = useState (25);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [stepsQuery, setStepsQuery] = useState (1);
  const [orderby, setOrderby] = useState ('name');
  const [orderDirection, setOrderDirection] = useState ('ASC');
  const [dataBaseAeroportos, setDataBaseAeroportos] = useState ([]); 

  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 
  

  useEffect(() => {
    carregaPagina()
    listaTotal()
  }, [])

  function carregaPagina() {
    setLoading(true);
    var query = "SELECT vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_ida, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_reserva.checkin, vpcharter_reserva.assento, vpcharter_reserva.localizador, vpcharter_reserva.classe, vpcharter_reserva.nome, vpcharter_reserva.sobrenome, vpcharter_reserva.tipo, vpcharter_fretamento.id as id_frete, vpcharter_fretamento.data_frete, vpcharter_fretamento.rota_ida, vpcharter_rotas.aeronave, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_fabricante.aeronave as fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome as companhia, vpcharter_companhia.logo, vpcharter_contratante.razaosocial FROM `vpcharter_reserva` INNER JOIN `vpcharter_fretamento` ON vpcharter_fretamento.id = vpcharter_reserva.frete INNER JOIN `vpcharter_rotas` ON vpcharter_rotas.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_contratante` ON vpcharter_contratante.id = vpcharter_fretamento.contratante INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia ORDER by `frete`, `classe` ";
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

  function localizador(x) {
    navigate('/aereo/checkin/localizador/'+x);
  }

  function formatDate(x) {
    const dataCriada = new Date(x);
    const dataFormatada = dataCriada.toLocaleDateString('pt-BR', {timeZone: 'UTC',});
    return dataFormatada;
  }

  function formatDateTime(x) {
    if (x) {
      var data = new Date(x),
          dia  = data.getDate().toString(),
          mes  = (data.getMonth()+1).toString(),
          ano = data.getFullYear(),
          hora = data.getHours(),
          minutos = data.getMinutes(),
          segundos = data.getSeconds();
      const dataFormatada = dia+'/'+mes+'/'+ano+' '+hora+':'+minutos+'h';
      return dataFormatada;
    } else {
      return '-'
    }
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
        return x+' - '+dataBaseAeroportos[i]['nome']+' - '+dataBaseAeroportos[i]['cidade']+' - '+dataBaseAeroportos[i]['uf'];
        break
      }
    }
  }

  function formatClasse(x) {
    if (x == 'primeiraClasse') { return 'PC'}
    if (x == 'premium') { return 'PR'}
    if (x == 'executiva') { return 'EX'}
    if (x == 'economica') { return 'EC'}
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


  function listSearch() {

    setLoading(true);
    setTypeAlert('')
    var query = "SELECT vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_ida, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_reserva.checkin, vpcharter_reserva.assento, vpcharter_reserva.localizador, vpcharter_reserva.classe, vpcharter_reserva.nome, vpcharter_reserva.sobrenome, vpcharter_reserva.tipo, vpcharter_fretamento.id as id_frete, vpcharter_fretamento.data_frete, vpcharter_fretamento.rota_ida, vpcharter_rotas.aeronave, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_fabricante.aeronave as fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome as companhia, vpcharter_companhia.logo, vpcharter_contratante.razaosocial FROM `vpcharter_reserva` INNER JOIN `vpcharter_fretamento` ON vpcharter_fretamento.id = vpcharter_reserva.frete INNER JOIN `vpcharter_rotas` ON vpcharter_rotas.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_contratante` ON vpcharter_contratante.id = vpcharter_fretamento.contratante INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia  WHERE vpcharter_fabricante.aeronave LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.fabricante LIKE '%"+buscaFiltro+"%' OR vpcharter_companhia.nome LIKE '%"+buscaFiltro+"%' OR vpcharter_reserva.localizador LIKE '%"+buscaFiltro+"%' OR vpcharter_reserva.nome LIKE '%"+buscaFiltro+"%' OR vpcharter_reserva.sobrenome LIKE '%"+buscaFiltro+"%' OR vpcharter_reserva.tipo LIKE '%"+buscaFiltro+"%' OR vpcharter_contratante.razaosocial LIKE '%"+buscaFiltro+"%' OR vpcharter_rotas.voo LIKE '%"+buscaFiltro+"%'  ORDER by `frete`, `classe` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setDataBase(response.data)
        setLoading(false);
        setOpenModal(false)

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
      carregaPagina()
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listSearch()
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



  return (
    <>


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center modalLocalizador'>
        <GrClose className='closeModal' onClick={()=>setOpenModal(false)} />
        <div className="voucherIcon2"></div>
        <h1>Digite o Localizador</h1> 
          <div className='row mt-5 mb-3'>
            <div className='col-12'>
              <div className="buscaFiltro">
                <input type='text' 
                  className='inputSearch' 
                  placeholder='Procurar por' 
                  value={buscaFiltro} 
                  onChange={(e)=>changeBuscaFiltro(e.target.value)}
                  onKeyDown={handleKeyDown} />
              </div>
            </div>
            <div className='col-12 mt-2'>
              <button type='button' onClick={()=>listSearch()}><span>Procurar <FaMagnifyingGlass /></span></button>
            </div>
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;Check In</div>

          <div className='row lineButtons mt-3 mb-2'>
            <div className="col "><h1>Check In</h1></div>
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
              <div className='row'>

                <div className='col-12 table_list'> 
                  <h5><b>Reservas</b></h5>
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <th scope="col">Checkin</th>
                        <th scope="col">Localizador</th>
                        <th scope="col">Passageiro</th>
                        <th scope="col" className='text-center'>Assento</th>
                        <th scope="col" className='text-center'>Tipo</th>
                        <th scope="col" className='text-center'>Frete</th>
                        <th scope="col" colSpan="2">Rota de Ida</th>

                        <th scope="col" colSpan="2">Rota de Volta</th>

                        <th scope="col">Contratante</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataBase.map((data, index) => (
                      <tr key={index} onClick={() => localizador(data.localizador)} className={data.multa > 0 ? 'fretamentoCancelado' : ''}>
                        <td><b>{formatDateTime(data.checkin)}</b></td>
                        <td><b>{data.localizador}</b></td>
                        <td>{data.nome} {data.sobrenome}</td>
                        <td className='text-center'>{data.assento}/{formatClasse(data.classe)}</td>
                        <td className='text-center'>{data.tipo}</td>
                        <td className='text-center'>{data.id_frete}</td>

                        <td>
                          <img className={data.r1cia ? 'imgCia' : 'hide'} src={data.r1logo} /> {data.r1logo ? '' : data.r1cia}
                        </td>
                        <td className='d-flex'>
                          <div>
                            {formatDate(data.data_frete)}<br />
                            <b>{data.r1origem}</b> • {formatTime(data.r1saida)}<br />{formatCidadeAeroporto(data.r1origem)}
                          </div>
                            <h5 className='m-2'>→</h5>
                            <div>
                              {formatDate(data.data_frete)}<br />
                              <b>{data.r1destino}</b> • {formatTime(data.r1chegada)}<br />{formatCidadeAeroporto(data.r1destino)}
                            </div>
                        </td>

                        <td>
                          <img className={data.r2cia ? 'imgCia' : 'hide'} src={data.r2logo} /> {data.r2logo ? '' : data.r2cia}
                        </td>
                        <td className='d-flex'>
                          <div>
                            {formatDate(data.date_volta)}<br />
                            <b>{data.r2origem}</b> • {formatTime(data.r2saida)}<br />{formatCidadeAeroporto(data.r2origem)}
                          </div>
                            <h5 className='m-2'>→</h5>
                            <div>
                              {formatDate(data.date_volta)}<br />
                              <b>{data.r2destino}</b> • {formatTime(data.r2chegada)}<br />{formatCidadeAeroporto(data.r2destino)}
                            </div>
                        </td>

                        <td><div className='maxCh'>{data.razaosocial}</div></td>
                        <td><div className='btnAddValor' title='Alterar Valor'>✎</div></td>
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
  
export default Checkin