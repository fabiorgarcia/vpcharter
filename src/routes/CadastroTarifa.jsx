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





function CadastroTarifa() {

  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
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

    if (newValor) {
      var query = "INSERT INTO `vpcharter_tarifas` (`id`, `rota`, `classe`, `tipo`, `categoria`, `valor`, `user`, `date` ) VALUES (NULL, '"+rota+"', '"+classe+"', '"+tipo+"', '"+changeCateg+"', '"+vl1+"', '"+Globals.userId+"', '"+formatDateTime+"');";
      console.log(query)
      
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
        <form onSubmit={(e)=> validaForm(e)} >

          <div className='row mt-5 mb-3'>
            <div className='col-12'>
              <IntlCurrencyInput currency="BRL" id='changeValor' config={currencyConfig} className="currency" value={changeValor} />
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

        
        <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/tarifas" relative="path">Tarifas</Link>&nbsp;/&nbsp;Cadastro de Tarifas</div>

          <div className="lineButtons">
            <div className="">
              <h1>Cadastro de Tarifa</h1>
            </div>
          </div>

          <div className='contentAll'>
            {dataBase.map((data, index) => (
              <div key={index} className='row tblRotas'>
                
                <div className='col-2'>
                  <label>Rota</label>
                  <div className='divDisablepq'><strong>{rota}</strong></div>
                </div>
                <div className='col-2'>
                  <label>Número do Voo</label>
                  <div className='divDisablepq'>{data.voo}</div>
                </div>
                <div className='col-2'>
                  <label>Companhia</label>
                  <div className='divDisablepq'><img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nome}</div>
                </div>
                <div className='col-2'>
                  <label>Aeronave</label>
                  <div className='divDisablepq'>{data.nomeAeronave}</div>
                </div>
                <div className='col-2'>
                  <label>Modelo</label>
                  <div className='divDisablepq'>{data.aeronave}</div>
                </div>
                <div className='col-2'>
                  <label>Duração</label>
                  <div className='divDisablepq'>{formatTime(data.duracao)}</div>
                </div>
                

                <div className='col-4'>
                  <label>Origem</label>
                  <div className='divDisablepq'>{selectAeroporto(data.origem)}</div>
                </div>
                <div className='col-2'>
                  <label>Horário de Saída</label>
                  <div className='divDisablepq'>{formatTime(data.saida)}</div>
                </div>
                
                <div className='col-4'>
                  <label>Destino</label>
                  <div className='divDisablepq'>{selectAeroporto(data.destino)}</div>
                </div>
                <div className='col-2'>
                  <label>Horário de Chegada</label>
                  <div className='divDisablepq'>{formatTime(data.chegada)}</div>
                </div>
                

              </div>
            ))}
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
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Custo Operacional', 'ADT', custo_primeiraClasse.length > 0 ?custo_primeiraClasse[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_primeiraClasse.length > 0 ?custo_primeiraClasse[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_primeiraClasse.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index} >
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList' >{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo CHD</label>
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Custo Operacional', 'CHD', custo_primeiraclasse_chd.length > 0 ?custo_primeiraclasse_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_primeiraclasse_chd.length > 0 ?custo_primeiraclasse_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_primeiraclasse_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo INF</label>
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Custo Operacional', 'INF', custo_primeiraclasse_inf.length > 0 ?custo_primeiraclasse_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_primeiraclasse_inf.length > 0 ?custo_primeiraclasse_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_primeiraclasse_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Premium</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo ADT</label>
                <h5 onClick={()=>alteraValor('Premium', 'Custo Operacional', 'ADT', custo_premium.length > 0 ?custo_premium[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_premium.length > 0 ?custo_premium[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_premium.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo CHD</label>
                <h5 onClick={()=>alteraValor('Premium', 'Custo Operacional', 'CHD', custo_premium_chd.length > 0 ?custo_premium_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_premium_chd.length > 0 ?custo_premium_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_premium_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo INF</label>
                <h5 onClick={()=>alteraValor('Premium', 'Custo Operacional', 'INF', custo_premium_inf.length > 0 ?custo_premium_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_premium_inf.length > 0 ?custo_premium_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_premium_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Executiva</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo ADT</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Custo Operacional', 'ADT', custo_executiva.length > 0 ?custo_executiva[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_executiva.length > 0 ?custo_executiva[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_executiva.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo CHD</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Custo Operacional', 'CHD', custo_executiva_chd.length > 0 ?custo_executiva_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_executiva_chd.length > 0 ?custo_executiva_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_executiva_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo INF</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Custo Operacional', 'INF', custo_executiva_inf.length > 0 ?custo_executiva_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_executiva_inf.length > 0 ?custo_executiva_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_executiva_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom  mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Econômica</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo ADT</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Custo Operacional', 'ADT', custo_economica.length > 0 ?custo_economica[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_economica.length > 0 ?custo_economica[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_economica.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo CHD</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Custo Operacional', 'CHD', custo_economica_chd.length > 0 ?custo_economica_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_economica_chd.length > 0 ?custo_economica_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_economica_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>Custo INF</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Custo Operacional', 'INF', custo_economica_inf.length > 0 ?custo_economica_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(custo_economica_inf.length > 0 ?custo_economica_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {custo_economica_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>





          <div className='contentAll mt-4'>

            <div className='row'>
              <h4><BiDollarCircle /> Valor de Venda</h4>
            </div>

            <div className='row border-bottom pb-2'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Primeira Classe</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Valor de Venda', 'ADT', primeiraClasse.length > 0 ?primeiraClasse[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(primeiraClasse.length > 0 ?primeiraClasse[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {primeiraClasse.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Valor de Venda', 'CHD', primeiraclasse_chd.length > 0 ?primeiraclasse_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(primeiraclasse_chd.length > 0 ?primeiraclasse_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {primeiraclasse_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <h5 onClick={()=>alteraValor('Primeira Classe', 'Valor de Venda', 'INF', primeiraclasse_inf.length > 0 ?primeiraclasse_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(primeiraclasse_inf.length > 0 ?primeiraclasse_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {primeiraclasse_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Premium</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <h5 onClick={()=>alteraValor('Premium', 'Valor de Venda', 'ADT', premium.length > 0 ?premium[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(premium.length > 0 ?premium[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {premium.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <h5 onClick={()=>alteraValor('Premium', 'Valor de Venda', 'CHD', premium_chd.length > 0 ?premium_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(premium_chd.length > 0 ?premium_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {premium_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <h5 onClick={()=>alteraValor('Premium', 'Valor de Venda', 'INF', premium_inf.length > 0 ?premium_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(premium_inf.length > 0 ?premium_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {premium_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom pb-2 mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Executiva</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Valor de Venda', 'ADT', executiva.length > 0 ?executiva[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(executiva.length > 0 ?executiva[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {executiva.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Valor de Venda', 'CHD', executiva_chd.length > 0 ?executiva_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(executiva_chd.length > 0 ?executiva_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {executiva_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <h5 onClick={()=>alteraValor('Executiva', 'Valor de Venda', 'INF', executiva_inf.length > 0 ?executiva_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(executiva_inf.length > 0 ?executiva_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {executiva_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row border-bottom mt-3'>
              <div className='col-3 classAlignMiddle'>
                <div className='classAlignMiddle'>Econômica</div>
              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>ADT</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Valor de Venda', 'ADT', economica.length > 0 ?economica[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(economica.length > 0 ?economica[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {economica.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='col-3 colTarifa'>
                <label className='mt-1'>CHD</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Valor de Venda', 'CHD', economica_chd.length > 0 ?economica_chd[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(economica_chd.length > 0 ?economica_chd[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {economica_chd.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-3 colTarifa'>
                <label className='mt-1'>INF</label>
                <h5 onClick={()=>alteraValor('Econômica', 'Valor de Venda', 'INF', economica_inf.length > 0 ?economica_inf[0].valor:0)} className='lkAddValor'>
                  {formatCurrency(economica_inf.length > 0 ?economica_inf[0].valor:0)} <div className='btnAddValor' title='Alterar Valor'>✎</div>
                </h5> 
                <div className='listTarifa'>
                  {economica_inf.map((data, index) => (
                    <div className='lineTarifa lineTarifaIten' key={index}>
                      <div data-title={'por: ' + data.firstName + ' ' + data.familyName}>
                        ⚬ <span className='dateList'>{formatDateTime(data.date)}</span><div className='graficTarifa' style={{minWidth: (data.valor/60)}}></div>{formatCurrency(data.valor)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>


      </div>
    </div>

    </>
  )
}
  
export default CadastroTarifa