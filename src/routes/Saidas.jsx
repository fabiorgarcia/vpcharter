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
import { Carousel } from '@trendyol-js/react-carousel';
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiAirplane, PiPlusCircleFill } from "react-icons/pi";



function Saidas() {


  const [loading, setLoading] = useState (false);
  const navigate = useNavigate()
  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const [dataBase, setDataBase] = useState ([]); 
  const [dataBaseRotas, setDataBaseRotas] = useState ([]); 
  const [dataBaseAeroportos, setDataBaseAeroportos] = useState ([]); 
  const [dataTotal, setDataTotal] = useState (0);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [selectMonth, setSelectMonth] = useState ('');

  const [statusUser, setStatusUser] = useState ();
  const [buscaFiltro, setBuscaFiltro] = useState ('');
  const [newData, setNewData] = useState (true);;
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 
  const [correntYear, setCorrentYear] = useState (''); 
  const [orderMonth, setOrderMonth] = useState ([]); 
  
  

  useEffect(() => {
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
      }
    })
    .catch(error=> alert(error))


    var Xmas95 = new Date();
    var currentMonth = Xmas95.getMonth() + 1;

    for (let i = 1; i < 13; i++) {
      var idSelect = 'btnMonth'+[i];
      document.getElementById(idSelect).className = '';
    }

    setCorrentYear(Xmas95.getFullYear())
    var idSelect = 'btnMonth' + currentMonth;
    document.getElementById(idSelect).className = 'selectMonth';
    document.getElementById(idSelect+'b').className = 'selectMonth';
    document.getElementById(idSelect+'c').className = 'selectMonth';
    document.getElementById(idSelect+'d').className = 'selectMonth';
    document.getElementById(idSelect+'e').className = 'selectMonth';

    setSelectMonth(currentMonth)
    carregaPagina(currentMonth)
    listaTotal()
    setStatusUser(Globals.userStatus)
  }, [])

  function carregaPagina(y) {
    setLoading(true);
    setDataBase([])
    var month = y;

    var Xmas95 = new Date();
    var currentYear = Xmas95.getFullYear();
    var currentMonth = Xmas95.getMonth() + 1;
    if (month < currentMonth) { currentYear = currentYear + 1; }

    var sub_array = [];
    for (let i = 1; i < 13; i++) {
      if (i >= currentMonth) { sub_array.push(i); }
    }

    for (let i = 1; i < currentMonth; i++) {
      if (i <= currentMonth) { sub_array.push(i); }
    }

    setOrderMonth(sub_array)
    setCorrentYear(currentYear)

    var startMonth = currentYear+'-'+month+'-01';
    var finalMonth = currentYear+'-'+month+'-31';
    //var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_fretamento.cancelamento,  vpcharter_contratante.razaosocial FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia WHERE  vpcharter_fretamento.data_frete BETWEEN '"+startMonth+"' AND '"+finalMonth+"' ";
    var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_fretamento.cancelamento,  vpcharter_contratante.razaosocial, (SELECT vpcharter_tarifas.valor FROM vpcharter_tarifas WHERE vpcharter_tarifas.rota = r1.id AND vpcharter_tarifas.tipo = 'VV' AND vpcharter_tarifas.categoria = 'ADT' ORDER BY `date` DESC LIMIT 1) as valor_minimo FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia WHERE  vpcharter_fretamento.data_frete BETWEEN '"+startMonth+"' AND '"+finalMonth+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)
        seListData(response.data)
        setListTotal(response.data.length)
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
    .catch(error=> alert(error))

  }



  function listaTotal() {
    var newQuery = 'SELECT COUNT(*) AS total from vpcharter_frota';
    let fData = new FormData();
        fData.append('query', newQuery);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
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

  function origemDestino (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        var uf = dataBaseAeroportos[i]['uf'];
        if (uf == 'RO') { return 'Rondônia' }
        if (uf == 'AC') { return 'Acre' }
        if (uf == 'AM') { return 'Amazonas' }
        if (uf == 'RR') { return 'Roraima' }
        if (uf == 'PA') { return 'Pará' }
        if (uf == 'AP') { return 'Amapá' }
        if (uf == 'TO') { return 'Tocantins' }
        if (uf == 'MA') { return 'Maranhão' }
        if (uf == 'PI') { return 'Piauí' }
        if (uf == 'CE') { return 'Ceará' }
        if (uf == 'RN') { return 'Rio Grande do Norte' }
        if (uf == 'PB') { return 'Paraíba' }
        if (uf == 'PE') { return 'Pernambuco' }
        if (uf == 'AL') { return 'Alagoas' }
        if (uf == 'SE') { return 'Sergipe' }
        if (uf == 'BA') { return 'Bahia' }
        if (uf == 'MG') { return 'Minas Gerais' }
        if (uf == 'ES') { return 'Espírito Santo' }
        if (uf == 'RJ') { return 'Rio de Janeiro' }
        if (uf == 'SP') { return 'São Paulo' }
        if (uf == 'PR') { return 'Paraná' }
        if (uf == 'SC') { return 'Santa Catarina' }
        if (uf == 'RS') { return 'Rio Grande do Sul' }
        if (uf == 'MS') { return 'Mato Grosso do Sul' }
        if (uf == 'MT') { return 'Mato Grosso' }
        if (uf == 'GO') { return 'Goiás' }
        if (uf == 'DF') { return 'Distrito Federal' }
        
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
    navigate('/aereo/saidas/cadastrosaidas/');
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


  function changeMonth(x) {

    for (let i = 1; i < 13; i++) {
      document.getElementById('btnMonth'+[i]).className = '';
      document.getElementById('btnMonth'+[i]+'b').className = '';
      document.getElementById('btnMonth'+[i]+'c').className = '';
      document.getElementById('btnMonth'+[i]+'d').className = '';
      document.getElementById('btnMonth'+[i]+'e').className = '';
    }

    if(x=='1') { 
      document.getElementById('btnMonth1').className = 'selectMonth'; 
      document.getElementById('btnMonth1b').className = 'selectMonth'; 
      document.getElementById('btnMonth1c').className = 'selectMonth'; 
      document.getElementById('btnMonth1d').className = 'selectMonth'; 
      document.getElementById('btnMonth1e').className = 'selectMonth'; 
    }
    if(x=='2') { 
      document.getElementById('btnMonth2').className = 'selectMonth'; 
      document.getElementById('btnMonth2b').className = 'selectMonth'; 
      document.getElementById('btnMonth2c').className = 'selectMonth'; 
      document.getElementById('btnMonth2d').className = 'selectMonth'; 
      document.getElementById('btnMonth2e').className = 'selectMonth'; 
    }
    if(x=='3') { 
      document.getElementById('btnMonth3').className = 'selectMonth'; 
      document.getElementById('btnMonth3b').className = 'selectMonth'; 
      document.getElementById('btnMonth3c').className = 'selectMonth'; 
      document.getElementById('btnMonth3d').className = 'selectMonth'; 
      document.getElementById('btnMonth3e').className = 'selectMonth'; 
    }
    if(x=='4') { 
      document.getElementById('btnMonth4').className = 'selectMonth'; 
      document.getElementById('btnMonth4b').className = 'selectMonth'; 
      document.getElementById('btnMonth4c').className = 'selectMonth'; 
      document.getElementById('btnMonth4d').className = 'selectMonth'; 
      document.getElementById('btnMonth4e').className = 'selectMonth'; 
    }
    if(x=='5') { 
      document.getElementById('btnMonth5').className = 'selectMonth'; 
      document.getElementById('btnMonth5b').className = 'selectMonth'; 
      document.getElementById('btnMonth5c').className = 'selectMonth'; 
      document.getElementById('btnMonth5d').className = 'selectMonth'; 
      document.getElementById('btnMonth5e').className = 'selectMonth'; 
    }
    if(x=='6') { 
      document.getElementById('btnMonth6').className = 'selectMonth'; 
      document.getElementById('btnMonth6b').className = 'selectMonth'; 
      document.getElementById('btnMonth6c').className = 'selectMonth'; 
      document.getElementById('btnMonth6d').className = 'selectMonth'; 
      document.getElementById('btnMonth6e').className = 'selectMonth'; 
    }
    if(x=='7') { 
      document.getElementById('btnMonth7').className = 'selectMonth'; 
      document.getElementById('btnMonth7b').className = 'selectMonth'; 
      document.getElementById('btnMonth7c').className = 'selectMonth'; 
      document.getElementById('btnMonth7d').className = 'selectMonth'; 
      document.getElementById('btnMonth7e').className = 'selectMonth'; 
    }
    if(x=='8') { 
      document.getElementById('btnMonth8').className = 'selectMonth'; 
      document.getElementById('btnMonth8b').className = 'selectMonth'; 
      document.getElementById('btnMonth8c').className = 'selectMonth'; 
      document.getElementById('btnMonth8d').className = 'selectMonth'; 
      document.getElementById('btnMonth8e').className = 'selectMonth'; 
    }
    if(x=='9') { 
      document.getElementById('btnMonth9').className = 'selectMonth'; 
      document.getElementById('btnMonth9b').className = 'selectMonth'; 
      document.getElementById('btnMonth9c').className = 'selectMonth'; 
      document.getElementById('btnMonth9d').className = 'selectMonth'; 
      document.getElementById('btnMonth9e').className = 'selectMonth'; 
    }
    if(x=='10') { 
      document.getElementById('btnMonth10').className = 'selectMonth'; 
      document.getElementById('btnMonth10b').className = 'selectMonth'; 
      document.getElementById('btnMonth10c').className = 'selectMonth'; 
      document.getElementById('btnMonth10d').className = 'selectMonth'; 
      document.getElementById('btnMonth10e').className = 'selectMonth'; 
    }
    if(x=='11') { 
      document.getElementById('btnMonth11').className = 'selectMonth'; 
      document.getElementById('btnMonth11b').className = 'selectMonth'; 
      document.getElementById('btnMonth11c').className = 'selectMonth'; 
      document.getElementById('btnMonth11d').className = 'selectMonth'; 
      document.getElementById('btnMonth11e').className = 'selectMonth'; 
    }
    if(x=='12') { 
      document.getElementById('btnMonth12').className = 'selectMonth'; 
      document.getElementById('btnMonth12b').className = 'selectMonth'; 
      document.getElementById('btnMonth12c').className = 'selectMonth'; 
      document.getElementById('btnMonth12d').className = 'selectMonth'; 
      document.getElementById('btnMonth12e').className = 'selectMonth'; 
    }

    setSelectMonth(x)
    carregaPagina(x)
  }

  function formatMonth(x) {
    var mes = '';
    if (x=='1') { mes='Janeiro'}
    if (x=='2') { mes='Fevereiro'}
    if (x=='3') { mes='Março'}
    if (x=='4') { mes='Abril'}
    if (x=='5') { mes='Maio'}
    if (x=='6') { mes='Junho'}
    if (x=='7') { mes='Julho'}
    if (x=='8') { mes='Agosto'}
    if (x=='9') { mes='Setembro'}
    if (x=='10') { mes='Outubro'}
    if (x=='11') { mes='Novembro'}
    if (x=='12') { mes='Dezembro'}
    return mes;
  }

  function validaassentos(x) {
    navigate('/aereo/reserva/validacaoassentos/'+x);
  }

  function formatCurrency (e) {
    e = Number(e)*2;
    if (!e || e == '0.00') {
      var f = '━';
    } else {
      var f = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(e);
    }
    return f;
  }

  function editasaidas(x) {
    navigate('/aereo/saidas/editasaidas/'+x);
  }




  
    return (
      <>
      {loading && <LoadingAnimation />}
      <Header />
      <div className='allTab'>
        <Sidebar />
            <div className='content'>

              <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;Saídas</div>

              <div className='contentMaster mb-4 mt-4'>

                <h4>Escolha o mês da data de saída</h4>

                <div className='carousel_1'>
                  <Carousel show={8.5} slide={2} infinite={false} swiping={true} responsive={true} >
                    <button onClick={()=>changeMonth('1')} id='btnMonth1'>Janeiro</button>
                    <button onClick={()=>changeMonth('2')} id='btnMonth2'>Fevereiro</button>
                    <button onClick={()=>changeMonth('3')} id='btnMonth3'>Março</button>
                    <button onClick={()=>changeMonth('4')} id='btnMonth4'>Abril</button>
                    <button onClick={()=>changeMonth('5')} id='btnMonth5'>Maio</button>
                    <button onClick={()=>changeMonth('6')} id='btnMonth6'>Junho</button>
                    <button onClick={()=>changeMonth('7')} id='btnMonth7'>Julho</button>
                    <button onClick={()=>changeMonth('8')} id='btnMonth8'>Agosto</button>
                    <button onClick={()=>changeMonth('9')} id='btnMonth9'>Setembro</button>
                    <button onClick={()=>changeMonth('10')} id='btnMonth10'>Outubro</button>
                    <button onClick={()=>changeMonth('11')} id='btnMonth11'>Novembro</button>
                    <button onClick={()=>changeMonth('12')} id='btnMonth12'>Dezembro</button>
                  </Carousel>
                </div>

                <div className='carousel_2'>
                  <Carousel show={6.5} slide={2} infinite={false} swiping={true} responsive={true}>
                    <button onClick={()=>changeMonth('1')} id='btnMonth1b'>Janeiro</button>
                    <button onClick={()=>changeMonth('2')} id='btnMonth2b'>Fevereiro</button>
                    <button onClick={()=>changeMonth('3')} id='btnMonth3b'>Março</button>
                    <button onClick={()=>changeMonth('4')} id='btnMonth4b'>Abril</button>
                    <button onClick={()=>changeMonth('5')} id='btnMonth5b'>Maio</button>
                    <button onClick={()=>changeMonth('6')} id='btnMonth6b'>Junho</button>
                    <button onClick={()=>changeMonth('7')} id='btnMonth7b'>Julho</button>
                    <button onClick={()=>changeMonth('8')} id='btnMonth8b'>Agosto</button>
                    <button onClick={()=>changeMonth('9')} id='btnMonth9b'>Setembro</button>
                    <button onClick={()=>changeMonth('10')} id='btnMonth10b'>Outubro</button>
                    <button onClick={()=>changeMonth('11')} id='btnMonth11b'>Novembro</button>
                    <button onClick={()=>changeMonth('12')} id='btnMonth12b'>Dezembro</button>
                  </Carousel>
                </div>

                <div className='carousel_3'>
                  <Carousel show={5.5} infinite={false} swiping={true} responsive={true}>
                    <button onClick={()=>changeMonth('1')} id='btnMonth1c'>Janeiro</button>
                    <button onClick={()=>changeMonth('2')} id='btnMonth2c'>Fevereiro</button>
                    <button onClick={()=>changeMonth('3')} id='btnMonth3c'>Março</button>
                    <button onClick={()=>changeMonth('4')} id='btnMonth4c'>Abril</button>
                    <button onClick={()=>changeMonth('5')} id='btnMonth5c'>Maio</button>
                    <button onClick={()=>changeMonth('6')} id='btnMonth6c'>Junho</button>
                    <button onClick={()=>changeMonth('7')} id='btnMonth7c'>Julho</button>
                    <button onClick={()=>changeMonth('8')} id='btnMonth8c'>Agosto</button>
                    <button onClick={()=>changeMonth('9')} id='btnMonth9c'>Setembro</button>
                    <button onClick={()=>changeMonth('10')} id='btnMonth10c'>Outubro</button>
                    <button onClick={()=>changeMonth('11')} id='btnMonth11c'>Novembro</button>
                    <button onClick={()=>changeMonth('12')} id='btnMonth12c'>Dezembro</button>
                  </Carousel>
                </div>

                <div className='carousel_4'>
                  <Carousel show={4.5} infinite={false} swiping={true} responsive={true}>
                    <button onClick={()=>changeMonth('1')} id='btnMonth1d'>Janeiro</button>
                    <button onClick={()=>changeMonth('2')} id='btnMonth2d'>Fevereiro</button>
                    <button onClick={()=>changeMonth('3')} id='btnMonth3d'>Março</button>
                    <button onClick={()=>changeMonth('4')} id='btnMonth4d'>Abril</button>
                    <button onClick={()=>changeMonth('5')} id='btnMonth5d'>Maio</button>
                    <button onClick={()=>changeMonth('6')} id='btnMonth6d'>Junho</button>
                    <button onClick={()=>changeMonth('7')} id='btnMonth7d'>Julho</button>
                    <button onClick={()=>changeMonth('8')} id='btnMonth8d'>Agosto</button>
                    <button onClick={()=>changeMonth('9')} id='btnMonth9d'>Setembro</button>
                    <button onClick={()=>changeMonth('10')} id='btnMonth10d'>Outubro</button>
                    <button onClick={()=>changeMonth('11')} id='btnMonth11d'>Novembro</button>
                    <button onClick={()=>changeMonth('12')} id='btnMonth12d'>Dezembro</button>
                  </Carousel>
                </div>

                <div className='carousel_5'>
                  <Carousel show={2} infinite={false} swiping={true} responsive={true}>
                  <button onClick={()=>changeMonth('1')} id='btnMonth1e'>Janeiro</button>
                    <button onClick={()=>changeMonth('2')} id='btnMonth2e'>Fevereiro</button>
                    <button onClick={()=>changeMonth('3')} id='btnMonth3e'>Março</button>
                    <button onClick={()=>changeMonth('4')} id='btnMonth4e'>Abril</button>
                    <button onClick={()=>changeMonth('5')} id='btnMonth5e'>Maio</button>
                    <button onClick={()=>changeMonth('6')} id='btnMonth6e'>Junho</button>
                    <button onClick={()=>changeMonth('7')} id='btnMonth7e'>Julho</button>
                    <button onClick={()=>changeMonth('8')} id='btnMonth8e'>Agosto</button>
                    <button onClick={()=>changeMonth('9')} id='btnMonth9e'>Setembro</button>
                    <button onClick={()=>changeMonth('10')} id='btnMonth10e'>Outubro</button>
                    <button onClick={()=>changeMonth('11')} id='btnMonth11e'>Novembro</button>
                    <button onClick={()=>changeMonth('12')} id='btnMonth12e'>Dezembro</button>
                  </Carousel>
                </div>

              </div>



              <div className='contentAll mt-3'>

                <div  className={dataBase.length==0?'hide':'row lineButtons mb-4 mt-0'}>
                  <div className={dataBase.length>0?'textDefault600 col':'hide'}>
                    {listTotal} resultados foram encontrados para <span className='pink-salmon'>{formatMonth(selectMonth)} de {correntYear}</span>
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
                      <button type="button" className="btn btnNew" onClick={()=>newId()}>Novo <PiPlusCircleFill /></button>
                    </div>

                  </div>
                </div>

                <div className='row'>
                  <div className='col-12 table_list mt-0'> 

                    <div className={dataBase.length>0?'hide':'textDefault'}>
                      <span className='pink-salmon'><b>Não encontramos resultados para {formatMonth(selectMonth)} de {correntYear}</b></span><br />
                      <span className='travel-blue'>Busque ofertas em outro mês ou entre em contato com a ViagensPromo.</span>
                    </div>

                    {dataBase.map((data, index) => (

                      <div key={index} className='row listDiv'>

                        <div className='col-4' onClick={()=>editasaidas(data.id_fretamento)}>
                          <h5>{origemDestino(data.r1origem)} - {origemDestino(data.r2origem)}</h5>
                          {formatDate(data.data_frete)} a {formatDate(data.date_volta)}
                        </div>

                        <div className='col firstCol' onClick={()=>editasaidas(data.id_fretamento)}>
                          <div className='idaVolta'>
                            <PiAirplane className='airplaneIda' /> Ida: {formatDate(data.data_frete)}
                          </div>
                          <div className='rota'>
                            <div className='product'>
                              <img className={data.r1cia ? 'imgCia' : 'hide'} src={data.r1logo} /> {data.r1logo ? '' : data.r1cia}
                              <div>
                                <b>{data.r1origem}</b> {formatTime(data.r1saida)}<br />
                                <small>{formatCidadeAeroporto(data.r1origem)}</small>
                              </div>
                            </div>
                            <span className='arrow'>⟶</span>
                            <div className='product'>
                              <div>
                                <b>{data.r1destino}</b> {formatTime(data.r1chegada)}<br />
                                <small>{formatCidadeAeroporto(data.r1destino)}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col' onClick={()=>editasaidas(data.id_fretamento)}>
                          <div className='idaVolta'>
                            <PiAirplane className='airplaneVolta' /> Volta: {formatDate(data.date_volta)}
                          </div>

                          <div className='rota'>
                            <div className='product'>
                              <img className={data.r2cia ? 'imgCia' : 'hide'} src={data.r2logo} /> {data.r2logo ? '' : data.r2cia}
                              <div>
                                <b>{data.r2origem}</b> {formatTime(data.r2saida)}<br />
                                <small>{formatCidadeAeroporto(data.r2origem)}</small>
                              </div>
                            </div>
                            <span className='arrow'>⟶</span>
                            <div className='product'>
                              <div>
                                <b>{data.r2destino}</b> {formatTime(data.r2chegada)}<br />
                                <small>{formatCidadeAeroporto(data.r2destino)}</small>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className='col-2 divBtn'>
                          <Link to={"/aereo/tarifas/cadastrotarifa/"+data.id_fretamento}><button className='btnPeq'>Tarifas</button></Link>
                        </div>


                      </div>

                    ))}

                  </div>

                </div>
              </div>

            </div>
      </div>

      </>
    )
  }
  
  export default Saidas