import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { BsCheckLg  } from "react-icons/bs";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import LoadingAnimation from "../components/LoadingAnimation";
import IntlCurrencyInput from "react-intl-currency-input"
import { MdOutlineHome, MdOutlineModeEdit } from "react-icons/md";
import { FaTools, FaPlus } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { VscEdit } from "react-icons/vsc";





function BaseRegrasTarifarias() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const { id } = useParams();
  const [alert, setAlert] = useState (false);
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [dataBase, setDataBase] = useState ([]); 
  const [dataRotas, setDataRotas] = useState ([]); 
  const [rota, setRota] = useState ('');
  const [idTarifa, setIdTarifa] = useState ('');
  const [aeroportoOrigem, setAeroportoOrigem] = useState ('');
  const [aeroportoDestino, setAeroportoDestino] = useState ('');
  const [aeroportoData, setAeroportoData] = useState ([]); 
  const [dataTotal, setDataTotal] = useState (0);
  const [startQuery, setStartQuery] = useState (0);
  const [limitQuery, setLimitQuery] = useState (25);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [stepsQuery, setStepsQuery] = useState (1);
  const [orderby, setOrderby] = useState ('name');
  const [orderDirection, setOrderDirection] = useState ('ASC');
  const [duracao, setDuracao] = useState ('');
  const [horarioSaida, setHorarioSaida] = useState ('');
  const [numeroVoo, setNumeroVoo] = useState ('');

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

  const [openModal, setOpenModal] = useState (false);
  const [loadingModal, setLoadingModal] = useState (false);
  const [changeClasse, setChangeClasse] = useState ('');
  const [changeTipo, setChangeTipo] = useState ('');
  const [changeCateg, setChangeCateg] = useState ('');
  const [changeValor, setChangeValor] = useState (0);
  const [alertValor, setAlertValor] = useState (false);

  const [nomeBase, setNomeBase] = useState ('');
  const [taxaEmbarque, setTaxaEmbarque] = useState (120);
  const [markup, setMarkup] = useState ('');

  const [pcCustoAdt, setPcCustoAdt] = useState ('');
  const [pcCustoChd, setPcCustoChd] = useState ('');
  const [pcCustoInf, setPcCustoInf] = useState ('');
  const [prCustoAdt, setPrCustoAdt] = useState ('');
  const [prCustoChd, setPrCustoChd] = useState ('');
  const [prCustoInf, setPrCustoInf] = useState ('');
  const [exCustoAdt, setExCustoAdt] = useState ('');
  const [exCustoChd, setExCustoChd] = useState ('');
  const [exCustoInf, setExCustoInf] = useState ('');
  const [ecCustoAdt, setEcCustoAdt] = useState ('');
  const [ecCustoChd, setEcCustoChd] = useState ('');
  const [ecCustoInf, setEcCustoInf] = useState ('');


  const [pcVendaAdt, setPcVendaAdt] = useState ('');
  const [pcVendaChd, setPcVendaChd] = useState ('');
  const [pcVendaInf, setPcVendaInf] = useState ('');
  const [prVendaAdt, setPrVendaAdt] = useState ('');
  const [prVendaChd, setPrVendaChd] = useState ('');
  const [prVendaInf, setPrVendaInf] = useState ('');
  const [exVendaAdt, setExVendaAdt] = useState ('');
  const [exVendaChd, setExVendaChd] = useState ('');
  const [exVendaInf, setExVendaInf] = useState ('');
  const [ecVendaAdt, setEcVendaAdt] = useState ('');
  const [ecVendaChd, setEcVendaChd] = useState ('');
  const [ecVendaInf, setEcVendaInf] = useState ('');



  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };
  
  

  useEffect(() => {
    carregaPagina()
    setRota(id)
  }, [])


  function carregaPagina() {
    setLoading(true);

    setAeroportoOrigem('')
    setAeroportoDestino('')
    setDuracao('')
    setHorarioSaida('')
    setNumeroVoo('')
    setRota('')

    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_rotas.origem, vpcharter_rotas.destino,  vpcharter_rotas.voo, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.chegada FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id INNER JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave  WHERE vpcharter_rotas.id = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Rota não encontrada!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))



    var query = "SELECT * FROM `vpcharter_tarifas` WHERE rota = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setIdTarifa(response.data[0]['id'])
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
        setLoading(false);
      } 
    })
    .catch(error=> alert(error))

    carregaTarifas();

    
  }

  function carregaTarifas () {
    
    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'CO' AND `categoria` = 'ADT'  ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_PrimeiraClasse(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'CO' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Primeiraclasse_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'CO' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Primeiraclasse_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'CO' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Premium(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'CO' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Premium_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'CO' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Premium_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'CO' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Executiva(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'CO' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Executiva_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'CO' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Executiva_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'CO' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Economica(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'CO' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Economica_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'CO' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCusto_Economica_inf(response.data)
      } 
    })
    .catch(error=> alert(error))






    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'VV' AND `categoria` = 'ADT'  ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPrimeiraClasse(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'VV' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPrimeiraClasse_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PC' AND `tipo` = 'VV' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPrimeiraClasse_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'VV' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPremium(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'VV' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPremium_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'PR' AND `tipo` = 'VV' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPremium_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'VV' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setExecutiva(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'VV' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setExecutiva_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EX' AND `tipo` = 'VV' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setExecutiva_inf(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'VV' AND `categoria` = 'ADT' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setEconomica(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'VV' AND `categoria` = 'CHD' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setEconomica_chd(response.data)
      } 
    })
    .catch(error=> alert(error))

    var query = "SELECT `vpcharter_tarifas`.`date`, `vpcharter_tarifas`.`valor`, `vpcharter_users`.`firstName`, `vpcharter_users`.`familyName`, `vpcharter_users`.`email` FROM `vpcharter_tarifas` LEFT JOIN `vpcharter_users` ON `vpcharter_users`.`id` = `vpcharter_tarifas`.`user` WHERE rota = '"+id+"' AND `classe` = 'EC' AND `tipo` = 'VV' AND `categoria` = 'INF' ORDER BY `date` DESC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setEconomica_inf(response.data)
      } 
    })
    .catch(error=> alert(error))


  }


  function validaForm(e) {
    setLoading(true);
    e.preventDefault();

    if (changeTipo=='Custo Operacional') { var tipo = 'CO'; } else { var tipo = 'VV'; }
    if (changeClasse=='Primeira Classe') { var classe = 'PC'; }
    if (changeClasse=='Premium') { var classe = 'PR'; }
    if (changeClasse=='Executiva') { var classe = 'EX'; }
    if (changeClasse=='Econômica') { var classe = 'EC'; }
    var vl1 = document.getElementById("changeValor").value.replace("R$", "").replace(".", "").replace(",", ".").replace(" ", ".").trim();
    if (Number(changeValor)=== Number(vl1)) { var newValor = false } else { var newValor = true }
    var hoje = new Date();
    var mes = Number(hoje.getMonth()) + Number(1)
    var formatDateTime = hoje.getFullYear() +'-'+ mes +'-'+ hoje.getDate() +' '+ hoje.getHours() +':'+ hoje.getMinutes() +':'+ hoje.getSeconds();

    //gravaTarifa()

    

    if (tipo == 'VV') {
      var query = "SELECT * FROM `vpcharter_tarifas` WHERE `rota` = '"+rota+"' AND `classe` = '"+classe+"' AND `tipo` = 'CO' AND `categoria` = '"+changeCateg+"' ORDER BY `date` DESC LIMIT 1 ";
      var fData = new FormData();
        fData.append('query', query);
        axios.post(Globals.endPoint+'query.php', fData)
        .then(response=> {
          
          if (response.data.length > 0) {
            
            if (vl1 >= response.data[0].valor) {

              gravaTarifa()

            } else {
              setLoading(false);

              var resp = confirm('Confirma Valor inferior ao Custo Operacional?');
              if (resp) {
                gravaTarifa()
              } 

            }

          }
        })
        .catch(error=> alert(error))
        
    } else {

      gravaTarifa()

    }
    

  }


  function gravaTarifa() {

    if (changeTipo=='Custo Operacional') { var tipo = 'CO'; } else { var tipo = 'VV'; }
    if (changeClasse=='Primeira Classe') { var classe = 'PC'; }
    if (changeClasse=='Premium') { var classe = 'PR'; }
    if (changeClasse=='Executiva') { var classe = 'EX'; }
    if (changeClasse=='Econômica') { var classe = 'EC'; }
    var vl1 = document.getElementById("changeValor").value.replace("R$", "").replace(".", "").replace(",", ".").replace(" ", ".").trim();
    if (Number(changeValor)=== Number(vl1)) { var newValor = false } else { var newValor = true }
    var hoje = new Date();
    var mes = Number(hoje.getMonth()) + Number(1)
    var formatDateTime = hoje.getFullYear() +'-'+ mes +'-'+ hoje.getDate() +' '+ hoje.getHours() +':'+ hoje.getMinutes() +':'+ hoje.getSeconds();

    if (newValor) {
      var query = "INSERT INTO `vpcharter_tarifas` (`id`, `rota`, `classe`, `tipo`, `categoria`, `valor`, `user`, `date` ) VALUES (NULL, '"+rota+"', '"+classe+"', '"+tipo+"', '"+changeCateg+"', '"+vl1+"', '"+Globals.userId+"', '"+formatDateTime+"');";        
      var fData = new FormData();
      fData.append('query', query);
      axios.post(Globals.endPoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setOpenModal(false)
          setAlert(true)
          setTypeAlert('alert-success')
          setTxtAlert('Cadastrado com sucesso!')
          setTimeout(()=> setAlert(false),5000);
          carregaTarifas();
          setLoading(false);
        } else {
          setOpenModal(false)
          setAlert(true)
          setTypeAlert('alert-danger')
          setTxtAlert('Erro na Gravação!')
          setTimeout(()=> setAlert(false),5000);
          setLoading(false);
        }
      })
      .catch(error=> alert(error))
      
    } else {
      setLoading(false);
      setOpenModal(false)
    }
  }

  function selectAeroporto (x) {
    for (var i = 0, len = aeroportoData.length; i < len; ++i) {
      if (aeroportoData[i]['iata'] == x) {
        return x+' - '+aeroportoData[i]['nome']+' - '+aeroportoData[i]['cidade'] + ' / '+ aeroportoData[i]['uf'];
        break;
      }
    }
  }

  function formatTime (x) {
    return x.substring(0, 5) + 'h';
  }

  function formatCurrency (e) {
    if (!e || e == '0.00') {
      var f = '━';
    } else {
      var f = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(e);
    }
    return f;
  }

  function alteraValor(classe, tipo, categ, valor) {
    setAlertValor(false)
    setOpenModal(true)
    setChangeClasse(classe)
    setChangeTipo(tipo)
    setChangeCateg(categ)
    setChangeValor(valor)
  }

  function formatDateTime(x) {
    if (x) {
      var data = new Date(x),
          dia  = data.getDate().toString(),
          mes  = (data.getMonth()+1).toString(),
          ano = data.getFullYear().toString().slice(-2),
          hora = data.getHours(),
          minutos = data.getMinutes(),
          segundos = data.getSeconds();

      const dataFormatada = dia+'/'+mes+'/'+ano+' '+hora+':'+("0000" + minutos).slice(-2)+'h';
      return dataFormatada;
    } else {
      return '-'
    }
  }

  

  

  return (
    <>
    {loading && <LoadingAnimation />}

    <div className={alert ? "alert "+typeAlert : 'hide'} role="alert">
      <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
      {txtAlert}
    </div>


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center'>
        <GrClose className='closeModal' onClick={()=>setOpenModal(false)} />
        <h5><b>Alterar {changeTipo}</b></h5> 
        <h5>{changeClasse} / {changeCateg}</h5>
        <form onSubmit={(e)=> validaForm(e)} className='formPeq'>

          <div className='row mt-5 mb-3'>

            <div className='col-12'>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={changeValor} onChange={(e)=>setChangeValor(e.target.value)} />
            </div>

            <div className={alertValor?'mt-3 mb-3':'hide'}>
              <p>Valor autorizado por:</p>
              <input type='tex' required={alertValor?true:false}></input>
            </div>
            <div className='col-12 mt-2'>
              <button type='submit' ><span><VscEdit /> Alterar</span></button>
            </div>
          </div>

        </form>
      </div>
    </div>



    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        
        <div className='breadCrumb'><Link to="/admin" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> Admin</Link>&nbsp;/&nbsp;Base Regras Tarifárias</div>

        <div className="lineButtons">
          <div className="">
            <h1>Base Regras Tarifárias</h1>
          </div>
        </div>

        <div className='contentAll'>
          <div className='row '>
            <div className='col-7'>
              <label className='mt-1'>Nome</label>
              <input type='text' placeholder='Nome da Base Regras Tarifárias' value={nomeBase} onChange={(e)=>setNomeBase(e.target.value)}></input>
             </div>

            <div className='col-3 '>
              <label className='mt-1'>Taxa de Embarque</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={taxaEmbarque} onChange={(e)=>setTaxaEmbarque(e.target.value)} />
             </div>
             <div className='col-2'>
              <label className='mt-1'>Markup %</label>
              <input type='number' placeholder='%' value={markup} onChange={(e)=>setMarkup(e.target.value)}></input>
             </div>
          </div>
        </div>


        <div className='contentAll mt-4'>

          <div className='col-12'>
            <h4><FaTools className='icoTools' /> Custo Operacional</h4>
          </div>

          <div className='row border-bottom pb-2'>
            <div className='col-3 classAlignMiddle'>
              <div className='classAlignMiddle'>Primeira Classe</div>
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo ADT</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcCustoAdt} onChange={(e)=>setPcCustoAdt(e.target.value)} />
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo CHD</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcCustoChd} onChange={(e)=>setPcCustoChd(e.target.value)} />
            </div>

            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo INF</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcCustoInf} onChange={(e)=>setPcCustoInf(e.target.value)} />
            </div>
          </div>

          <div className='row border-bottom pb-2 mt-3'>
            <div className='col-3 classAlignMiddle'>
              <div className='classAlignMiddle'>Premium</div>
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo ADT</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prCustoAdt} onChange={(e)=>setPrCustoAdt(e.target.value)} />
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo CHD</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prCustoChd} onChange={(e)=>setPrCustoChd(e.target.value)} />
            </div>

            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo INF</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prCustoInf} onChange={(e)=>setPrCustoInf(e.target.value)} />
            </div>
          </div>

          <div className='row border-bottom pb-2 mt-3'>
            <div className='col-3 classAlignMiddle'>
              <div className='classAlignMiddle'>Executiva</div>
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo ADT</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exCustoAdt} onChange={(e)=>setExCustoAdt(e.target.value)} />
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo CHD</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exCustoChd} onChange={(e)=>setExCustoChd(e.target.value)} />
            </div>

            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo INF</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exCustoInf} onChange={(e)=>setExCustoInf(e.target.value)} />
            </div>
          </div>

          <div className='row border-bottom  mt-3'>
            <div className='col-3 classAlignMiddle'>
              <div className='classAlignMiddle'>Econômica</div>
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo ADT</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecCustoAdt} onChange={(e)=>setEcCustoAdt(e.target.value)} />
            </div>
            <div className='col-3 colTarifa'>
              <label className='mt-1'>Custo CHD</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecCustoChd} onChange={(e)=>setEcCustoChd(e.target.value)} />
            </div>

            <div className='col-3 colTarifa pb-3'>
              <label className='mt-1'>Custo INF</label>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecCustoInf} onChange={(e)=>setEcCustoInf(e.target.value)} />
            </div>
          </div>

        </div>


        <div className='contentAll mt-4'>

          <form onSubmit={(e)=> validaForm(e)}>

            <div className='row'>
              <h4><BiDollarCircle /> Valor de Venda</h4>
            </div>

            <div className='row border-bottom pb-2'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Primeira Classe</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcVendaAdt} onChange={(e)=>setPcVendaAdt(e.target.value)} />
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcVendaChd} onChange={(e)=>setPcVendaChd(e.target.value)} />
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={pcVendaInf} onChange={(e)=>setPcVendaInf(e.target.value)} />
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Premium</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prVendaAdt} onChange={(e)=>setPrVendaAdt(e.target.value)} />
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prVendaChd} onChange={(e)=>setPrVendaChd(e.target.value)} />
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={prVendaInf} onChange={(e)=>setPrVendaInf(e.target.value)} />
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Executiva</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exVendaAdt} onChange={(e)=>setExVendaAdt(e.target.value)} />
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exVendaChd} onChange={(e)=>setExVendaChd(e.target.value)} />
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={exVendaInf} onChange={(e)=>setExVendaInf(e.target.value)} />
              </div>
            </div>

            <div className='row border-bottom mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Econômica</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecVendaAdt} onChange={(e)=>setEcVendaAdt(e.target.value)} />
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecVendaChd} onChange={(e)=>setEcVendaChd(e.target.value)} />
              </div>

              <div className='col-3 colTarifa pb-3'>
                <label className='mt-1'>INF</label>
                <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={ecVendaInf} onChange={(e)=>setEcVendaInf(e.target.value)} />
              </div>
            </div>

            <div className='row'>
              <div className='col'></div>
              <div className='col-3'>
                <button type='submit'>
                  <span>Salvar</span>
                </button>
              </div>
            </div>

          </form>

        </div>


      </div>
    </div>

    </>
  )
}
  
export default BaseRegrasTarifarias