import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { GrClose } from "react-icons/gr";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiCallBellLight } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { BsCheckLg } from "react-icons/bs";
import { BsFillPlusCircleFill, BsDashCircle } from "react-icons/bs";
import { LuArrowDownUp} from "react-icons/lu";
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import { RxSpaceBetweenVertically } from "react-icons/rx";
import { FiStar } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai"
import { PiMapPin, PiAirplaneTakeoff, PiMapPinLine } from "react-icons/pi"
import ReactInputMask from 'react-input-mask';
import { MdOutlineHome } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";



function ValidacaoAssentos() {
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
  const [upadeCorredor, setUpdateCorredor] = useState ('');
  const [updateTipoCorredor, setUpdateTipoCorredor] = useState ('');
  const [updateIdCorredor, setUpdateIdCorredor] = useState ('');
  const [upadeFileira, setUpdateFileira] = useState ('');
  const [updateTipoFileira, setUpdateTipoFileira] = useState ('');
  const [updateIdFileira, setUpdateIdFileira] = useState ('');
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
  const [obs, setObs] = useState (''); 
  const [dataReserva, setDataReserva] = useState ([]); 
  const [corredoresPrimC, setCorredoresPrimC] = useState ([]); 
  const [corredoresPremium, setCorredoresPremium] = useState ([]); 
  const [corredoresExecutiva, setCorredoresExecutiva] = useState ([]); 
  const [corredoresEconomica, setCorredoresEconomica] = useState ([]); 
  const [saidaEmergPrimC, setSaidaEmergPrimC] = useState ([]); 
  const [saidaEmergPremium, setSaidaEmergPremium] = useState ([]); 
  const [saidaEmergExecutiva, setSaidaEmergExecutiva] = useState ([]); 
  const [saidaEmergEconomica, setSaidaEmergEconomica] = useState ([]); 
  const [toggle, setToggle] = useState (false);
  

  useEffect(() => {

    loadPage()
  

  }, [])


  function loadPage() {
    setLoading(true);
    var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_fretamento.multa, vpcharter_fretamento.data_frete, vpcharter_fretamento.cancelamento, vpcharter_fretamento.custo, vpcharter_rotas.id as id_rota, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_contratante.razaosocial, vpcharter_frota.nomeAeronave, vpcharter_fabricante.aeronave, vpcharter_companhia.nome, vpcharter_companhia.logo FROM `vpcharter_fretamento` INNER JOIN `vpcharter_rotas` ON vpcharter_fretamento.rota_ida = vpcharter_rotas.id INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_frota` ON vpcharter_rotas.aeronave = vpcharter_frota.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.fabricante = vpcharter_fabricante.id INNER JOIN `vpcharter_companhia` ON vpcharter_frota.companhia = vpcharter_companhia.id WHERE vpcharter_fretamento.id = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {

        var query = "SELECT * FROM `vpcharter_reserva` WHERE `frete` = '"+id+"' ORDER by `classe` DESC";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response3=> {
          if (response3.data.length > 0) {
            setDataReserva(response3.data)
          } 
        })
        .catch(error=> alert(error))
        carregaPagina(response.data[0]['id_aeronave'])
        setAeronaveId(response.data[0]['id_aeronave'])
        setFreteId(response.data[0]['id_fretamento'])
        setRotaId(response.data[0]['id_rota'])
      } 
    })
    .catch(error=> alert(error))


    var query = "SELECT vpcharter_fretamento.data_frete, vpcharter_fretamento.obs, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_ida, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_contratante.razaosocial FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia WHERE vpcharter_fretamento.id = '"+id+"' LIMIT 1 ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataAeronave(response.data)
        setLoading(false);
      } 
    })
    .catch(error=> alert(error))
  }




  function carregaPagina(x) {
    //setLoading(true);
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
      //setLoading(false);
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

  function changeCategoria (e) {
    setCategoria(e)
  }
  function changeCorredor(e, t, i) {
    setOpenModal(true)
    setUpdateCorredor(e)
    setUpdateTipoCorredor(t)
    setUpdateIdCorredor(i)
  }
  function changeFileira(e, t, i) {
    setOpenModal2(true)
    setUpdateFileira(e)
    setUpdateTipoFileira(t)
    setUpdateIdFileira(i)
  }

  function changeAssento(col, fil, classe) {

    setLoading(true)
    setUpdateTipoAssento('padrao')
    setToggle(false)
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
    setOpenModal3(true)
    setUpdateAssento(assento)
    setUpdateAssentoClasse(classe)
    setLoading(false)
  }

  function updateNewTipoAssento () {
    setOpenModal3(false)
    setLoading(true)
    setTimeout(function() { 
      if (updateTipoAssento=='padrao') {

        if (updateIdAssento) {
          var query = "DELETE FROM `vpcharter_mapaassentos` WHERE `vpcharter_mapaassentos`.`id` = '"+updateIdAssento+"'";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {
              setUpdateIdAssento('')
              carregaPagina()
            } 
          })
          .catch(error=> alert(error))
        }

      } else {

        if (updateIdAssento) {
          var query = "UPDATE `vpcharter_mapaassentos` SET `tipoAssento` = '"+updateTipoAssento+"' WHERE `vpcharter_mapaassentos`.`id` = '"+updateIdAssento+"' ";
        } else {
          var query = "INSERT INTO `vpcharter_mapaassentos` (`id`, `aeronave`, `categoria`, `assento`, `tipoAssento`) VALUES (NULL, '"+id+"', '"+updateAssentoClasse+"', '"+updateAssento+"', '"+updateTipoAssento+"') ";
        }

        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setUpdateIdAssento('')
            carregaPagina()
          } else {
            setTypeAlert('alert-danger')
            settitleAlert('Erro na Gravação!')
            setTimeout(()=> setTypeAlert(''),5000);
          }
        })
        .catch(error=> alert(error))

      }
    }, 1000)
  }

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
        return dataBaseAeroportos[i]['nome']
        break
      }
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

  function updateColun(e, x) {
    setOpenModal(false)
    setLoading(true)
    setTimeout(function() {   
      
      if (x == 'assento') {
        var query = "UPDATE `vpcharter_categoria_assentos` SET `tipo` = NULL WHERE `vpcharter_categoria_assentos`.`id` = '"+e+"' ";
      } else {
        var query = "UPDATE `vpcharter_categoria_assentos` SET `tipo` = '"+x+"' WHERE `vpcharter_categoria_assentos`.`id` = '"+e+"' ";
      }
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          carregaPagina()
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Erro na Gravação!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
      setLoading(false)
    }, 1000)

  }

  function updateLine(e, x) {
    setOpenModal2(false)
    setLoading(true)
    setTimeout(function() {  
      if (x == 'fileira') {
        var query = "UPDATE `vpcharter_categoria_assentos` SET `tipo` = NULL WHERE `vpcharter_categoria_assentos`.`id` = '"+e+"' ";
      } else {
        var query = "UPDATE `vpcharter_categoria_assentos` SET `tipo` = '"+x+"' WHERE `vpcharter_categoria_assentos`.`id` = '"+e+"' ";
      }
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          carregaPagina()
        } else {
          setTypeAlert('alert-danger')
          settitleAlert('Erro na Gravação!')
          setTimeout(()=> setTypeAlert(''),5000);
        }
      })
      .catch(error=> alert(error))
      setLoading(false)
    }, 1000)

  }

  function delColuna () {
    setLoading(true)
    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+selectClass+"' AND `coluna` != '' ORDER BY `id` DESC LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        var idDel = response.data[0]['id'];
        var query = "DELETE FROM `vpcharter_categoria_assentos` WHERE `vpcharter_categoria_assentos`.`id` = '"+idDel+"' ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            carregaPagina()
            setTimeout(()=> setLoading(false),5000);
          } 
        })
        .catch(error=> alert(error))
      } 
    })
    .catch(error=> alert(error))
  }

  function insertColuna () {
    setLoading(true)
    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+selectClass+"' AND `coluna` != '' ORDER BY `id` DESC LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        var lastCol= response.data[0]['coluna'];
        var nextCol = String.fromCharCode(lastCol.charCodeAt(0) + 1);
      } else {
        var nextCol = "A";
      }
      
      var query = "INSERT INTO `vpcharter_categoria_assentos` (`id`, `aeronave`, `categoria`, `coluna`, `fileira`, `tipo`) VALUES (NULL, '"+id+"',  '"+selectClass+"', '"+nextCol+"', NULL, NULL);";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          carregaPagina()
          setTimeout(()=> setLoading(false),5000);
        } 
      })
      .catch(error=> alert(error))
      
    })
    .catch(error=> alert(error))
  }

  function delFileira () {
    setLoading(true)
    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+selectClass+"' AND `fileira` >= '0' ORDER BY `id` DESC LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        var idDel = response.data[0]['id'];
        var query = "DELETE FROM `vpcharter_categoria_assentos` WHERE `vpcharter_categoria_assentos`.`id` = '"+idDel+"' ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            carregaPagina()
            setTimeout(()=> setLoading(false),5000);
          } 
        })
        .catch(error=> alert(error))
      } 
    })
    .catch(error=> alert(error))
  }

  function insertFileira () {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+selectClass+"' AND `fileira` >= '' ORDER BY `id` DESC LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        var idAdd = parseInt(response.data[0]['fileira'])+1;
      } else {
        var idAdd = 0;
      }

      var query = "INSERT INTO `vpcharter_categoria_assentos` (`id`, `aeronave`, `categoria`, `coluna`, `fileira`, `tipo`) VALUES (NULL, '"+id+"',  '"+selectClass+"', NULL, '"+idAdd+"', NULL);";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          carregaPagina()
          setTimeout(()=> setLoading(false),5000);
        } 
      })
      .catch(error=> alert(error))

    })
    .catch(error=> alert(error))
  }


  function changeSelectClass(e) {
    setSelectClass(e)
    if (e == 'primeiraclasse') {
      setTotalColunas(totalPrimeiraclasseColunas)
      setTotalFileiras(totalPrimeiraclasseFileiras)
    }
    if (e == 'premium') {
      setTotalColunas(totalPremiumColunas)
      setTotalFileiras(totalPremiumFileiras)
    }
    if (e == 'executiva') {
      setTotalColunas(totalExecutivaColunas)
      setTotalFileiras(totalExecutivaFileiras)
      carregaPagina()
    }
    if (e == 'economica') {
      setTotalColunas(totalEconomicaColunas)
      setTotalFileiras(totalEconomicaFileiras)
    }

    var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+id+"' AND `classe` = '"+e+"' LIMIT 1";
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
    })
    .catch(error=> alert(error))

  }

  function contadorLinha(x) {
    setContaLinha(x)
    return x;
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

  function updateCaracteristicas() {
    
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+id+"' AND `classe` = '"+selectClass+"' AND `servico_bordo` != '' LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {

      if (response.data.length > 0) {
        var idUpdate = response.data[0]['id'];
        var query = "UPDATE `vpcharter_caracteristicas_aeronave` SET `servico_bordo` = '"+servicoBordo+"', `caracteristicas_assento` = '"+caracteristicasAssentos+"', `distancia` = '"+distancia+"', `largura` = '"+largura+"', `angulo` = '"+angulo+"' WHERE `vpcharter_caracteristicas_aeronave`.`id` = '"+idUpdate+"'; ";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setLoading(false)
            carregaPagina()
          } 
        })
        .catch(error=> alert(error))
      } else {
        var query = "INSERT INTO `vpcharter_caracteristicas_aeronave` (`id`, `aeronave`, `servico_bordo`, `classe`, `caracteristicas_assento`, `distancia`, `largura`, `angulo`) VALUES (NULL, '"+id+"', '"+servicoBordo+"', '"+selectClass+"', '"+caracteristicasAssentos+"', '"+distancia+"', '"+largura+"', '"+angulo+"');";

        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setLoading(false)
            carregaPagina()
          } 
        })
        .catch(error=> alert(error))
      }

    })
    .catch(error=> alert(error))
    

  }

  function gerarRota() {
    navigate('/rotas/'+id);
  }
  
  function addTel() {
    if (telefone) {
      let semFormatacao = telefone.replaceAll('_', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
      if (semFormatacao.length < 10) {
        setTypeAlert('alert-danger')
        settitleAlert('')
        setTxtAlert('Telefone Inválido!')
        setTimeout(()=> setTypeAlert(''),5000);
      } else {
        let limpo = telefone.replaceAll('_', '');
        listTel.push(limpo)
        setTelefone('');
      }
    }
  }
  function removeTel(x) {
    setListTelNew([])
    delete listTel[x];
  }

  function validateEmail(x) {
    var re = /\S+@\S+\.\S+/;
    return re.test(x);
  }

  function validaCpf(x){
    x = x.replace(/\D/g, '');
    if(x.toString().length != 11 || /^(\d)\1{10}$/.test(x)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        x.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != x.substring(j, j+1)) result = false;
    });
    return result;
}

  function addEmail() {
    if (email) {
      if (!validateEmail(email)) {
        setTypeAlert('alert-danger')
        settitleAlert('')
        setTxtAlert('E-mail Inválido!')
        setTimeout(()=> setTypeAlert(''),5000);
      } else {
        let limpo = email.replaceAll('_', '');
        listEmail.push(limpo)
        setEmail('');
      }

    }
  }
  function removeEmail(x) {
    setListEmailNew([])
    delete listEmail[x];
  }
  function addSocialMedia() {
    if (socialmedia) {
      listSocialMedia.push(socialmedia)
      setSocialmedia('');
    }
  }
  function removeSocialMedia(x) {
    setListSocialMedialNew([])
    delete listSocialMedia[x];
  }

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();


    if (!reservaId) {

      var err = false;
      if (!validaCpf(cpf)) {
        setTypeAlert('alert-danger')
        settitleAlert('')
        setTxtAlert('CPF Inválido!')
        setTimeout(()=> setTypeAlert(''),5000);
        err = true;
      } 
      if (tipo != 'ADT' && responsavel == '') {
        document.getElementById('f_responsavel').focus();
        setTypeAlert('alert-danger')
        settitleAlert('')
        setTxtAlert('Por favor digite o Responsável!')
        setTimeout(()=> setTypeAlert(''),5000);
        err = true;
      } 
      if (!listTel[0]) {
        var semFormatacao = telefone.replaceAll('_', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
        if (semFormatacao.length < 10) {
          document.getElementById('f_telefone').focus();
          setTypeAlert('alert-danger')
          settitleAlert('')
          setTxtAlert('Telefone Inválido!')
          setTimeout(()=> setTypeAlert(''),5000);
          err = true;
        } 
      } 

      if(!listEmail[0]) {
        setListEmail([])
        if (!validateEmail(email)) {
          document.getElementById('f_email').focus();
          setTypeAlert('alert-danger')
          settitleAlert('')
          setTxtAlert('E-mail Inválido!')
          setTimeout(()=> setTypeAlert(''),5000);
          err = true;
        }
      }

      if (!err) {

        if (listTel[0]) {         var final_tel = listTel.toString(); } else { var final_tel = telefone; }
        if (listEmail[0]) {       var final_email = listEmail.toString(); } else { var final_email = email; }
        if (listSocialMedia[0]) { var final_socilamedia = listSocialMedia.toString(); } else { var final_socilamedia = socialmedia; }

        var hoje = new Date();
        var mes = Number(hoje.getMonth()) + Number(1)
        var formatDateTime = hoje.getFullYear() +'-'+ mes +'-'+ hoje.getDate() +' '+ hoje.getHours() +':'+ hoje.getMinutes() +':'+ hoje.getSeconds();

        if (updateAssentoClasse == 'primeiraClasse') { var codClass = 'PC'; }
        if (updateAssentoClasse == 'premium') { var codClass = 'PR'; }
        if (updateAssentoClasse == 'executiva') { var codClass = 'EX'; }
        if (updateAssentoClasse == 'economica') { var codClass = 'EC'; }

        var codLocalizador = aeronaveId + rotaId + freteId + updateAssento + codClass;
        setLocalizador(codLocalizador)

        var query = "INSERT INTO `vpcharter_reserva` (`id`, `frete`, `assento`, `localizador`, `classe`, `nome`, `sobrenome`, `cpf`, `nascimento`, `sexo`, `tipo`, `responsavel`, `telefone`, `email`, `socialmedia`, `date`) VALUES (NULL, '"+freteId+"', '"+updateAssento+"', '"+codLocalizador+"', '"+updateAssentoClasse+"', '"+nome+"', '"+sobrenome+"', '"+cpf+"', '"+nascimento+"', '"+sexo+"', '"+tipo+"', '"+responsavel+"', '"+final_tel+"', '"+final_email+"', '"+final_socilamedia+"', '"+formatDateTime+"');";
        
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {

            var query = "SELECT * FROM `vpcharter_reserva` WHERE date = '"+formatDateTime+"' ";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) {  
                var codLocalizador = response.data[0]['localizador'] + response.data[0]['id'];
                var idReseva = response.data[0]['id'];
                setLocalizador(codLocalizador)

                var query = "UPDATE `vpcharter_reserva` SET `localizador` = '"+codLocalizador+"' WHERE `vpcharter_reserva`.`id` = '"+response.data[0]['id']+"' ";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response=> {
                  if (response.data.length > 0) {  
                    setOpenModal3(false)
                    setOpenModal(true)
                    setLoading(false)
                  }
                })
                .catch(error=> alert(error))
              }
            })
            .catch(error=> alert(error))
          }
        })
        .catch(error=> alert(error))
      }


    } else {
      setLoading(false)
      closeLocalizador();
    }
    
  }


  function validaFormModal(e) {
    setLoading(true)
    e.preventDefault();
    
    var query = "UPDATE `vpcharter_fretamento` SET `obs` = '"+obs+"' WHERE `vpcharter_fretamento`.`id` = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {  
        setOpenModal2(false)
        loadPage()
      }
    })
    .catch(error=> alert(error))
    
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

    if (age < 2) { setTipo('INF') }
    else if (age > 2 && age < 12 ) { setTipo('CHD') }
    else { setTipo('ADT') }
  }

  function closeLocalizador() {
    setOpenModal(false);
    setOpenModal3(false);
    limpaForm();
    
    var query = "SELECT vpcharter_fretamento.id as id_fretamento, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_fretamento.multa, vpcharter_fretamento.data_frete, vpcharter_fretamento.cancelamento, vpcharter_fretamento.custo, vpcharter_rotas.id as id_rota, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_rotas.voo, vpcharter_contratante.razaosocial, vpcharter_frota.nomeAeronave, vpcharter_fabricante.aeronave, vpcharter_companhia.nome, vpcharter_companhia.logo FROM `vpcharter_fretamento` INNER JOIN `vpcharter_rotas` ON vpcharter_fretamento.rota_ida = vpcharter_rotas.id INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_frota` ON vpcharter_rotas.aeronave = vpcharter_frota.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.fabricante = vpcharter_fabricante.id INNER JOIN `vpcharter_companhia` ON vpcharter_frota.companhia = vpcharter_companhia.id WHERE vpcharter_fretamento.id = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {

        var query = "SELECT * FROM `vpcharter_reserva` WHERE `frete` = '"+response.data[0]['id_fretamento']+"' ORDER by `classe` DESC";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response3=> {
          if (response3.data.length > 0) {
            setDataReserva(response3.data)
          } 
        })
        .catch(error=> alert(error))


        carregaPagina(response.data[0]['id_aeronave'])
        //setDataAeronave(response.data)
        setAeronaveId(response.data[0]['id_aeronave'])
        setFreteId(response.data[0]['id_fretamento'])
        setRotaId(response.data[0]['id_rota'])
      } 
    })
    .catch(error=> alert(error))
    
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

  function formatDate(x) {
    const d = new Date(x);
    const dataFormatada = d.toLocaleDateString('pt-BR', {timeZone: 'UTC',});
    return dataFormatada;
  }
  function formatTime (x) {
    if (x) {
      return x.substring(0, 5) + 'h';
    }
    
  }

  function changeObs (x) {
    if(!x) { x = ''; }
    setObs(x)
    setOpenModal2(true)
  }




  return (
    <>
    {loading && <LoadingAnimation />}


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal localizadorModal'>
        <AiOutlineClose className='closeModalTrash' onClick={()=>closeLocalizador()} />

        <div className='infoModal'>
          <div className='d-flex'>
            <PiCallBellLight className='display-1' />
            <h2><b>Reserva<br />Confirmada!</b></h2>
          </div>
          <div className='row'>
            <div className='col-12'>
              <label>Assento</label>
              <span>{updateAssento}</span>
            </div>
            <div className='col-12'>
              <label>Passageiro</label>
              <span>{nome} {sobrenome}</span>
            </div>
            <div className='col-12'>
              <label>Localizador</label>
              <h2 className='localizadorNumber'><strong>{localizador}</strong></h2>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div className={openModal2 ? 'bg_loading' : 'hide'}>

      <div className='globalModal text-center'>
        <span className='closeModal' onClick={()=>setOpenModal2(false)} >✕</span>

        <form onSubmit={(e)=> validaFormModal(e)}>


          <div className='infoModal'>

            <div className='row'>
              <div className='col-12'>
                <h5>Observações:</h5>
                <textarea className='textareaModal' value={obs} onChange={(e)=>setObs(e.target.value)}></textarea>
              </div>

              <div className='col-12 mt-2'>
                <button type='submit' className='btnGde'><span><BsCheckLg /> Salvar</span></button>
              </div>


            </div>
          </div>

        </form>


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

      <form onSubmit={(e)=> validaForm(e)}>
        <div className='row interModal'>
          <div className='col-4'>
            <label>Nome</label>
            <input type='text' value={nome} onChange={(e)=>setNome(e.target.value)} required disabled={reservaId ? true : false} />
          </div>
          <div className='col-4'>
            <label>Sobrenome</label>
            <input type='text' value={sobrenome} onChange={(e)=>setSobrenome(e.target.value)} required disabled={reservaId ? true : false}  />
          </div>
          <div className='col-4'>
            <label>CPF</label>
            <ReactInputMask mask="999.999.999-99" id="f_cpf" className='defaultField' value={cpf} onChange={(e) => setCpf(e.target.value)} required  disabled={reservaId ? true : false}  />
          </div>
          <div className='col-4'>
            <label>Data Nascimento</label>
            <input type='date' value={nascimento} onChange={(e)=>setNascimeto(e.target.value)} onBlur={(e)=>changeNascimento(e.target.value)} required disabled={reservaId ? true : false}  />
          </div>
          <div className='col-2'>
            <label>Sexo</label>
            <select value={sexo} onChange={(e)=>setSexo(e.target.value)} required disabled={reservaId ? true : false}  >
              <option value=""></option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className='col-2'>
            <label>Tipo</label>
            <select value={tipo} onChange={(e)=>setTipo(e.target.value)} required disabled >
              <option value=""></option>
              <option value="INF">INF</option>
              <option value="CHD">CHD</option>
              <option value="ADT">ADT</option>
            </select>
          </div>

          <div className='col-2 text-start'>
            <label>Status</label>
            <span className={!toggle?'cursorPointer':'hide'} onClick={()=> setToggle(true)}><LiaToggleOffSolid className='h2 mt-2 disableColor' /> Reservado</span>
            <span className={toggle?'cursorPointer':'hide'} onClick={()=> setToggle(false)}><LiaToggleOnSolid className='h2 mt-2 pink-salmon' /> Pago</span>
          </div>
          <div className='col-6'>
            <label>Responsável</label>
            <input type='text' id="f_responsavel" value={responsavel} onChange={(e)=>setResponsavel(e.target.value)} disabled={tipo == 'ADT' || reservaId ? true:false}  />
          </div>
          <div className='col-6'>
            <label>CPF do Responsável</label>
            <ReactInputMask mask="999.999.999-99" id="f_cpf" className='defaultField' required  disabled={reservaId ? true : false}  />
          </div>
          <div className='col-4'>
            <label>Telefone</label>
            <div className='d-flex'>
              <ReactInputMask mask="(99) 99999-9999" id="f_telefone" className='defaultField' value={telefone} onChange={(e) => setTelefone(e.target.value)}  disabled={reservaId ? true : false}   />
              <button type='button' className='btnMorLess btnMore' onClick={()=>addTel()}><BsFillPlusCircleFill /></button>
            </div>
            {listTel.map((base, index) => (
              <div key={index} className='listItem' onClick={()=>removeTel(index)} >
                <span>{base}</span> <BsDashCircle />
              </div>
            ))}
          </div>
          <div className='col-4'>
            <label>E-mail</label>
            <div className='d-flex'>
              <input type='email' value={email} id="f_email" onChange={(e)=>setEmail(e.target.value)}  disabled={reservaId ? true : false}  />
              <button type='button' className='btnMorLess btnMore' onClick={()=>addEmail()}><BsFillPlusCircleFill /></button>
            </div>
            {listEmail.map((base, index) => (
              <div key={index} className='listItem' onClick={()=>removeEmail(index)}>
                <span>{base}</span> <BsDashCircle />
              </div>
            ))}
          </div>

          <div className='col-4'>
            <label>Rede Social</label>
            <div className='d-flex'>
              <input type='text' id="f_socialmedia" value={socialmedia} onChange={(e)=>setSocialmedia(e.target.value)}  disabled={reservaId ? true : false}  />
              <button type='button' className='btnMorLess btnMore' onClick={()=>addSocialMedia()}><BsFillPlusCircleFill /></button>
            </div>
            {listSocialMedia.map((base, index) => (
              <div key={index} className='listItem' onClick={()=>removeSocialMedia(index)}>
                <span>{base}</span> <BsDashCircle />
              </div>
            ))}
          </div>

        </div>
        <div className='row'>
          <div className='col-9'></div>
          <div className='col-12 mt-4'>
            <button type='submit' className={reservaId ? 'hide' : 'btnGde'} ><span className={loading ? 'hide' : ''}><BsCheckLg /> Salvar</span><span className={loading ? 'loader' : 'hide'}></span></button>
          
            <small className={reservaId ? '' : 'hide'}>Localizador</small>
            <button type='button' className={reservaId ? 'btnGde' : 'hide'} onClick={()=>closeLocalizador()} ><h2>{localizadorId}</h2></button>

          </div>
        </div>
      </form>

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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/reserva" relative="path">Reserva</Link>&nbsp;/&nbsp;Validação de Assentos</div>

          <div className="lineButtons row ">
            <div className="col">
              <h1>Reserva</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col-5 '>
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

                            <div className='col-12 mt-4 obsDiv' onClick={()=>changeObs(base.obs)}>
                              <label>Observações: <span className='pink-salmon penObs' title='Alterar Observações'>✎</span></label>
                              <span>{base.obs}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className='row interCol mt-3 pt-3 pb-3'>

                    <div className='row'>

                      <h3>Passageiros</h3>

                      <div >
                        <div className='row'>
                          <div className='col-12 '>
                            <table className="tblPassageiros">
                              <thead>
                                <tr>
                                  <td>Assento</td>
                                  <td>Tipo</td>
                                  <td>Passageiro</td>
                                  <td>Localizador</td>
                                </tr>
                              </thead>
                              <tbody>
                                {dataReserva.map((base, mp) => (
                                  <tr key={mp} onClick={()=>changeAssento(base.assento.substring(0, 1), base.assento.substring(1), base.classe)}>
                                    <td>{base.assento}/{formataClasse(base.classe)}</td>
                                    <td>{base.tipo}</td>
                                    <td>{base.nome} {base.sobrenome}</td>
                                    <td>{base.localizador}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>


                      <div className='col-12'>
                        <button type='button' onClick={()=>gerarFaturamento()} ><span ><BsCheckLg /> Gerar Faturamento</span></button>
                      </div>
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
                                    <div id={colun.coluna+line.fileira+'primeiraClasse'} className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'primeiraClasseCorredor' : checkAssento(colun.coluna, line.fileira, 'primeiraClasse') == 'yes' ? 'primeiraClasseOcupado' : 'primeiraClasse'} onClick={()=>changeAssento(colun.coluna, line.fileira, 'primeiraClasse')}>

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
                            <div className={checkSaidaEmerg(line.fileira, 'primeiraClasse')?line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia':'hide'}>
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
                                    <div id={colun.coluna+contFileiraPremium(line.fileira)+'premium'} className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'premiumCorredor' : checkAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium') == 'yes' ? 'assentoOcupado' : 'premium'} onClick={()=>changeAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium')}>
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
                            <div className={checkSaidaEmerg(contFileiraPremium(line.fileira), 'premium')?line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia':'hide'}>
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
                                  <div key={index} className='assentos'>
                                    <div id={colun.coluna+contFileiraExecutiva(line.fileira)+'executiva'} className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'executivaCorredor' : checkAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva') == 'yes' ? 'assentoOcupado' : 'executiva'} onClick={()=>changeAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva')}>
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
                            <div className={checkSaidaEmerg(contFileiraExecutiva(line.fileira), 'executiva')?line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia':'hide'}>
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
                                  <div key={index} className='assentos'>
                                    <div id={colun.coluna+contFileiraEconomica(line.fileira)+'economica'} className={id == "0" ? 'hide' : colun.tipo == 'corredor' ? 'economicaCorredor' : checkAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica') == 'yes' ? 'assentoOcupado' : 'economica'} onClick={()=>changeAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica')}>
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
                            <div className={checkSaidaEmerg(contFileiraEconomica(line.fileira), 'economica')? line.tipo=='asa'?'saidaEmergenciaAsa':'saidaEmergencia':'hide'}>
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
  
export default ValidacaoAssentos