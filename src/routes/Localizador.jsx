import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { GrClose } from "react-icons/gr";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { BsCheckLg } from "react-icons/bs";
import { BsFillPlusCircleFill, BsDashCircle } from "react-icons/bs";
import { RxSpaceBetweenVertically } from "react-icons/rx";
import { FiStar } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai"
import { PiMapPinBold, PiAirplaneTakeoffBold, PiMapPin, PiAirplaneTakeoff } from "react-icons/pi"
import ReactInputMask from 'react-input-mask';
import { MdOutlineAirplaneTicket, MdOutlineCalendarMonth, MdAccessTime, MdOutlineHome } from "react-icons/md"
import QRCode from 'react-qr-code';
import { IoAirplaneOutline } from "react-icons/io5";
import { HiOutlineArrowLongDown } from "react-icons/hi2";



function Localizador() {
  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const { id } = useParams();
  const [fabricante, setFabricante] = useState ('');
  const [categoria, setCategoria] = useState ('');
  const [aeronave, setAeronave] = useState (''); 
  const [aeronaveId, setAeronaveId] = useState (''); 
  const [rotaId, setRotaId] = useState (''); 
  const [freteId, setFreteId] = useState (''); 
  const [reservaId, setReservaId] = useState (''); 
  const [localizadorId, setLocalizadorId] = useState (''); 
  const [logo, setLogo] = useState (''); 
  const [companhia, seCompanhia] = useState (''); 
  const [openModal, setOpenModal] = useState (false);
  const [openModal2, setOpenModal2] = useState (false);
  const [openModal3, setOpenModal3] = useState (false);
  const [updateAssento, setUpdateAssento] = useState ('');
  const [updateIdAssento, setUpdateIdAssento] = useState ('');
  const [updateAssentoClasse, setUpdateAssentoClasse] = useState ('');
  const [updateTipoAssento, setUpdateTipoAssento] = useState ('');
  const [selectClass, setSelectClass] = useState ('primeiraclasse');
  const [totalFileiras, setTotalFileiras] = useState (''); 
  const [totalColunas, setTotalColunas] = useState (''); 
  const [primeiraclasseFileiras, setPrimeiraclasseFileiras] = useState ([]); 
  const [primeiraclasseColunas, setPrimeiraclasseColunas] = useState ([]);
  const [totalPrimeiraclasseFileiras, setTotalPrimeiraclasseFileiras] = useState (''); 
  const [totalPrimeiraclasseColunas, setTotalPrimeiraclasseColunas] = useState (''); 
  const [premiumFileiras, setPremiumFileiras] = useState ([]); 
  const [premiumColunas, setPremiumColunas] = useState ([]);
  const [totalPremiumFileiras, setTotalPremiumFileiras] = useState (''); 
  const [totalPremiumColunas, setTotalPremiumColunas] = useState (''); 
  const [executivaFileiras, setExecutivaFileiras] = useState ([]); 
  const [executivaColunas, setExecutivaColunas] = useState ([]);
  const [totalExecutivaFileiras, setTotalExecutivaFileiras] = useState (''); 
  const [totalExecutivaColunas, setTotalExecutivaColunas] = useState (''); 
  const [economicaFileiras, setEconomicaFileiras] = useState ([]); 
  const [economicaColunas, setEconomicaColunas] = useState ([]);
  const [totalEconomicaFileiras, setTotalEconomicaFileiras] = useState (''); 
  const [totalEconomicaColunas, setTotalEconomicaColunas] = useState (''); 
  const [ultimaFileira, setUltimaFileira] = useState (''); 
  const [minFileiras, setMinFileiras] = useState (['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.']); 
  const [mapaAssentos, setMapaAssentos] = useState ([]);
  const [servicoBordo, setServicoBordo] = useState (''); 
  const [caracteristicasAssentos, setCaracteristicasAssentos] = useState (''); 
  const [distancia, setDistancia] = useState (''); 
  const [largura, setLargura] = useState (''); 
  const [angulo, setAngulo] = useState (''); 
  const [dataBaseAeroportos, setDataBaseAeroportos] = useState ([]);
  const [dataAeronave, setDataAeronave] = useState ([]);
  const [nome, setNome] = useState (''); 
  const [sobrenome, setSobrenome] = useState (''); 
  const [cpf, setCpf] = useState (''); 
  const [nascimento, setNascimeto] = useState (''); 
  const [sexo, setSexo] = useState (''); 
  const [tipo, setTipo] = useState ('');
  const [responsavel, setResponsavel] = useState ('');
  const [telefone, setTelefone] = useState (''); 
  const [email, setEmail] = useState (''); 
  const [socialmedia, setSocialmedia] = useState (''); 
  const [listTel, setListTel] = useState ([]); 
  const [listTelNew, setListTelNew] = useState ([]);
  const [listEmail, setListEmail] = useState ([]); 
  const [listEmailNew, setListEmailNew] = useState ([]);
  const [listSocialMedia, setListSocialMedia] = useState ([]); 
  const [listSocialMediaNew, setListSocialMedialNew] = useState ([]); 
  const [localizador, setLocalizador] = useState ('');
  const [dataReserva, setDataReserva] = useState ([]); 
  const [dataLocalizador, setDataLocalizador] = useState ([]); 
  const [assento, setAssento] = useState ('');
  const [assentoLocalizaSelect, setAssentoLocalizaSelect] = useState ('assentoSelect');
  const [cadeiraSelect, setCadeiraSelect] = useState ('');
  const [classSelect, setClassSelect] = useState ('');
  const [voucher, setVoucher] = useState ('');
  const [voucherURL, setVoucherURL] = useState ('');
  const [nomePassageiro, setNomePassageiro] = useState ('');
  const [cpfPassageiro, setCpfPassageiro] = useState ('');
  const [corredoresPrimC, setCorredoresPrimC] = useState ([]); 
  const [corredoresPremium, setCorredoresPremium] = useState ([]); 
  const [corredoresExecutiva, setCorredoresExecutiva] = useState ([]); 
  const [corredoresEconomica, setCorredoresEconomica] = useState ([]);
  const [saidaEmergPrimC, setSaidaEmergPrimC] = useState ([]); 
  const [saidaEmergPremium, setSaidaEmergPremium] = useState ([]); 
  const [saidaEmergExecutiva, setSaidaEmergExecutiva] = useState ([]); 
  const [saidaEmergEconomica, setSaidaEmergEconomica] = useState ([]); 
  

  useEffect(() => {

    //var query = "SELECT vpcharter_reserva.id as id_reserva, vpcharter_reserva.assento, vpcharter_reserva.responsavel, vpcharter_reserva.cpf, vpcharter_reserva.localizador, vpcharter_reserva.classe, vpcharter_reserva.nome, vpcharter_reserva.sobrenome, vpcharter_reserva.tipo, vpcharter_fretamento.id as id_frete, vpcharter_fretamento.data_frete, vpcharter_fretamento.rota_ida, vpcharter_rotas.aeronave, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_fabricante.aeronave as fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome as companhia, vpcharter_companhia.logo, vpcharter_contratante.razaosocial FROM `vpcharter_reserva` INNER JOIN `vpcharter_fretamento` ON vpcharter_fretamento.id = vpcharter_reserva.frete INNER JOIN `vpcharter_rotas` ON vpcharter_rotas.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_contratante` ON vpcharter_contratante.id = vpcharter_fretamento.contratante WHERE vpcharter_reserva.localizador = '"+id+"' ";
    var query = "SELECT c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_ida, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_reserva.id as id_reserva, vpcharter_reserva.assento, vpcharter_reserva.responsavel, vpcharter_reserva.cpf, vpcharter_reserva.localizador, vpcharter_reserva.classe, vpcharter_reserva.nome, vpcharter_reserva.sobrenome, vpcharter_reserva.tipo, vpcharter_fretamento.id as id_frete, vpcharter_fretamento.data_frete, vpcharter_fretamento.rota_ida, vpcharter_rotas.aeronave, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_fabricante.aeronave as fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome as companhia, vpcharter_companhia.logo, vpcharter_contratante.razaosocial FROM `vpcharter_reserva` INNER JOIN `vpcharter_fretamento` ON vpcharter_fretamento.id = vpcharter_reserva.frete INNER JOIN `vpcharter_rotas` ON vpcharter_rotas.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia  INNER JOIN `vpcharter_contratante` ON vpcharter_contratante.id = vpcharter_fretamento.contratante  INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia WHERE vpcharter_reserva.localizador  = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {

        setDataLocalizador(response.data)
        setAssento(response.data[0]['assento']+response.data[0]['classe'])
        setCadeiraSelect(response.data[0]['assento'])
        setClassSelect(response.data[0]['classe'])
        setNomePassageiro(response.data[0]['nome']+response.data[0]['sobrenome'])
        setCpfPassageiro(response.data[0]['cpf'])
        if (response.data[0]['classe'] == 'primeiraClasse') { setAssentoLocalizaSelect('assentoSelectPC') }
        

        var query = "SELECT * FROM `vpcharter_reserva` WHERE `frete` = '"+response.data[0]['id_frete']+"' ORDER by `classe` DESC";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response3=> {
          if (response3.data.length > 0) {
            setDataReserva(response3.data)
          } 
        })
        .catch(error=> alert(error))


        carregaPagina(response.data[0]['aeronave'])
        setDataAeronave(response.data)
        setAeronaveId(response.data[0]['aeronave'])
        setFreteId(response.data[0]['id_frete'])
        setRotaId(response.data[0]['rota'])
      } 
    })
    .catch(error=> alert(error))

  }, [])


  function carregaPagina(x) {
    setLoading(true);
    setTotalFileiras([])
    setTotalColunas([])


    var query = "SELECT * FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id WHERE vpcharter_frota.id = '"+x+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setFabricante(response.data[0]['aeronave'])
        setAeronave(response.data[0]['nomeAeronave'])
        seCompanhia(response.data[0]['nome'])
        setLogo(response.data[0]['logo'])
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Registro não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'primeiraclasse' AND `fileira` >= '0' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPrimeiraclasseFileiras(response.data)
        setTotalPrimeiraclasseFileiras(response.data.length-1)
        setTotalFileiras(response.data.length)
      } else {
        setPrimeiraclasseFileiras([])
        setTotalPrimeiraclasseFileiras('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'primeiraclasse' AND `coluna` != '' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPrimeiraclasseColunas(response.data)
        setTotalPrimeiraclasseColunas(response.data.length)
        setTotalColunas(response.data.length)
      } else {
        setPrimeiraclasseColunas([])
        setTotalPrimeiraclasseColunas('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'premium' AND `fileira` >= '0' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPremiumFileiras(response.data)
        setTotalPremiumFileiras(response.data.length)
        setTotalFileiras(response.data.length)
      } else {
        setPremiumFileiras([])
        setTotalPremiumFileiras('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'premium' AND `coluna` != '' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setPremiumColunas(response.data)
        setTotalPremiumColunas(response.data.length)
        setTotalColunas(response.data.length)
      } else {
        setPremiumColunas([])
        setTotalPremiumColunas('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'executiva' AND `fileira` >= '0' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setExecutivaFileiras(response.data)
        setTotalExecutivaFileiras(response.data.length)
        setTotalFileiras(response.data.length)
      } else {
        setExecutivaFileiras([])
        setTotalExecutivaFileiras('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'executiva' AND `coluna` != '' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setExecutivaColunas(response.data)
        setTotalExecutivaColunas(response.data.length)
        setTotalColunas(response.data.length)
      } else {
        setExecutivaColunas([])
        setTotalExecutivaColunas('')
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'economica' AND `fileira` >= '0' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setEconomicaFileiras(response.data)
        setTotalEconomicaFileiras(response.data.length)
        setTotalFileiras(response.data.length)
      } else {
        setEconomicaFileiras([])
        setTotalEconomicaFileiras('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+x+"' AND `categoria` = 'economica' AND `coluna` != '' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setEconomicaColunas(response.data)
        setTotalEconomicaColunas(response.data.length)
        setTotalColunas(response.data.length)
      } else {
        setEconomicaColunas([])
        setTotalEconomicaColunas('')
      }
    })
    .catch(error=> alert(error))



    var query = "SELECT * FROM `vpcharter_mapaassentos` WHERE `aeronave` = '"+x+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setMapaAssentos(response.data)
      } else {
        setMapaAssentos([])
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


    var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+x+"' AND `classe` = '"+selectClass+"' LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setServicoBordo(response.data[0]['servico_bordo'])
        setCaracteristicasAssentos(response.data[0]['caracteristicas_assento'])
        setDistancia(response.data[0]['distancia'])
        setLargura(response.data[0]['largura'])
        setAngulo(response.data[0]['angulo'])
      } else {
        setServicoBordo('')
        setCaracteristicasAssentos('')
        setDistancia('')
        setLargura('')
        setAngulo('')
      }
      setLoading(false);
    })
    .catch(error=> alert(error))

    carregaCorredores(x) 
  }

  function carregaCorredores (x) {
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+x+"' AND `classe` = 'primeiraClasse' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresPrimC(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+x+"' AND `classe` = 'premium' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresPremium(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+x+"' AND `classe` = 'executiva' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresExecutiva(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+x+"' AND `classe` = 'economica' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresEconomica(response.data)
      } 
    })



    
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+x+"' AND `classe` = 'primeiraClasse' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergPrimC(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+x+"' AND `classe` = 'premium' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergPremium(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+x+"' AND `classe` = 'executiva' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergExecutiva(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+x+"' AND `classe` = 'economica' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergEconomica(response.data)
      } 
    })

  }

  function changeAssento(col, fil, classe) {

    setLoading(true)
    setUpdateTipoAssento('padrao')
    var assento = col+fil;
    var query = "SELECT * FROM `vpcharter_reserva` WHERE `frete` = '"+freteId+"' AND `assento` = '"+assento+"' AND `classe` = '"+classe+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setNome(response.data[0]['nome'])
        setSobrenome(response.data[0]['sobrenome'])
        setCpf(response.data[0]['cpf'])
        setNascimeto(response.data[0]['nascimento'])
        setSexo(response.data[0]['sexo'])
        setTipo(response.data[0]['tipo'])
        setResponsavel(response.data[0]['responsavel'])
        setListTel(response.data[0]['telefone'].split(","))
        setListEmail(response.data[0]['email'].split(","))
        setListSocialMedia(response.data[0]['socialmedia'].split(","))
        setReservaId(response.data[0]['id'])
        setLocalizadorId(response.data[0]['localizador'])
        setOpenModal3(true)
        
      } 
    })
    .catch(error=> alert(error))

    
    var query = "SELECT * FROM `vpcharter_mapaassentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+classe+"' AND `assento` = '"+assento+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setUpdateTipoAssento(response.data[0]['tipoAssento'])
        setUpdateIdAssento(response.data[0]['id'])
      } 
    })
    .catch(error=> alert(error))
    
    setUpdateAssento(assento)
    setUpdateAssentoClasse(classe)
    setLoading(false)
  }

  function formatAeroporto (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        return x+' - '+dataBaseAeroportos[i]['nome']+' - '+dataBaseAeroportos[i]['cidade']+' / '+dataBaseAeroportos[i]['uf'];
        break
      }
    }
  }

  function totalizadorFileiras() {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    if (totalPrimeiraclasseFileiras) { a = totalPrimeiraclasseFileiras;}
    if (totalPremiumFileiras) { b = totalPremiumFileiras;}
    if (totalExecutivaFileiras) { c = totalExecutivaFileiras;}
    if (totalEconomicaFileiras) { d = totalEconomicaFileiras;}
    var x = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    return x;
  }

  function totalizadorColunas() {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    if (totalPrimeiraclasseColunas) { a = totalPrimeiraclasseColunas;}
    if (totalPremiumColunas) { b = totalPremiumColunas;}
    if (totalExecutivaColunas) { c = totalExecutivaColunas;}
    if (totalEconomicaColunas) { d = totalEconomicaColunas;}
    var x = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    return x;
  }

  function contFileiraPremium (x) {
    var y = 0;
    if (totalPrimeiraclasseFileiras) {
      y = totalPrimeiraclasseFileiras;
    }
    return parseInt(x) + parseInt(y);
  }

  function contFileiraExecutiva (x) {
    var a = 0;
    var b = 0;
    if (totalPrimeiraclasseFileiras) { a = totalPrimeiraclasseFileiras; }
    if (totalPremiumFileiras) { b = totalPremiumFileiras - 1; }
    return parseInt(x) + parseInt(a) + parseInt(b);
  }

  function contFileiraEconomica (x) {
    var a = 0;
    var b = 0;
    var c = 0;
    if (totalPrimeiraclasseFileiras) { a = totalPrimeiraclasseFileiras; }
    if (totalPremiumFileiras) { b = totalPremiumFileiras - 1; }
    if (totalExecutivaFileiras) { c = totalExecutivaFileiras - 1; }
    return parseInt(x) + parseInt(a) + parseInt(b) + parseInt(c);
  }

  function limpaForm() {
    setNome('')
    setSobrenome('')
    setCpf('')
    setNascimeto('')
    setSexo('')
    setTipo('')
    setResponsavel('')
    setTelefone('')
    setEmail('')
    setSocialmedia('')
    setListTel([])
    setListEmail([])
    setListSocialMedia([])
    setLocalizador('')
    setReservaId('')
  }

  function changeNascimento (e) {
    var dt = nascimento;
		dt = dt.split('/').reverse().join('/');
		var dob = new Date(dt);
		var today = new Date();
		var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 12) { setTipo('INF') }
    else if (age > 12 && age < 18 ) { setTipo('CHD') }
    else { setTipo('ADULT') }
  }

  function closeLocalizador() {
    setOpenModal(false);
    setOpenModal3(false);
    limpaForm();
  }

  function formataClasse(x) {
    if (x == 'primeiraClasse') {
      return 'PC'
    }
    if (x == 'premium') {
      return 'PR'
    }
    if (x == 'executiva') {
      return 'EX'
    }
    if (x == 'economica') {
      return 'EC'
    }
  }

  function formatDate(x) {
    const dataCriada = new Date(x);
    const dataFormatada = dataCriada.toLocaleDateString('pt-BR', {timeZone: 'UTC',});
    return dataFormatada;
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

  function checkVoucher() {

    var query = "SELECT * FROM `vpcharter_reserva` WHERE `localizador` = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        
        if (response.data[0]['voucher']) {
          var voucher = response.data[0]['voucher'];
          setVoucher(voucher)
          setVoucherURL('http://52.15.49.249/voucher/'+voucher)
          setOpenModal(true)

        } else {
          
          var x = new Date();
          var mes = x.getMonth()+1; 
          mes = mes.toString();
          var dia = x.getDate().toString() 
          var semana = x.getDay().toString() 
          var ano = x.getYear().toString() 
          var horas = x.getHours().toString() 
          var minutos = x.getMinutes().toString() 
          var segundos = x.getSeconds().toString() 
          var voucher = dia+mes+ano+semana+segundos+minutos+horas;

          var data = new Date(),
          dia  = data.getDate().toString(),
          mes  = (data.getMonth()+1).toString(),
          ano = data.getFullYear(),
          hora = data.getHours(),
          minutos = data.getMinutes(),
          segundos = data.getSeconds();
          var checkinDate = ano+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;

          var query = "UPDATE `vpcharter_reserva` SET `checkin` = '"+checkinDate+"', `voucher` = '"+voucher+"' WHERE `vpcharter_reserva`.`localizador` = '"+id+"' ";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {
            }
          })
          .catch(error=> alert(error))

          setVoucher(voucher)
          setVoucherURL('http://52.15.49.249/voucher/'+voucher)
          setOpenModal(true)
        }

      }
    })
    .catch(error=> alert(error))
    
    
  }

  function checkAssento(col, fil, cla) {
    var lugar = col+fil+cla;
    var resp = 'no';
    for (var i = 0, len = dataReserva.length; i < len; ++i) {
      var assCod = dataReserva[i]['assento']+dataReserva[i]['classe'];
      if (lugar == assCod) {
        var resp = 'yes';
      }
    }
    return resp
  }

  function checkCorredor(x, y) {
    if (y == 'primeiraClasse') {
      for (var i = 0; i < corredoresPrimC.length; ++i) {
        if (corredoresPrimC[i]['coluna'] == x) { return true }
      }
      return false;
    }
    if (y == 'premium') {
      for (var i = 0; i < corredoresPremium.length; ++i) {
        if (corredoresPremium[i]['coluna'] == x) { return true }
      }
      return false;
    }
    if (y == 'executiva') {
      for (var i = 0; i < corredoresExecutiva.length; ++i) {
        if (corredoresExecutiva[i]['coluna'] == x) { return true }
      }
      return false;
    }
    if (y == 'economica') {
      for (var i = 0; i < corredoresEconomica.length; ++i) {
        if (corredoresEconomica[i]['coluna'] == x) { return true }
      }
      return false;
    }
  }

  function checkSaidaEmerg(x, y) {
    if (y == 'primeiraClasse') {
      for (var i = 0; i < saidaEmergPrimC.length; ++i) {
        if (saidaEmergPrimC[i]['fileira'] == x) { return true }
      }
      return false;
    }
    if (y == 'premium') {
      for (var i = 0; i < saidaEmergPremium.length; ++i) {
        if (saidaEmergPremium[i]['fileira'] == x) { return true }
      }
      return false;
    }
    if (y == 'executiva') {
      for (var i = 0; i < saidaEmergExecutiva.length; ++i) {
        if (saidaEmergExecutiva[i]['fileira'] == x) { return true }
      }
      return false;
    }
    if (y == 'economica') {
      for (var i = 0; i < saidaEmergEconomica.length; ++i) {
        if (saidaEmergEconomica[i]['fileira'] == x) { return true }
      }
      return false;
    }
  }

  function formatCidadeAeroporto (x) {
    for (var i = 0, len = dataBaseAeroportos.length; i < len; ++i) {
      if (dataBaseAeroportos[i]['iata'] == x) {
        return dataBaseAeroportos[i]['cidade']+'/'+dataBaseAeroportos[i]['uf'];
        break
      }
    }
  }




  return (
    <>
    {loading && <LoadingAnimation />}


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal'>
        <AiOutlineClose className='closeModal' onClick={()=>setOpenModal(false)} />

        <div className='infoModal'>
          
          <div className='row voucherModal'>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>
                  <div className='voucherIcon'></div>
                </div>
                <div className='col-12 titleVoucher'>
                  <label>Voucher</label>
                  <h1>{voucher}</h1>
                </div>
                <div className='col-12'>
                  <label>Nome</label>
                  <h3><b>{nomePassageiro}</b></h3>
                </div>
                <div className='col-12'>
                  <label>CPF</label>
                  <h4>{cpfPassageiro}</h4>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>
                  <QRCode
                    className='qrcode'
                    value={voucherURL}
                  />
                </div>
              </div>

            </div>

          </div>
        </div>


      </div>
    </div>


    <div className={openModal3 ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center'>
      <span className='closeModal' onClick={()=>closeLocalizador()} >✕</span>

      <div className='row interModal'>
        <div className='col-12'>
          <h2>Dados do Passageiro</h2>
          <h5>Assento <strong>{updateAssento}</strong> /&nbsp;
            {updateAssentoClasse == 'economica'?'Econômica':''}
            {updateAssentoClasse == 'executiva'?'Executiva':''}
            {updateAssentoClasse == 'premium'?'Premium':''}
            {updateAssentoClasse == 'primeiraClasse'?'Primeira Classe':''}
          </h5>
        </div>
      </div>

        <div className='row interModal'>
          <div className='col-4'>
            <label>Nome</label>
            <input type='text' value={nome} onChange={(e)=>setNome(e.target.value)} required disabled />
          </div>
          <div className='col-4'>
            <label>Sobrenome</label>
            <input type='text' value={sobrenome} onChange={(e)=>setSobrenome(e.target.value)} required disabled />
          </div>
          <div className='col-4'>
            <label>CPF</label>
            <ReactInputMask mask="999.999.999-99" id="f_cpf" className='defaultField' value={cpf} onChange={(e) => setCpf(e.target.value)} required  disabled />
          </div>
          <div className='col-4'>
            <label>Data Nascimento</label>
            <input type='date' value={nascimento} onChange={(e)=>setNascimeto(e.target.value)} onBlur={(e)=>changeNascimento(e.target.value)} required disabled  />
          </div>
          <div className='col-2'>
            <label>Sexo</label>
            <select value={sexo} onChange={(e)=>setSexo(e.target.value)} required disabled >
              <option value=""></option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className='col-2'>
            <label>Tipo</label>
            <select value={tipo} onChange={(e)=>setTipo(e.target.value)} required disabled >
              <option value=""></option>
              <option value="INF">Infantil</option>
              <option value="CHD">Criança</option>
              <option value="ADULT">Adulto</option>
            </select>
          </div>
          <div className='col-4'>
            <label>Responsável</label>
            <input type='text' id="f_responsavel" value={responsavel} onChange={(e)=>setResponsavel(e.target.value)} disabled />
          </div>
          <div className='col-4'>
            <label>Telefone</label>
            {listTel.map((base, index) => (
              <div key={index} className='listItem' >
                <span>{base}</span>
              </div>
            ))}
          </div>
          <div className='col-4'>
            <label>E-mail</label>
            {listEmail.map((base, index) => (
              <div key={index} className='listItem' >
                <span>{base}</span>
              </div>
            ))}
          </div>

          <div className='col-4'>
            <label>Rede Social</label>
            {listSocialMedia.map((base, index) => (
              <div key={index} className='listItem'>
                <span>{base}</span>
              </div>
            ))}
          </div>

        </div>
        <div className='row'>
          <div className='col-9'></div>
          <div className='col-12 mt-4'>
          
            <small className={reservaId ? '' : 'hide'}>Localizador</small>
            <button type='button' className={reservaId ? 'btnGde' : 'hide'} onClick={()=>closeLocalizador()} ><h2>{localizadorId}</h2></button>

          </div>
        </div>

      </div>
    </div>


    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        <div className={typeAlert ? "alert "+typeAlert : 'hide'} role="alert">
          <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
          {txtAlert}
        </div>
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/checkin" relative="path">Check In</Link>&nbsp;/&nbsp;Localizador</div>

          <div className="lineButtons row ">
            <div className="col">
              <h1>Localizador</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col-5 '>
                  <div className='pb-4'>
                      <div className='col-12'>
                        <label>Localizador</label>
                        <h1 className='pink-salmon'>{id}</h1>
                      </div>


                      <div className='pb-4'>
                      {dataAeronave.map((base, mp) => (
                        <div className=' titleReserva' key={mp}>

                          <div className='row'>
                            <label className='mb-3'><IoAirplaneOutline /> Ida</label>
                            <div className='row'>
                              <div className='col-4'>
                                <img className={base.r1logo ? 'imgCia mb-2' : 'hide'} src={base.r1logo} />{base.r1logo ? '' : base.r1cia}
                              </div>
                              <div className='col'>
                                <span className='small'>Voo: </span>{base.r1voo}
                              </div>
                              <div className='col-6'>
                              {formatDate(base.data_frete)}
                              </div>
                            </div>
 
                            <div className='col-6 interCol travel_blue'>
                              <div className='col-3'>
                              <PiAirplaneTakeoff className='icon_default' /><br /><small className='small'>Origem</small>
                              </div>
                              <div className='col'>
                                <div className='mb-1'> <span className='h6'><b>{base.r1origem}</b> {formatTime(base.r1saida)}</span></div>
                                <div className='h5 mb-0'>{formatCidadeAeroporto(base.r1origem)}</div>
                                <div className='small'>{formatAeroporto(base.r1origem)}</div>
                              </div>
                              <div className='seta'><HiOutlineArrowLongDown /></div>
                            </div>

                            <div className='col-6  interCol travel_blue'>
                              <div className='col-3'>
                              <PiMapPin className='icon_default' /><br /><small className='small'>Destino</small>
                              </div>
                              <div className='col'>
                                <div className='mb-1'><span className='h6'><b>{base.r1destino}</b> {formatTime(base.r1chegada)}</span></div>
                                <div className='h5 mb-0'>{formatCidadeAeroporto(base.r1destino)}</div>
                                <div className='small'>{formatAeroporto(base.r1destino)}</div>
                              </div>
                              
                            </div>
                          </div>

                          <div className='row mt-3'>
                            <label className='mb-3'><IoAirplaneOutline className='flip' /> Volta</label>
                            <div className='row'>
                              <div className='col-4'>
                                <img className={base.r2logo ? 'imgCia mb-2' : 'hide'} src={base.r2logo} />{base.r2logo ? '' : base.r2cia}
                              </div>
                              <div className='col'>
                                <span className='small'>Voo: </span>{base.r2voo}
                              </div>
                              <div className='col-6'>
                              {formatDate(base.date_volta)}
                              </div>
                            </div>
 
                            <div className='col-6 interCol travel_blue'>
                              <div className='col-3'>
                              <PiAirplaneTakeoff className='icon_default' /><br /><small className='small'>Origem</small>
                              </div>
                              <div className='col'>
                                <div className='mb-1'> <span className='h6'><b>{base.r2origem}</b> {formatTime(base.r2saida)}</span></div>
                                <div className='h5 mb-0'>{formatCidadeAeroporto(base.r2origem)}</div>
                                <div className='small'>{formatAeroporto(base.r2origem)}</div>
                              </div>
                              <div className='seta'><HiOutlineArrowLongDown /></div>
                            </div>

                            <div className='col-6 interCol travel_blue'>
                              <div className='col-3'>
                              <PiMapPin className='icon_default' /><br /><small className='small'>Destino</small>
                              </div>
                              <div className='col'>
                                <div className='mb-1'><span className='h6'><b>{base.r2destino}</b> {formatTime(base.r2chegada)}</span></div>
                                <div className='h5 mb-0'>{formatCidadeAeroporto(base.r2destino)}</div>
                                <div className='small'>{formatAeroporto(base.r2destino)}</div>
                              </div>
                              
                            </div>
                          </div>


                          <div className='row mt-3'>
                            <div className='col-12 '>
                              <label className='small'>Contratante</label>
                              <span>{base.razaosocial}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>


                      

                      {dataLocalizador.map((base, mp) => (
                        <div className='row dataCheckin' key={mp}>
                          <div className='col-12'>
                            <label>Passageiro</label>
                            <div className='checkin'><h3>{base.nome} {base.sobrenome}</h3></div>
                          </div>
                          <div className={base.responsavel?'col-12':'hide'}>
                            <label>Responsável</label>
                            <div className='checkin'><h5>{base.responsavel}</h5></div>
                          </div>
                          <div className='col-12'>
                            <label>CPF</label>
                            <div className='checkin'><h5>{base.cpf}</h5></div>
                          </div>
                          <div className='col-3'>
                            <label>Assento</label>
                            <div className='checkin'><h5>{base.assento}</h5></div>
                          </div>
                          <div className='col-6'>
                            <label>Classe</label>
                            <div className='checkin'><h5>{base.classe}</h5></div>
                          </div>
                          <div className='col-3'>
                            <label>Tipo</label>
                            <div className='checkin'><h5>{base.tipo}</h5></div>
                          </div>

                          <div className='col-12'>
                            <button type='button' onClick={()=>checkVoucher(base.id_reserva)} ><span className='h4 m-0' ><MdOutlineAirplaneTicket className='display-6' /> VOUCHER</span></button>
                          </div>
 
                        </div>
                      ))}
                  </div>

                  <div className='row  mt-3 pt-3 pb-3'>

                    <div className='col-12 '>
                      <h3>Passageiros</h3>
                      <table className="tblPassageiros tblDefault">
                        <thead>
                          <tr>
                            <td>Assento</td>
                            <td>Classe</td>
                            <td>Passageiro</td>
                            <td>Localizador</td>
                          </tr>
                        </thead>
                        <tbody>
                          {dataReserva.map((base, mp) => (
                            <tr key={mp} onClick={()=>changeAssento(base.assento.substring(0, 1), base.assento.substring(1), base.classe)}>
                              <td>{base.assento}</td>
                              <td>{formataClasse(base.classe)}</td>
                              <td>{base.nome} {base.sobrenome}</td>
                              <td>{base.localizador}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>


                <div className='col-7'>
                  <table className='mapaAssentos'>
                    <thead>
                      <tr>
                        <td></td>
                        <td colSpan={totalizadorColunas()}>
                          <div className='frenteAeronave'></div>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'>
                          <div className='saidaEmergencia'>
                            <div className='exit'>EXIT</div>
                            <div className='exit'>EXIT</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className="divideClass"></div></td>
                      </tr>
                      {primeiraclasseFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentos' disabled>{line.fileira}</button>  
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className='fileiraAssentos'>
                              {primeiraclasseColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div id={colun.coluna+line.fileira+'primeiraClasse'} className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'primeiraClasseCorredor' : cadeiraSelect == (colun.coluna+line.fileira) && classSelect=='primeiraClasse'?assentoLocalizaSelect:  checkAssento(colun.coluna, line.fileira, 'primeiraClasse') == 'yes' ? 'primeiraClasseOcupado' : 'primeiraClasse'} onClick={()=>changeAssento(colun.coluna, line.fileira, 'primeiraClasse')}>
                                      <span className={checkAssento(colun.coluna, line.fileira, 'primeiraClasse') == 'yes' ? '' : 'hide'}>{colun.coluna+line.fileira}</span>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                        {mapaAssentos.map((mpAssentos, mp) => (
                                          <span key={mp}>
                                            <FiStar className={mpAssentos.categoria == 'primeiraClasse' && mpAssentos.assento == colun.coluna+line.fileira  ? '' : 'hide'} title="Características" />
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                    <button className={line.fileira == "0" ? 'btnAssentosPC' : 'hide'} disabled>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'primeiraClasse')?'assentos':'hide'} ><div className='primeiraClasseCorredor'></div></div>

                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(line.fileira, 'primeiraClasse')? line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia' :'hide'}>
                              <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      <tr className={totalPrimeiraclasseFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className="divideClass"></div></td>
                      </tr>

                      {premiumFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>                              
                              <button className='btnAssentos' disabled>{contFileiraPremium(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className='fileiraAssentos'>
                              {premiumColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div  id={colun.coluna+contFileiraPremium(line.fileira)+'premium'}  className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'premiumCorredor' : cadeiraSelect==(colun.coluna+contFileiraPremium(line.fileira))&&classSelect=='premium'?assentoLocalizaSelect: checkAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium') == 'yes' ? 'assentoOcupado' : 'premium'} onClick={()=>changeAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium')}>
                                      <span className={checkAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium') == 'yes' ? '' : 'hide'}>{colun.coluna+contFileiraPremium(line.fileira)}</span>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                        {mapaAssentos.map((mpAssentos, mp) => (
                                          <span key={mp}>
                                            <FiStar className={mpAssentos.categoria == 'premium' && mpAssentos.assento == colun.coluna+contFileiraPremium(line.fileira)  ? '' : 'hide'} title="Assento preferencial na frente" />
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'}  disabled>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'premium')?'assentos':'hide'} ><div className='premiumCorredor'></div></div>

                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraPremium(line.fileira), 'premium')? line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia' :'hide'}>
                                <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      <tr className={totalPremiumFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className="divideClass"></div></td>
                      </tr>


                      {executivaFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentos' disabled>{contFileiraExecutiva(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className='fileiraAssentos'>
                              {executivaColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div id={colun.coluna+contFileiraExecutiva(line.fileira)+'executiva'}  className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'executivaCorredor' : cadeiraSelect==(colun.coluna+contFileiraExecutiva(line.fileira))&&classSelect=='executiva'?assentoLocalizaSelect: checkAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva') == 'yes' ? 'assentoOcupado' : 'executiva'} onClick={()=>changeAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva')}>
                                      <span className={checkAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva') == 'yes' ? '' : 'hide'}>{colun.coluna+contFileiraExecutiva(line.fileira)}</span>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                        {mapaAssentos.map((mpAssentos, mp) => (
                                          <span key={mp}>
                                            <FiStar className={mpAssentos.categoria == 'executiva' && mpAssentos.assento == colun.coluna+contFileiraExecutiva(line.fileira)  ? '' : 'hide'} title="Assento preferencial na frente" />
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'} disabled>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'executiva')?'assentos':'hide'} ><div className='executivaCorredor'></div></div>

                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraExecutiva(line.fileira), 'executiva')? line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia' :'hide'}>
                              <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      <tr className={totalExecutivaFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className="divideClass"></div></td>
                      </tr>

                      {economicaFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentos' disabled>{contFileiraEconomica(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className='fileiraAssentos'>
                              {economicaColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div id={colun.coluna+contFileiraEconomica(line.fileira)+'economica'}  className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'economicaCorredor' : cadeiraSelect==(colun.coluna+contFileiraEconomica(line.fileira))&&classSelect=='economica'?assentoLocalizaSelect: checkAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica') == 'yes' ? 'assentoOcupado' : 'economica'} onClick={()=>changeAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica')}>
                                      <span className={checkAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica') == 'yes' ? '' : 'hide'}>{colun.coluna+contFileiraEconomica(line.fileira)}</span>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                        {mapaAssentos.map((mpAssentos, mp) => (
                                          <span key={mp}>
                                            <FiStar className={mpAssentos.categoria == 'economica' && mpAssentos.assento == colun.coluna+contFileiraEconomica(line.fileira) ? '' : 'hide'} title="Assento preferencial na frente" />
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'} disabled>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'economica')?'assentos':'hide'} ><div className='economicaCorredor'></div></div>

                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraEconomica(line.fileira), 'economica')? line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia' :'hide'}>
                              <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {minFileiras.map((line, index) => (
                        <tr key={index} className={index > (minFileiras.length - totalizadorFileiras() ) ? 'hide':''}>
                          <td className='tdBordaDir'></td>
                          <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className="divideClass"></div></td>
                      </tr>
                      ))}

                      <tr>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'>
                          <div className='saidaEmergencia fundoEmergencia'>
                            <div className='exit'>EXIT</div>
                            <div className='exit'>EXIT</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={totalizadorColunas()}>
                          <div className='frundoAeronave'></div>
                        </td>
                      </tr>
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
  
export default Localizador