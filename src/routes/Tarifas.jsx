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
import { PiPlusCircleFill, PiAirplaneTiltThin } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { GrClose } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { VscEdit } from "react-icons/vsc";



function Tarifas() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [dataBase, setDataBase] = useState ([]); 
  const [dataBaseRotas, setDataBaseRotas] = useState ([]); 
  const [dataBaseAeroportos, setDataBaseAeroportos] = useState ([]); 
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [dataTotal, setDataTotal] = useState (0);
  const [startQuery, setStartQuery] = useState (0);
  const [limitQuery, setLimitQuery] = useState (25);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [stepsQuery, setStepsQuery] = useState (1);
  const [orderby, setOrderby] = useState ('name');
  const [orderDirection, setOrderDirection] = useState ('ASC');
  
  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 


  const [primeiraClasse, setPrimeiraClasse] = useState ([]);
  const [premium, setPremium] = useState ([]);
  const [executiva, setExecutiva] = useState ([]);
  const [economica, setEconomica] = useState ([]);
  const [primeiraclasse_chd, setPrimeiraClasse_chd] = useState ([]);
  const [premium_chd, setPremium_chd] = useState ([]);
  const [executiva_chd, setExecutiva_chd] = useState ([]);
  const [economica_chd, setEconomica_chd] = useState ([]);
  const [primeiraclasse_inf, setPrimeiraClasse_inf] = useState ([]);
  const [premium_inf, setPremium_inf] = useState ([]);
  const [executiva_inf, setExecutiva_inf] = useState ([]);
  const [economica_inf, setEconomica_inf] = useState ([]);
  const [custo_primeiraClasse, setCusto_PrimeiraClasse] = useState ([]);
  const [custo_premium, setCusto_Premium] = useState ([]);
  const [custo_executiva, setCusto_Executiva] = useState ([]);
  const [custo_economica, setCusto_Economica] = useState ([]);
  const [custo_primeiraclasse_chd, setCusto_Primeiraclasse_chd] = useState ([]);
  const [custo_premium_chd, setCusto_Premium_chd] = useState ([]);
  const [custo_executiva_chd, setCusto_Executiva_chd] = useState ([]);
  const [custo_economica_chd, setCusto_Economica_chd] = useState ([]);
  const [custo_primeiraclasse_inf, setCusto_Primeiraclasse_inf] = useState ([]);
  const [custo_premium_inf, setCusto_Premium_inf] = useState ([]);
  const [custo_executiva_inf, setCusto_Executiva_inf] = useState ([]);
  const [custo_economica_inf, setCusto_Economica_inf] = useState ([]);


  

  useEffect(() => {
    carregaPagina()
    listaTotal()
  }, [])

  function carregaPagina() {
    setLoading(true);


    //var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_tarifas.primeiraclasse, vpcharter_tarifas.premium, vpcharter_tarifas.executiva, vpcharter_tarifas.economica, vpcharter_rotas.voo, vpcharter_rotas.duracao, vpcharter_rotas.chegada, vpcharter_rotas.saida, vpcharter_tarifas.primeiraclasse_chd, vpcharter_tarifas.premium_chd, vpcharter_tarifas.executiva_chd, vpcharter_tarifas.economica_chd FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id INNER JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave LEFT JOIN `vpcharter_tarifas` ON vpcharter_rotas.id = vpcharter_tarifas.rota";
    var query = "SELECT `vpcharter_rotas`.`id` as id_rota, `vpcharter_companhia`.`nome`, `vpcharter_companhia`.`logo`, vpcharter_fabricante.aeronave, `vpcharter_rotas`.`origem`, `vpcharter_rotas`.`destino`, `vpcharter_rotas`.`saida`, `vpcharter_rotas`.`chegada`, `vpcharter_rotas`.`voo` FROM `vpcharter_rotas` INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBaseRotas(response.data)
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

  function formatNumber(x){
    const formatNumber = new Intl.NumberFormat('pt-BR')
    return formatNumber.format(x);
  }

  function formatMesAno(x) {
    let split = x.split('-');
    let ano = split[0]
    let mes = split[1]
    const meses = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
    //let dataFinal = meses[parseInt(mes)] + "/" + ano; 
    let dataFinal = mes + "/" + ano; 
    return dataFinal;
  }

  function formatDate(x) {
    const dataCriada = new Date(x);
    const dataFormatada = dataCriada.toLocaleDateString('pt-BR', {timeZone: 'UTC',});
    return dataFormatada;
  }

  function formatLogo(x) {
    let img = '<img scr="'+x+'" />'
    return img;
  }

  function editaaeronave(x) {
    navigate('/editaaeronave/'+x);
  }


  function selectAeroporto (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        return x + ' - '+dataBaseAeroportos[i]['nome'] + ' - '+dataBaseAeroportos[i]['cidade'] + ' / '+ dataBaseAeroportos[i]['uf'];
        break;
      }
    }
  }

  function novaTarifa(x) {
    navigate('/aereo/tarifas/cadastrotarifa/'+x);
  }

  function formatCurrency (e) {
    if (!e || e == '0.00') {
      var f = '━';
    } else {
      var f = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(e);
    }
    return f;
  }

  function formatTime (e) {
    let time = e.split(':');
    let timeformat = time[0] + ':' + time[1] + 'h';
    return timeformat;
  }

  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    //var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_frota.fabricacao, vpcharter_frota.ultimaRevisao, vpcharter_frota.angarPrincipal, vpcharter_frota.registro, vpcharter_rotas.origem, vpcharter_rotas.destino FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id LEFT JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave WHERE vpcharter_companhia.nome LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.nomeAeronave LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.fabricante LIKE '%"+buscaFiltro+"%' OR vpcharter_fabricante.aeronave LIKE '%"+buscaFiltro+"%' GROUP BY vpcharter_frota.id";
    var query = "SELECT `vpcharter_rotas`.`id` as id_rota, `vpcharter_companhia`.`nome`, `vpcharter_companhia`.`logo`, vpcharter_fabricante.aeronave, `vpcharter_rotas`.`origem`, `vpcharter_rotas`.`destino`, `vpcharter_rotas`.`saida`, `vpcharter_rotas`.`chegada`, `vpcharter_rotas`.`voo` FROM `vpcharter_rotas` INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante WHERE vpcharter_companhia.nome LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.nomeAeronave LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.fabricante LIKE '%"+buscaFiltro+"%' OR vpcharter_fabricante.aeronave LIKE '%"+buscaFiltro+"%' OR vpcharter_rotas.origem LIKE '%"+buscaFiltro+"%' OR vpcharter_rotas.destino LIKE '%"+buscaFiltro+"%' OR vpcharter_rotas.voo LIKE '%"+buscaFiltro+"%' ";

    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setDataBase(response.data)
        setDataBaseRotas(response.data)
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
      carregaPagina()
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;Tarifas</div>


          <div className='row lineButtons mt-3 mb-2'>
            <div className="col "><h1>Tarifas</h1></div>
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
          <h4>Rotas</h4>

              <div className='row'>
                <div className='col-12 table_list'> 
                
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <th scope="col">Rota</th>
                        <th scope="col">Companhia</th>
                        <th scope="col">Aeronave</th>
                        <th scope="col">Voo</th>
                        <th scope="col">Origem</th>
                        <th scope="col">Destino</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataBaseRotas.map((data, index) => (
                      <tr key={index} onClick={() => novaTarifa(data.id_rota)}>
                        <td>{data.id_rota}</td>
                        <td><img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nome}</td>
                        <td>{data.aeronave}</td>
                        <td>{data.voo}</td>
                        <td>{selectAeroporto(data.origem)} ⇀ <b>{formatTime(data.saida)}</b></td>
                        <td>{selectAeroporto(data.destino)} ⇀ <b>{formatTime(data.chegada)}</b></td>
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
  
export default Tarifas