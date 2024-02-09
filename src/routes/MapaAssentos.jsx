import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight, BiTrash } from "react-icons/bi";
import Header from '../components/Header';
import { GrClose } from "react-icons/gr";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiAirplaneTiltThin } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { BsCheckLg, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import { LuArrowDownUp} from "react-icons/lu";
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import { RxSpaceBetweenVertically } from "react-icons/rx";
import { FiStar } from "react-icons/fi";
import { MdOutlineHome, MdOutlineStar } from "react-icons/md"
import { GiPlaneWing } from "react-icons/gi"
import { SiSitepoint } from "react-icons/si"





function MapaAssentos() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
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
  const [selectClass, setSelectClass] = useState ('');
  const [totalFileiras, setTotalFileiras] = useState (''); 
  const [totalColunas, setTotalColunas] = useState (''); 
  const [primeiraClasseFileiras, setprimeiraClasseFileiras] = useState ([]); 
  const [primeiraClasseColunas, setprimeiraClasseColunas] = useState ([]);
  const [totalprimeiraClasseFileiras, setTotalprimeiraClasseFileiras] = useState (''); 
  const [totalprimeiraClasseColunas, setTotalprimeiraClasseColunas] = useState (''); 
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
  const [caracteristicasassentosData, setCaracteristicasassentosData] = useState ([]);
  const [caracteristicasAssentoGrupo, setCaracteristicasAssentoGrupo] = useState (''); 
  const [servicoBordoData, setServicoBordoData] = useState ([]);
  const [servicoBordoGrupo, setServicoBordoGrupo] = useState (''); 
  const [assentoClasseData, setAssentoClasseData] = useState ([]);
  const [corredoresPrimC, setCorredoresPrimC] = useState ([]); 
  const [corredoresPremium, setCorredoresPremium] = useState ([]); 
  const [corredoresExecutiva, setCorredoresExecutiva] = useState ([]); 
  const [corredoresEconomica, setCorredoresEconomica] = useState ([]); 

  const [saidaEmergPrimC, setSaidaEmergPrimC] = useState ([]); 
  const [saidaEmergPremium, setSaidaEmergPremium] = useState ([]); 
  const [saidaEmergExecutiva, setSaidaEmergExecutiva] = useState ([]); 
  const [saidaEmergEconomica, setSaidaEmergEconomica] = useState ([]); 

  const [selectCorredor, setSelectCorredor] = useState (''); 
  const [selectFileira, setSelectFileira] = useState (''); 
  const [nomenPC, setNomenPC] = useState ('');
  const [nomenPR, setNomenPR] = useState ('');
  const [nomenEX, setNomenEX] = useState ('');
  const [nomenEC, setNomenEC] = useState ('');
  

  useEffect(() => {
    carregaPagina()
  }, [])


  function carregaPagina() {
    setLoading(true);

    setTotalFileiras([])
    setTotalColunas([])


    var query = "SELECT * FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id WHERE vpcharter_frota.id = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setFabricante(response.data[0]['aeronave'])
        setAeronave(response.data[0]['nomeAeronave'])
        seCompanhia(response.data[0]['nome'])
        setLogo(response.data[0]['logo'])
        setNomenPC(response.data[0]['nomen_pc'])
        setNomenPR(response.data[0]['nomen_pr'])
        setNomenEX(response.data[0]['nomen_ex'])
        setNomenEC(response.data[0]['nomen_ec'])
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Registro não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))




    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'primeiraClasse' AND `fileira` >= '0' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setprimeiraClasseFileiras(response.data)
        setTotalprimeiraClasseFileiras(response.data.length-1)
        setTotalFileiras(response.data.length)
      } else {
        setprimeiraClasseFileiras([])
        setTotalprimeiraClasseFileiras('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'primeiraClasse' AND `coluna` != '' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setprimeiraClasseColunas(response.data)
        setTotalprimeiraClasseColunas(response.data.length)
        setTotalColunas(response.data.length)
      } else {
        setprimeiraClasseColunas([])
        setTotalprimeiraClasseColunas('')
      }
    })
    .catch(error=> alert(error))

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'premium' AND `fileira` >= '0' ORDER BY `fileira` ";
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

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'premium' AND `coluna` != '' ORDER BY `coluna` ";
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

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'executiva' AND `fileira` >= '0' ORDER BY `fileira` ";
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

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'executiva' AND `coluna` != '' ORDER BY `coluna` ";
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


    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'economica' AND `fileira` >= '0' ORDER BY `fileira` ";
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

    var query = "SELECT * FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+id+"' AND `categoria` = 'economica' AND `coluna` != '' ORDER BY `coluna` ";
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



    var query = "SELECT * FROM `vpcharter_mapaassentos` WHERE `aeronave` = '"+id+"' ";
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


    var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+id+"' AND `classe` = '"+selectClass+"' LIMIT 1";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setServicoBordo(response.data[0]['servico_bordo'])
        setServicoBordoGrupo(response.data[0]['servico_bordo'])
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


    var query = "SELECT * FROM `vpcharter_caracteristicasassentos` ORDER BY `caracteristica` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCaracteristicasassentosData(response.data)
      } 
    })



    var query = "SELECT * FROM `vpcharter_servico_bordo` ORDER BY `servico_bordo` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setServicoBordoData(response.data)
      } 
    })


    var query = "SELECT * FROM `vpcharter_carcteristicas_assento_classe` ORDER BY `caracteristica` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAssentoClasseData(response.data)
      } 
    })
    carregaCorredoresSaidasEmergencia()
    setLoading(false);
  }

  function carregaCorredoresSaidasEmergencia() {
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+id+"' AND `classe` = 'primeiraClasse' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresPrimC(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+id+"' AND `classe` = 'premium' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresPremium(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+id+"' AND `classe` = 'executiva' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresExecutiva(response.data)
      } 
    })
    var query = "SELECT `id`, `coluna` FROM `vpcharter_corredores` WHERE `aeronave` = '"+id+"' AND `classe` = 'economica' ORDER BY `coluna` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setCorredoresEconomica(response.data)
      } 
    })



    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+id+"' AND `classe` = 'primeiraClasse' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergPrimC(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+id+"' AND `classe` = 'premium' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergPremium(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+id+"' AND `classe` = 'executiva' ORDER BY `fileira` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setSaidaEmergExecutiva(response.data)
      } 
    })
    var query = "SELECT `id`, `fileira` FROM `vpcharter_saidas_emergencia` WHERE `aeronave` = '"+id+"' AND `classe` = 'economica' ORDER BY `fileira` ";
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

    /*
    setUpdateTipoAssento('padrao')
    setUpdateIdAssento('')
    var assento = col+fil;

    //Limpar lista
    for (var i = 0; i < caracteristicasassentosData.length; ++i) {
      var off = 'off'+i;
      var on = 'on'+i;
      document.getElementById(off).style.display = "block";
      document.getElementById(on).style.display = "none";
    }

    var query = "SELECT * FROM `vpcharter_mapaassentos` WHERE `aeronave` = '"+id+"' AND `categoria` = '"+classe+"' AND `assento` = '"+assento+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        var tipos = response.data[0]['tipoAssento'].substring(0, response.data[0]['tipoAssento'].length - 1).split(",").sort();
        for (var i = 0; i < tipos.length; ++i) {
          //Flag select
          var off = 'off'+tipos[i];
          var on = 'on'+tipos[i];
          document.getElementById(off).style.display = "none";
          document.getElementById(on).style.display = "block";
        }
        setCaracteristicasAssentoGrupo(response.data[0]['tipoAssento'])
        setUpdateTipoAssento(response.data[0]['tipoAssento'])
        setUpdateIdAssento(response.data[0]['id'])
      } 
    })
    .catch(error=> alert(error))

    setCaracteristicasAssentoGrupo('')
    setOpenModal3(true)
    setUpdateAssento(assento)
    setUpdateAssentoClasse(classe)
    */

  }

  function updateNewTipoAssento () {
    setOpenModal3(false)
    setLoading(true)

    setTimeout(function() { 

      //var array = caracteristicasAssentoGrupo.substring(0, caracteristicasAssentoGrupo.length - 1).split(",").sort().toString();
      var array = caracteristicasAssentoGrupo.toString();
      
      if (caracteristicasAssentoGrupo.length > 0) {

        if (updateIdAssento) {
          var query = "UPDATE `vpcharter_mapaassentos` SET `tipoAssento` = '"+array+"' WHERE `vpcharter_mapaassentos`.`id` = '"+updateIdAssento+"' ";
        } else {
          var query = "INSERT INTO `vpcharter_mapaassentos` (`id`, `aeronave`, `categoria`, `assento`, `tipoAssento`) VALUES (NULL, '"+id+"', '"+updateAssentoClasse+"', '"+updateAssento+"', '"+array+"') ";
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

      } else {

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
        
      }

      setLoading(false)
    }, 1000)

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
    setLoading(true)
    setSelectClass(e)

    setTimeout(function() { 

      if (e == 'primeiraClasse') {
        setTotalColunas(totalprimeiraClasseColunas)
        setTotalFileiras(totalprimeiraClasseFileiras)
      }
      if (e == 'premium') {
        setTotalColunas(totalPremiumColunas)
        setTotalFileiras(totalPremiumFileiras)
      }
      if (e == 'executiva') {
        setTotalColunas(totalExecutivaColunas)
        setTotalFileiras(totalExecutivaFileiras)
      }
      if (e == 'economica') {
        setTotalColunas(totalEconomicaColunas)
        setTotalFileiras(totalEconomicaFileiras)
      }
  
      carregaPagina()
      setServicoBordoGrupo('')
      setServicoBordo('')
  
      var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+id+"' AND `classe` = '"+e+"' LIMIT 1";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setServicoBordo(response.data[0]['servico_bordo'])
          setServicoBordoGrupo(response.data[0]['servico_bordo'])
          setCaracteristicasAssentos(response.data[0]['caracteristicas_assento'])
          setDistancia(response.data[0]['distancia'])
          setLargura(response.data[0]['largura'])
          setAngulo(response.data[0]['angulo'])
          setLoading(false)
        } else {
          setServicoBordo('')
          setServicoBordoGrupo('')
          setCaracteristicasAssentos('')
          setDistancia('')
          setLargura('')
          setAngulo('')
          setLoading(false)
        }
      })
      .catch(error=> alert(error))
      
      
    }, 1000)

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
    if (totalprimeiraClasseFileiras) { a = totalprimeiraClasseFileiras;}
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
    if (totalprimeiraClasseColunas) { a = totalprimeiraClasseColunas;}
    if (totalPremiumColunas) { b = totalPremiumColunas;}
    if (totalExecutivaColunas) { c = totalExecutivaColunas;}
    if (totalEconomicaColunas) { d = totalEconomicaColunas;}
    var x = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    return x;
  }

  function contFileiraPremium (x) {
    var y = 0;
    if (totalprimeiraClasseFileiras) {
      y = totalprimeiraClasseFileiras;
    }
    return parseInt(x) + parseInt(y);
  }

  function contFileiraExecutiva (x) {
    var a = 0;
    var b = 0;
    if (totalprimeiraClasseFileiras) { a = totalprimeiraClasseFileiras; }
    if (totalPremiumFileiras) { b = totalPremiumFileiras - 1; }
    return parseInt(x) + parseInt(a) + parseInt(b);
  }

  function contFileiraEconomica (x) {
    var a = 0;
    var b = 0;
    var c = 0;
    if (totalprimeiraClasseFileiras) { a = totalprimeiraClasseFileiras; }
    if (totalPremiumFileiras) { b = totalPremiumFileiras - 1; }
    if (totalExecutivaFileiras) { c = totalExecutivaFileiras - 1; }
    return parseInt(x) + parseInt(a) + parseInt(b) + parseInt(c);
  }

  function updateCaracteristicas() {
    
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_caracteristicas_aeronave` WHERE `aeronave` = '"+id+"' AND `classe` = '"+selectClass+"' LIMIT 1";
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
    navigate('/aereo/frota/rotas/'+id);
  }

  function toggleCaracAssento(x, y) {
    var off = 'off'+x;
    var on = 'on'+x;
    if (y == 'off') {
      document.getElementById(off).style.display = "none";
      document.getElementById(on).style.display = "block";
    } else {
      document.getElementById(off).style.display = "block";
      document.getElementById(on).style.display = "none";
    }

    if (y == 'off') {
      setCaracteristicasAssentoGrupo(x + ',' + caracteristicasAssentoGrupo);
    } else {
      var remove = x+',';
      setCaracteristicasAssentoGrupo(caracteristicasAssentoGrupo.replace(remove, ''))
    }

  }


  function toggleServicoBordo(x) {
    var tt = servicoBordo.split(",");
    var found = '';
    found = tt.find((element) => element == x); 

    if (found) {
      var remove = x+',';
      setServicoBordo(servicoBordo.replace(remove, ''))
    } else {
      setServicoBordo(x + ',' + servicoBordo);
    }
  }

  function checkServicoBordo(x) {
    var tt = servicoBordo.split(",");
    var found = '';
    found = tt.find((element) => element == x);    
    if (found) {
      return true
    }
  }

  function checkAssentosClasse(x) {
    var tt = caracteristicasAssentos.split(",");
    var found = '';
    found = tt.find((element) => element == x);    
    if (found) {
      return true
    }
  }

  function toggleAssentosClasse(x) {
    var tt = caracteristicasAssentos.split(",");
    var found = '';
    found = tt.find((element) => element == x); 

    if (found) {
      var remove = x+',';
      setCaracteristicasAssentos(caracteristicasAssentos.replace(remove, ''))
    } else {
      setCaracteristicasAssentos(x + ',' + caracteristicasAssentos);
    }
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

  function delCorredor(x) {
    setLoading(true);
    setTimeout(function() { 
      var query = "DELETE FROM `vpcharter_corredores` WHERE `id` = '"+x+"'";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        setCorredoresPrimC([])
        setCorredoresPremium([])
        setCorredoresExecutiva([])
        setCorredoresEconomica([])
        carregaPagina()
      })
      .catch(error=> alert(error))
    }, 1000)

  }

  function insertCorredor () {   
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_corredores` WHERE  `aeronave` = '"+id+"' AND `classe` = '"+selectClass+"' AND  `coluna` = '"+selectCorredor+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setLoading(false);
      } else {
        var query = "INSERT INTO `vpcharter_corredores` (`id`, `aeronave`, `classe`, `coluna`) VALUES (NULL, '"+id+"', '"+selectClass+"', '"+selectCorredor+"')";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setSelectCorredor('')
            carregaPagina()
          }
        })
        .catch(error=> alert(error))
      }
    })
    .catch(error=> alert(error))    
  }

  function checkSelectCorredor(x, y) {
    if (y == 'primeiraClasse') {
      var found = corredoresPrimC.find(({ e }) => e === x);
      if (primeiraClasseColunas[primeiraClasseColunas.length - 1]['coluna'] == x) { return true }
    }
    if (y == 'premium') {
      var found = corredoresPremium.find(({ e }) => e === x);
      if (premiumColunas[premiumColunas.length - 1]['coluna'] == x) { return true }
    }
    if (y == 'executiva') {
      var found = corredoresExecutiva.find(({ e }) => e === x);
      if (executivaColunas[executivaColunas.length - 1]['coluna'] == x) { return true }
    }
    if (y == 'economica') {
      var found = corredoresEconomica.find(({ e }) => e === x);
      if (economicaColunas[economicaColunas.length - 1]['coluna'] == x) { return true }
    }
    return false
  }

  function checkSelectFileira (x, y) {
    if (y == 'primeiraClasse') {
      var found = saidaEmergPrimC.find(({ e }) => e == x);
      if (found || primeiraClasseFileiras[primeiraClasseFileiras.length - 1]['fileira'] == x) { return true }
    }
    if (y == 'premium') {
      var found = saidaEmergPremium.find(({ e }) => e == x);
      if (found || premiumFileiras[premiumFileiras.length - 1]['fileira'] == x) { return true }
    }
    if (y == 'executiva') {
      var found = saidaEmergExecutiva.find(({ e }) => e == x);
      if (found || executivaFileiras[executivaFileiras.length - 1]['fileira'] == x) { return true }
    }
    if (y == 'economica') {
      var found = saidaEmergEconomica.find(({ e }) => e === x);
      if (found || economicaFileiras[economicaFileiras.length - 1]['fileira'] == x) { return true }
    }
    return false
  }

  function soma(x, y, z, w) {
    return Number(x) + Number(y) + Number(z) + Number(w)
  }

  function insertSaidaEmerg() {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_saidas_emergencia` WHERE  `aeronave` = '"+id+"' AND `classe` = '"+selectClass+"' AND  `fileira` = '"+selectFileira+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setLoading(false);
      } else {
        var query = "INSERT INTO `vpcharter_saidas_emergencia` (`id`, `aeronave`, `classe`, `fileira`) VALUES (NULL, '"+id+"', '"+selectClass+"', '"+selectFileira+"')";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
          if (response.data.length > 0) {
            setSelectFileira('')
            carregaPagina()
          }
        })
        .catch(error=> alert(error))
      }
    })
    .catch(error=> alert(error))
  }

  function delSaidaEmerg(x) {
    setLoading(true);
    setTimeout(function() { 
      var query = "DELETE FROM `vpcharter_saidas_emergencia` WHERE `id` = '"+x+"'";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        setSaidaEmergPrimC([])
        setSaidaEmergPremium([])
        setSaidaEmergExecutiva([])
        setSaidaEmergEconomica([])
        carregaPagina()
      })
      .catch(error=> alert(error))
    }, 1000)

  }


  function checkAssentoEspecial(x, y) {

    var totalPC = parseInt(primeiraClasseFileiras.length);
    var totalPR = parseInt(premiumFileiras.length);
    var totalEX = parseInt(executivaFileiras.length);


    if (x == 'primeiraClasse') {      
      for (var i = 0; i < saidaEmergPrimC.length; ++i) {
        if (saidaEmergPrimC[i]['fileira'] == y-1) { return true }
      }
      return false
    }

    if (x == 'premium') {     
      var ultimo = '';
      if (saidaEmergPrimC.length >0 ) {
        var emergPC = parseInt(saidaEmergPrimC[saidaEmergPrimC.length-1]['fileira']);
        emergPC = emergPC + 1;
        if (totalPC == emergPC) { ultimo = emergPC; }
        if (ultimo == y) { return true }
      }
      for (var i = 0; i < saidaEmergPremium.length; ++i) {
        if (saidaEmergPremium[i]['fileira'] == y-1) { return true }
      }
      return false
    }

    if (x == 'executiva') {  
      if (saidaEmergPremium.length >0 ) {
        var emergPR = parseInt(saidaEmergPremium[saidaEmergPremium.length-1]['fileira']);
        emergPR = emergPR+ 1;
        if (emergPR == y) { return true }
      }    
      for (var i = 0; i < saidaEmergExecutiva.length; ++i) {
        if (saidaEmergExecutiva[i]['fileira'] == y-1) { return true }
      }
      return false
    }

    if (x == 'economica') {   
      if (saidaEmergExecutiva.length >0 ) {
        var emergEX = parseInt(saidaEmergExecutiva[saidaEmergExecutiva.length-1]['fileira']);
        emergEX = emergEX+ 1;
        if (emergEX == y) { return true }
      }    
      for (var i = 0; i < saidaEmergEconomica.length; ++i) {
        if (saidaEmergEconomica[i]['fileira'] == y-1) { return true }
      }
      return false
    }
    
  }



  return (
    <>
    {loading && <LoadingAnimation />}


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center'>
      <span className='closeModal' onClick={()=>setOpenModal(false)} >✕</span>

      <h4>Alterar coluna <strong>{upadeCorredor}</strong></h4>
      <div className='row mt-4'>
        <div className='col-12 modalAssento'>
          <div className={updateTipoCorredor !='corredor'?'selectTipoAssento':'normalTipoAssento'}><TfiLayoutWidthDefault /><input type="radio" name="tipo_coluna" value='assento' onChange={(e)=>setUpdateTipoCorredor(e.target.value)} checked={updateTipoCorredor !='corredor'?'checked':''} /><span>Padrão</span></div>
          <div className={updateTipoCorredor =='corredor'?'selectTipoAssento':'normalTipoAssento'}><LuArrowDownUp /><input type="radio" name="tipo_coluna" value='corredor' onChange={(e)=>setUpdateTipoCorredor(e.target.value)} checked={updateTipoCorredor =='corredor'?'checked':''} /><span>Corredor</span></div>
          <div className='col-12 mt-3'>
            <button type='button' onClick={()=>updateColun(updateIdCorredor, updateTipoCorredor)}>Alterar</button>
          </div>
        </div>
      </div>

      </div>
    </div>

    <div className={openModal2 ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center'>
      <span className='closeModal' onClick={()=>setOpenModal2(false)} >✕</span>

      <h4>Alterar fileira <strong>{upadeFileira}</strong></h4>
      <div className='row mt-4'>
        <div className='col-12 modalAssento'>
          <div className={updateTipoFileira !='janela'?'selectTipoAssento':'normalTipoAssento'}><TfiLayoutWidthDefault /><input type="radio" name="tipo_fileira" value='fileira' onChange={(e)=>setUpdateTipoFileira(e.target.value)} checked={updateTipoFileira !='asa'?'checked':''} /><span>Padrão</span></div>
          <div className={updateTipoFileira =='janela'?'selectTipoAssento':'normalTipoAssento'}><GiPlaneWing /><input type="radio" name="tipo_fileira" value='asa' onChange={(e)=>setUpdateTipoFileira(e.target.value)} checked={updateTipoFileira =='asa'?'checked':''} /><span>Asa</span></div>
          <div className='col-12 mt-3'>
            <button type='button' onClick={()=>updateLine(updateIdFileira, updateTipoFileira)}>Alterar</button>
          </div>
        </div>
      </div>

      </div>
    </div>

    <div className={openModal3 ? 'bg_loading' : 'hide'} >
      <div className='globalModal text-center'>
      <span className='closeModal' onClick={()=>setOpenModal3(false)} >✕</span>

      <h4>Características do Assento<br /><strong>{updateAssento}</strong> /&nbsp;
        {updateAssentoClasse == 'economica'?'Econômica':''}
        {updateAssentoClasse == 'executiva'?'Executiva':''}
        {updateAssentoClasse == 'premium'?'Premium':''}
        {updateAssentoClasse == 'primeiraClasse'?'Primeira Classe':''}
      </h4>
      <div className='row mt-4'>
        <div className='col-12 modalAssento'>
          {caracteristicasassentosData.map((data, index) => (
            <div className='caracteristicaAssento' key={index}>
              <div><BsToggleOff id={'off'+index} onClick={()=>toggleCaracAssento(index, 'off')} className='BsToggleOff' /><BsToggleOn id={'on'+index} onClick={()=>toggleCaracAssento(index, 'on')} /></div>
              <span>{data.caracteristica}</span>
            </div>
          ))}

          <div className='row mt-4'>
            <div className='col'></div>
            <div className='col-7'><button type='button' onClick={()=>updateNewTipoAssento()}>Alterar</button></div>
            <div className='col'></div>
          </div>
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/frota" relative="path">Frota</Link>&nbsp;/&nbsp;<Link to={"/aereo/frota/editaaeronave/"+id} relative="path">Aeronave</Link>&nbsp;/&nbsp;Mapa de Assentos</div>

          
          <div className="lineButtons row ">
            <div className="col">
              <h1>Mapa de Assentos</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className={selectClass?'col-5 interCol':'hide'}>
                    <div className='row  mt-4'>
                      
                      <div className='col-12 titleAeronave'>
                        <img className={logo ? 'imgCia' : 'hide'} src={logo} /> {logo ? '' : aeronave} <h4>{fabricante}</h4>
                      </div>

                      <div className='col-12 mt-3 '>

                        <ul className="nav nav-pills nav-justified tabAeronave">
                          <li className="nav-item" onClick={()=>changeSelectClass('primeiraClasse')}>
                            <span className={selectClass=='primeiraClasse'?"nav-link active":"nav-link"} aria-current={selectClass=='primeiraClasse'?"page":''} >{nomenPC}</span>
                          </li>
                          <li className="nav-item" onClick={()=>changeSelectClass('premium')}>
                            <span className={selectClass=='premium'?"nav-link active":"nav-link"} aria-current={selectClass=='premium'?"page":''} >{nomenPR}</span>
                          </li>
                          <li className="nav-item" onClick={()=>changeSelectClass('executiva')}>
                            <span className={selectClass=='executiva'?"nav-link active":"nav-link"} aria-current={selectClass=='executiva'?"page":''} >{nomenEX}</span>
                          </li>
                          <li className="nav-item" onClick={()=>changeSelectClass('economica')}>
                          <span className={selectClass=='economica'?"nav-link active":"nav-link"} aria-current={selectClass=='economica'?"page":''} >{nomenEC}</span>
                          </li>
                        </ul>

                      </div>

                      <div className='col-12'>
                        {/*
                        <label>Categoria</label>
                        <h4>{selectClass}</h4>
                        <select name="select" value={selectClass} onChange={(e)=>changeSelectClass(e.target.value)}>
                          <option ></option>
                          <option value="primeiraClasse">Primeira Classe</option>
                          <option value="premium">Premium</option>
                          <option value="executiva">Executiva</option>
                          <option value="economica">Econômica</option>
                        </select>
                        */}
                      </div>

                      <div className={selectClass?'lineConfig mt-5':'hide'}>
                        <div >
                          Colunas
                        </div>
                        <button onClick={()=>delColuna()} className='btnMorLess'><BsDashCircleFill /></button>
                        <h4 className={selectClass=='primeiraClasse'?'':'hide'}>{totalprimeiraClasseColunas}</h4>
                        <h4 className={selectClass=='premium'?'':'hide'}>{totalPremiumColunas}</h4>
                        <h4 className={selectClass=='executiva'?'':'hide'}>{totalExecutivaColunas}</h4>
                        <h4 className={selectClass=='economica'?'':'hide'}>{totalEconomicaColunas}</h4>
                        <button onClick={()=>insertColuna()} className='btnMorLess' title="Inserir"><BsFillPlusCircleFill /></button>
                      </div>
                      <div className={selectClass?'lineConfig':'hide'}>
                        <div >
                          Fileiras
                        </div>
                        <button onClick={()=>delFileira()} className='btnMorLess'><BsDashCircleFill /></button>
                        <h4 className={selectClass=='primeiraClasse'?'':'hide'}>{totalprimeiraClasseFileiras}</h4>
                        <h4 className={selectClass=='premium'?'':'hide'}>{totalPremiumFileiras}</h4>
                        <h4 className={selectClass=='executiva'?'':'hide'}>{totalExecutivaFileiras}</h4>
                        <h4 className={selectClass=='economica'?'':'hide'}>{totalEconomicaFileiras}</h4>
                        <button onClick={()=>insertFileira()} className='btnMorLess' title="Inserir"><BsFillPlusCircleFill /></button>
                      </div>
                    </div>

                    <div className='row mt-4'>
                      <div className='col-12'>
                        <label>Corredores</label>
                      </div>
                      <div className='col'>
                        <select className={selectClass=='primeiraClasse'?'':'hide'} value={selectCorredor}  onChange={(e)=>setSelectCorredor(e.target.value)}>
                        <option value=''> </option>
                          {primeiraClasseColunas.map((colun, index) => (
                            <option value={colun.coluna} key={index} disabled={checkSelectCorredor(colun.coluna, 'primeiraClasse')}>Após a coluna - {colun.coluna}</option>
                          ))}
                        </select>

                        <select className={selectClass=='premium'?'':'hide'} value={selectCorredor}  onChange={(e)=>setSelectCorredor(e.target.value)}>
                          {premiumColunas.map((colun, index) => (
                            <option value={colun.coluna} key={index} disabled={checkSelectCorredor(colun.coluna, 'premium')}>Após a coluna - {colun.coluna}</option>
                          ))}
                        </select>

                        <select className={selectClass=='executiva'?'':'hide'} value={selectCorredor}  onChange={(e)=>setSelectCorredor(e.target.value)}>
                          {executivaColunas.map((colun, index) => (
                            <option value={colun.coluna} key={index} disabled={checkSelectCorredor(colun.coluna, 'executiva')}>Após a coluna - {colun.coluna}</option>
                          ))}
                        </select>

                        <select className={selectClass=='economica'?'':'hide'} value={selectCorredor}  onChange={(e)=>setSelectCorredor(e.target.value)}>
                          {economicaColunas.map((colun, index) => (
                            <option value={colun.coluna} key={index} disabled={checkSelectCorredor(colun.coluna, 'economica')}>Após a coluna - {colun.coluna}</option>
                          ))}
                        </select>

                      </div>
                      <div className='col-3'>
                        <button onClick={()=>insertCorredor()} className={selectCorredor?'btnMorLess':'btnMorLess opacity-50 text-secondary'} title="Inserir" disabled={selectCorredor?false:true}><BsFillPlusCircleFill /></button>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <table className='listTable table table-hover'>
                            <tbody className={selectClass=='primeiraClasse'?'':'hide'}>
                              {corredoresPrimC.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a coluna - {data.coluna}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delCorredor(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='premium'?'':'hide'}>
                              {corredoresPremium.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a coluna - {data.coluna}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delCorredor(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='executiva'?'':'hide'}>
                              {corredoresExecutiva.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a coluna - {data.coluna}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delCorredor(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='economica'?'':'hide'}>
                              {corredoresEconomica.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a coluna - {data.coluna}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delCorredor(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-12'>
                        <label>Saídas de Emergência</label>
                      </div>
                      <div className='col'>
                        <select className={selectClass=='primeiraClasse'?'':'hide'} value={selectFileira}  onChange={(e)=>setSelectFileira(e.target.value)}>
                        <option value=''> </option>
                          {primeiraClasseFileiras.map((colun, index) => (
                            <option value={index == 0 ? '' : colun.fileira} key={index} className={index=='0' || colun.fileira == '0'?'hide':''} >Após a fileira - {colun.fileira}</option>
                          ))}
                        </select>
                        <select className={selectClass=='premium'?'':'hide'} value={selectFileira}  onChange={(e)=>setSelectFileira(e.target.value)}>
                          {premiumFileiras.map((colun, index) => (
                            <option value={index == 0 ? '' : soma(colun.fileira, primeiraClasseFileiras.length - 1, 0, 0)} key={index} >{colun.fileira=='0'?' ': 'Após a fileira - ' + soma(colun.fileira, primeiraClasseFileiras.length - 1, 0, 0)}</option>
                          ))}
                        </select>

                        <select className={selectClass=='executiva'?'':'hide'} value={selectFileira}  onChange={(e)=>setSelectFileira(e.target.value)}>
                          {executivaFileiras.map((colun, index) => (
                            <option value={index == 0 ? '' : soma(colun.fileira, primeiraClasseFileiras.length - 1, premiumFileiras.length - 1, 0)} key={index} >{colun.fileira=='0'?' ': 'Após a fileira - ' + soma(colun.fileira, primeiraClasseFileiras.length - 1, premiumFileiras.length - 1, 0)}</option>
                          ))}
                        </select>

                        <select className={selectClass=='economica'?'':'hide'} value={selectFileira}  onChange={(e)=>setSelectFileira(e.target.value)}>
                          {economicaFileiras.map((colun, index) => (
                            <option value={index == 0 ? '' : soma(colun.fileira, primeiraClasseFileiras.length - 1, premiumFileiras.length - 1, executivaFileiras.length - 1)} key={index} >{colun.fileira=='0'?' ': 'Após a fileira - ' + soma(colun.fileira, primeiraClasseFileiras.length - 1, premiumFileiras.length - 1, executivaFileiras.length - 1)}</option>
                          ))}
                        </select>

                      </div>
                      <div className='col-3'>
                        <button onClick={()=>insertSaidaEmerg()} className={selectFileira?'btnMorLess':'btnMorLess opacity-50 text-secondary'} title="Inserir" disabled={selectFileira?false:true}><BsFillPlusCircleFill /></button>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <table className='listTable table table-hover'>
                            <tbody className={selectClass=='primeiraClasse'?'':'hide'}>
                              {saidaEmergPrimC.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a fileira - {data.fileira}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delSaidaEmerg(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='premium'?'':'hide'}>
                              {saidaEmergPremium.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a fileira - {data.fileira}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delSaidaEmerg(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='executiva'?'':'hide'}>
                              {saidaEmergExecutiva.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a fileira - {data.fileira}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delSaidaEmerg(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody className={selectClass=='economica'?'':'hide'}>
                              {saidaEmergEconomica.map((data, index) => (
                                <tr key={index}>
                                  <td className='delCorredor'><span>Após a fileira - {data.coluna}</span></td>
                                  <td className='text-center delCorredor' onClick={()=> delSaidaEmerg(data.id)}><BiTrash /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                      </div>
                    </div>

                    <div className='row mt-4'>
                      <div className='col-6'>
                        <label>Serviço de Bordo</label>
                        {servicoBordoData.map((data, index) => (
                          <div className='toggleList' key={index}>
                            <div className={data.servico_bordo?'':'hide'}>
                              <BsToggleOff className={checkServicoBordo(data.id)?'hide':'BsToggleOff'} onClick={()=>toggleServicoBordo(data.id)} />
                              <BsToggleOn className={checkServicoBordo(data.id)?'':'hide'} onClick={()=>toggleServicoBordo(data.id)} /></div>
                            <span>{data.servico_bordo}</span>
                          </div>
                        ))}
                      </div>
                      <div className='col-6'>
                        <label>Características Assentos</label>
                        {assentoClasseData.map((data, index) => (
                          <div className='toggleList' key={index}>
                            <div className={data.caracteristica?'':'hide'}>
                              <BsToggleOff className={checkAssentosClasse(data.id)?'hide':'BsToggleOff'} onClick={()=>toggleAssentosClasse(data.id)} />
                              <BsToggleOn className={checkAssentosClasse(data.id)?'':'hide'} onClick={()=>toggleAssentosClasse(data.id)} /></div>
                            <span>{data.caracteristica}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/*
                    <div className='row mt-4'>
                      <div className='col-4'>
                        <label>Distância (cm)</label>
                        <input type='number' min="0" value={distancia} onChange={(e)=>setDistancia(e.target.value)}></input>
                      </div>
                      <div className='col-4'>
                        <label>Largura (cm)</label>
                        <input type='number' min="0" value={largura} onChange={(e)=>setLargura(e.target.value)}></input>
                      </div>
                      <div className='col-4'>
                        <label>Ângulo (º)</label>
                        <input type='number' min="0" max="90" value={angulo} onChange={(e)=>setAngulo(e.target.value)}></input>
                      </div>
                    </div>
                    */}

                    <div className='row mt-4'>
                      <div className='col-12'>
                          <button type='button' onClick={()=>updateCaracteristicas()} ><span className={loading ? 'hide' : ''}><BsCheckLg /> Salvar</span><span className={loading ? 'loader' : 'hide'}></span></button>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-12'>
                        <button type='button' className='btnSecond' onClick={()=>gerarRota()} ><span><SiSitepoint /> Rotas</span></button>
                      </div>
                    </div>

                </div>

                <div className={!selectClass?'col-5 interCol p-5':'hide'}>
                      
                  <div className='col-12 titleAeronave'>
                    <img className={logo ? 'imgCia' : 'hide'} src={logo} /> {logo ? '' : aeronave} <h4>{fabricante}</h4>
                  </div>

                  <div className='mt-5 mb-0'><h5><b>Por favor, selecione a Categoria.</b></h5></div>

                  {/*
                  <div className='divSelectClasses mt-0'>
                    <button onClick={()=>changeSelectClass('primeiraClasse')}>{nomenPC}</button>
                    <button onClick={()=>changeSelectClass('premium')}>{nomenPR}</button>
                    <button onClick={()=>changeSelectClass('executiva')}>{nomenEX}</button>
                    <button onClick={()=>changeSelectClass('economica')}>{nomenEC}</button>
                  </div>
                  */}


                  <div className='col-12 mt-3 '>

                    <ul className="nav nav-pills nav-justified tabAeronave">
                      <li className="nav-item" onClick={()=>changeSelectClass('primeiraClasse')}>
                        <span className="nav-link btnIni" aria-current={selectClass=='primeiraClasse'?"page":''} >{nomenPC}</span>
                      </li>
                      <li className="nav-item" onClick={()=>changeSelectClass('premium')}>
                        <span className="nav-link btnIni" aria-current={selectClass=='premium'?"page":''} >{nomenPR}</span>
                      </li>
                      <li className="nav-item" onClick={()=>changeSelectClass('executiva')}>
                        <span className="nav-link btnIni" aria-current={selectClass=='executiva'?"page":''} >{nomenEX}</span>
                      </li>
                      <li className="nav-item" onClick={()=>changeSelectClass('economica')}>
                      <span className="nav-link btnIni" aria-current={selectClass=='economica'?"page":''} >{nomenEC}</span>
                      </li>
                    </ul>

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

                      {/*Primeira Classe ----------------------------- */}
                      <tr>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className={selectClass=='primeiraClasse'?"divideClass fileiraAssentosSelect":"divideClass"}>{totalprimeiraClasseFileiras > 1 ? nomenPC:''}</div></td>
                      </tr>

                      {primeiraClasseFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'': 'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentosEdit' onClick={()=>changeFileira(line.fileira, line.tipo, line.id)}>{line.fileira}</button>  
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className={line.tipo == 'emergencia' ?'hide': selectClass=='primeiraClasse'?'fileiraAssentos fileiraAssentosSelect':'fileiraAssentos'}>
                              {primeiraClasseColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div className={id == "0" ? 'hide' : 'primeiraClasse'} onClick={()=>changeAssento(colun.coluna, line.fileira, 'primeiraClasse')}>
                                      <div data-title="Assento de Emergência"><MdOutlineStar  className={checkAssentoEspecial('primeiraClasse', line.fileira)?'starEspecial':'hide'} /></div>
                                    </div>
                                    <button className={line.fileira == "0" ? 'btnAssentosPC' : 'hide'} ><span >{colun.coluna}</span></button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'primeiraClasse')?'assentos':'hide'} ><div className='primeiraClasseCorredor'></div></div>
                                </div>
                              ))}

                            </div>
                            <div className={checkSaidaEmerg(line.fileira, 'primeiraClasse')?line.tipo=='asa'?selectClass=='primeiraClasse'?'saidaEmergenciaAsa fileiraAssentosSelect':'saidaEmergenciaAsa': selectClass=='primeiraClasse'?'saidaEmergencia fileiraAssentosSelect':'saidaEmergencia':'hide'}>
                                <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}



                      {/*Premium ----------------------------- */}
                      <tr className={totalprimeiraClasseFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className={selectClass=='premium'?"divideClass fileiraAssentosSelect":"divideClass"}>{totalPremiumFileiras > 1 ? nomenPR:''}</div></td>
                      </tr>
                      {premiumFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>                              
                              <button className='btnAssentosEdit' onClick={()=>changeFileira(contFileiraPremium(line.fileira), line.tipo, line.id)}>{contFileiraPremium(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className={line.tipo == 'emergencia' ?'hide': selectClass=='premium'?'fileiraAssentos fileiraAssentosSelect':'fileiraAssentos'}>
                              {premiumColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div className={id == "0"?'hide':'premium'} onClick={()=>changeAssento(colun.coluna, contFileiraPremium(line.fileira), 'premium')}>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                      <div data-title="Assento de Emergência"><MdOutlineStar  className={checkAssentoEspecial('premium', contFileiraPremium(line.fileira))?'starEspecial':'hide'} /></div>
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'}>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'premium')?'assentos':'hide'} ><div className='premiumCorredor'></div></div>
                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraPremium(line.fileira), 'premium')? line.tipo=='asa'? selectClass=='premium'?'saidaEmergenciaAsa fileiraAssentosSelect':'saidaEmergenciaAsa': selectClass=='premium'?'saidaEmergencia fileiraAssentosSelect':'saidaEmergencia':'hide'}>
                              <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}


                      {/*Executiva ----------------------------- */}
                      <tr className={totalPremiumFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className={selectClass=='executiva'?"divideClass fileiraAssentosSelect":"divideClass"}>{totalExecutivaFileiras > 1 ? nomenEX:''}</div></td>
                      </tr>
                      {executivaFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentosEdit' onClick={()=>changeFileira(contFileiraExecutiva(line.fileira), line.tipo, line.id)}>{contFileiraExecutiva(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className={line.tipo == 'emergencia' ?'hide': selectClass=='executiva'?'fileiraAssentos fileiraAssentosSelect':'fileiraAssentos'}>
                              {executivaColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div className={id == "0"?'hide':'executiva'} onClick={()=>changeAssento(colun.coluna, contFileiraExecutiva(line.fileira), 'executiva')}>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                      <div data-title="Assento de Emergência"><MdOutlineStar  className={checkAssentoEspecial('executiva', contFileiraExecutiva(line.fileira))?'starEspecial':'hide'} /></div>
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'}>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'executiva')?'assentos':'hide'} ><div className='executivaCorredor'></div></div>
                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraExecutiva(line.fileira), 'executiva')? line.tipo=='asa'? selectClass=='executiva'?'saidaEmergenciaAsa fileiraAssentosSelect':'saidaEmergenciaAsa': selectClass=='premium'?'saidaEmergencia fileiraAssentosSelect':'saidaEmergencia':'hide'}>
                              <div className='exit'>EXIT</div><div className='exit'>EXIT</div>
                            </div>
                          </td>
                        </tr>
                      ))}



                      {/*Econômica ----------------------------- */}
                      <tr className={totalExecutivaFileiras?'':'hide'}>
                        <td className='tdBordaDir'></td>
                        <td colSpan={totalizadorColunas()} className='tdBordaDir'><div className={selectClass=='economica'?"divideClass fileiraAssentosSelect":"divideClass"}>{totalEconomicaFileiras > 1 ? nomenEC:''}</div></td>
                      </tr>
                      {economicaFileiras.map((line, id) => (
                        <tr key={id} className={id=="0"?'':'fileiraUser'}>
                          <td scope="col" className={line.tipo == 'asa' ?'asaEsq':'tdBordaDir'}>
                            <div className={id=="0"?'hide':'fileiraNumber'}>
                              <button className='btnAssentosEdit' onClick={()=>changeFileira(contFileiraEconomica(line.fileira), line.tipo, line.id)}>{contFileiraEconomica(line.fileira)}</button>
                            </div>
                          </td>
                          <td className={line.tipo == 'asa' ?'asaDir':'tdBordaDir'}>
                            <div className={line.tipo == 'emergencia' ?'hide': selectClass=='economica'?'fileiraAssentos fileiraAssentosSelect':'fileiraAssentos'}>
                              {economicaColunas.map((colun, index) => (
                                <div key={index} className='d-flex'>
                                  <div className='assentos'>
                                    <div className={id == "0"?'hide':'economica'} onClick={()=>changeAssento(colun.coluna, contFileiraEconomica(line.fileira), 'economica')}>
                                      <span className={colun.tipo == 'corredor'?'hide':''}>
                                      <div data-title="Assento de Emergência"><MdOutlineStar  className={checkAssentoEspecial('economica', contFileiraEconomica(line.fileira))?'starEspecial':'hide'} /></div>
                                      </span>
                                    </div>
                                    <button className={id == "0" ? 'btnAssentos' : 'hide'}>{colun.coluna}</button>
                                  </div>
                                  <div className={checkCorredor(colun.coluna, 'economica')?'assentos':'hide'} ><div className='economicaCorredor'></div></div>
                                </div>
                              ))}
                            </div>
                            <div className={checkSaidaEmerg(contFileiraEconomica(line.fileira), 'economica')? line.tipo=='asa'? selectClass=='economica'?'saidaEmergenciaAsa fileiraAssentosSelect':'saidaEmergenciaAsa': selectClass=='premium'?'saidaEmergencia fileiraAssentosSelect':'saidaEmergencia':'hide'}>
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
  
export default MapaAssentos