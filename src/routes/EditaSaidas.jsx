import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { BsChevronLeft, BsChevronRight, BsCheckLg  } from "react-icons/bs";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import LoadingAnimation from "../components/LoadingAnimation";
import IntlCurrencyInput from "react-intl-currency-input"
import { MdOutlineHome } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuCalendarDays, LuCalendarCheck, LuCalendarX  } from "react-icons/lu";
import ContentEditable from "react-contenteditable";
import { AiOutlineClose } from "react-icons/ai";



function EditaSaidas() {

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
  const [primeiraClasse, setPrimeiraClasse] = useState (0);
  const [premium, setPremium] = useState (0);
  const [executiva, setExecutiva] = useState (0);
  const [economica, setEconomica] = useState (0);
  const [dataIda, setDataIda] = useState ('');
  const [dataVolta, setDataVolta] = useState ('');
  const [cancelamento, setCancelamento] = useState ('');
  const [contratante, setContratante] = useState ('');
  const [contratanteData, setContratanteData] = useState ([]);
  const [openModal, setOpenModal] = useState (false);
  const [ttPrimeiraClasse, setTtPrimeiraClasse] = useState (0);
  const [ttPremium, setTtPremium] = useState (0);
  const [ttExecutiva, setTtExecutiva] = useState (0);
  const [ttEconomica, setTtEconomica] = useState (0);
  const [totalAssentos, setTotalAssentos] = useState (0);
  const [custoMedio, setCustoMedio] = useState ('');
  const [qtdeClasses, setQtdeClasses] = useState (0);
  const [valorMulta, setValorMulta] = useState (0);
  const [dataFretamento, setDataFretamento] = useState ('');


  var tt1 = 0;
  
  const [dataBaseRotas, setDataBaseRotas] = useState ([]); 
  const [dataBaseRotasOrigem, setDataBaseRotasOrigem] = useState ([]); 
  const [dataFilterBaseRotasOrigem, setDataFilterBaseRotasOrigem] = useState ([]); 

  const [ida, setIda] = useState ('');
  const [idRotaIda, setIdRotaIda] = useState ('');
  const [idAeronaveIda, setIdAeronaveIda] = useState ('');
  const [vooIda, setVooIda] = useState ('');
  const [logoIda, setLogoIda] = useState ('');
  const [nomeCiaIda, setNomeCiaIda] = useState ('');
  const [iataIda, setIataIda] = useState ('');
  const [iataDestinoIda, setIataDestinoIda] = useState ('');
  const [horaSaidaIda, setHoraSaidaIda] = useState ('');
  const [horaChegadaIda, setHoraChegadaIda] = useState ('');

  const [volta, setVolta] = useState ('');
  const [idRotaVolta, setIdRotaVolta] = useState ('');
  const [vooVolta, setVooVolta] = useState ('');
  const [logoVolta, setLogoVolta] = useState ('');
  const [nomeCiaVolta, setNomeCiaVolta] = useState ('');
  const [iataVolta, setIataVolta] = useState ('');
  const [iataDestinoVolta, setIataDestinoVolta] = useState ('');
  const [horaSaidaVolta, setHoraSaidaVolta] = useState ('');
  const [horaChegadaVolta, setHoraChegadaVolta] = useState ('');

  const [primeiraclasseNorma, setPrimeiraclasseNorma] = useState("");
  const [premiumNorma, setPremiumNorma] = useState("");
  const [executivaNorma, setExecutivaNorma] = useState("");
  const [economicaNorma, setEconomicaNorma] = useState("");

  


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
    setLoading(true);
    var query = "SELECT vpcharter_fretamento.primeiraclasse_frete, vpcharter_fretamento.premium_frete, vpcharter_fretamento.executiva_frete, vpcharter_fretamento.economica_frete, vpcharter_fretamento.id as id_fretamento, vpcharter_fretamento.data_frete, c1.nome as r1cia, c1.logo as r1logo, r1.voo as r1voo, r1.origem as r1origem, r1.saida as r1saida, r1.destino as r1destino, r1.chegada as r1chegada, vpcharter_fretamento.rota_ida, vpcharter_fretamento.rota_volta, vpcharter_fretamento.date_volta, c2.nome as r2cia, c2.logo as r2logo, r2.voo as r2voo, r2.origem as r2origem, r2.saida as r2saida, r2.destino as r2destino, r2.chegada as r2chegada, vpcharter_fretamento.contratante, vpcharter_fretamento.cancelamento,  vpcharter_contratante.razaosocial FROM `vpcharter_fretamento` INNER JOIN `vpcharter_contratante` ON vpcharter_fretamento.contratante = vpcharter_contratante.id INNER JOIN `vpcharter_rotas` r1 ON r1.id = vpcharter_fretamento.rota_ida INNER JOIN `vpcharter_frota` f1 ON f1.id = r1.aeronave INNER JOIN `vpcharter_companhia` c1 ON c1.id = f1.companhia INNER JOIN `vpcharter_rotas` r2 ON r2.id = vpcharter_fretamento.rota_volta INNER JOIN `vpcharter_frota` f2 ON f2.id = r2.aeronave INNER JOIN `vpcharter_companhia` c2 ON c2.id = f2.companhia WHERE vpcharter_fretamento.id = '"+id+"' LIMIT 1 ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataIda(response.data[0]['data_frete'])
        setDataVolta(response.data[0]['date_volta'])
        setCancelamento(response.data[0]['cancelamento'])
        setPrimeiraclasseNorma(response.data[0]['primeiraclasse_frete'])
        setPremiumNorma(response.data[0]['premium_frete'])
        setExecutivaNorma(response.data[0]['executiva_frete'])
        setEconomicaNorma(response.data[0]['economica_frete'])
        setDataIda(response.data[0]['data_frete'])
        setIda(response.data[0]['rota_ida'])
        setIdRotaIda(response.data[0]['rota_ida']);
        setVooIda(response.data[0]['r1voo']);
        setLogoIda(response.data[0]['r1logo']);
        setNomeCiaIda(response.data[0]['r1cia']);
        setIataIda(response.data[0]['r1origem']);
        setHoraSaidaIda(response.data[0]['r1saida'])
        setIataDestinoIda(response.data[0]['r1destino']);
        setHoraChegadaIda(response.data[0]['r1chegada']);
        setVolta(response.data[0]['rota_volta'])
        setIdRotaVolta(response.data[0]['rota_volta']);
        setVooVolta(response.data[0]['r2voo']);
        setLogoVolta(response.data[0]['r2logo']);
        setNomeCiaVolta(response.data[0]['r2cia']);
        setIataVolta(response.data[0]['r2origem']);
        setHoraSaidaVolta(response.data[0]['r2saida'])
        setIataDestinoVolta(response.data[0]['r2destino']);
        setHoraChegadaVolta(response.data[0]['r2chegada']);
        setContratante(response.data[0]['contratante'])

        /*
        setDataFretamento(response.data[0]['data_frete'])
        setValorMulta(parseFloat(response.data[0]['multa']))
        setDataIda(response.data[0]['data_frete'])
        setDataVolta(response.data[0]['date_volta'])
        setIdRotaIda(response.data[0]['rota_ida'])
        setIdRotaVolta(response.data[0]['rota_volta'])
        */

      } 
    })
    .catch(error=> console.log(error))




    var query = "SELECT * FROM `vpcharter_aeroportos` order by `uf` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAeroportoData(response.data)
      } 
    })
    .catch(error=> alert(error))



    var query = "SELECT `vpcharter_rotas`.`id` as id_rota, `vpcharter_companhia`.`nome`, `vpcharter_companhia`.`logo`, vpcharter_fabricante.aeronave, `vpcharter_rotas`.`origem`, `vpcharter_rotas`.`destino`, `vpcharter_rotas`.`saida`, `vpcharter_rotas`.`chegada`, `vpcharter_rotas`.`voo` FROM `vpcharter_rotas` INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBaseRotas(response.data)
      }
    })
    .catch(error=> alert(error))



    var query = "SELECT `vpcharter_rotas`.`id` as id_rota, `vpcharter_companhia`.`nome` as nomeCia, `vpcharter_companhia`.`logo`, `vpcharter_fabricante`.aeronave, `vpcharter_frota`.`id` as idAeronave, `vpcharter_rotas`.`origem`, `vpcharter_aeroportos`.`nome`, `vpcharter_aeroportos`.`cidade`, `vpcharter_aeroportos`.`uf`, `vpcharter_rotas`.`destino`, `vpcharter_rotas`.`saida`, `vpcharter_rotas`.`duracao`, `vpcharter_rotas`.`chegada`, `vpcharter_rotas`.`voo` FROM `vpcharter_rotas` INNER JOIN `vpcharter_frota` ON vpcharter_frota.id = vpcharter_rotas.aeronave INNER JOIN `vpcharter_companhia` ON vpcharter_companhia.id = vpcharter_frota.companhia INNER JOIN `vpcharter_fabricante` ON vpcharter_fabricante.id = vpcharter_frota.fabricante INNER JOIN `vpcharter_aeroportos` ON vpcharter_aeroportos.iata = vpcharter_rotas.origem";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBaseRotasOrigem(response.data)

        setDataFilterBaseRotasOrigem(response.data)
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_contratante` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setContratanteData(response.data)
        setLoading(false);

      } 
    })
    .catch(error=> alert(error))


  }, [])

  function carregaPagina() {
    setLoading(true);

    setAeroportoOrigem('')
    setAeroportoDestino('')
    setDuracao('')
    setHorarioSaida('')
    setNumeroVoo('')
    setRota('')
    var ttPrimeiraClasse = 0;
    var ttPremium = 0;
    var ttExecutiva = 0;
    var ttEconomica = 0;

    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_frota.fabricante, `vpcharter_frota`.`id` as idAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_tarifas.primeiraclasse, vpcharter_tarifas.premium, vpcharter_tarifas.executiva, vpcharter_tarifas.economica, vpcharter_rotas.voo, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_tarifas.primeiraclasse_chd, vpcharter_tarifas.premium_chd, vpcharter_tarifas.executiva_chd, vpcharter_tarifas.economica_chd FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id INNER JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave LEFT JOIN `vpcharter_tarifas` ON vpcharter_rotas.id = vpcharter_tarifas.rota WHERE vpcharter_rotas.id = '"+id+"' LIMIT 1 ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)

        if (response.data[0]['primeiraclasse']) { setPrimeiraClasse(parseFloat(response.data[0]['primeiraclasse'])) }
        if (response.data[0]['premium']) { setPremium(parseFloat(response.data[0]['premium'])) }
        if (response.data[0]['executiva']) { setExecutiva(parseFloat(response.data[0]['executiva'])) }
        if (response.data[0]['economica']) { setEconomica(parseFloat(response.data[0]['economica'])) }


        if (response.data[0]['id_aeronave']) { 
          var aeroId = response.data[0]['id_aeronave'];

            var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'primeiraclasse'";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) { 
                var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'primeiraclasse'";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response2=> {
                  if (response2.data.length > 0) { 
                    var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
                    ttPrimeiraClasse = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
                    setTtPrimeiraClasse(ttPrimeiraClasse)
                  } 
                })
                .catch(error=> alert(error))
              } 
            })
            .catch(error=> alert(error))

            var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'premium'";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) { 
                var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'premium'";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response2=> {
                  if (response2.data.length > 0) { 
                    var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
                    ttPremium = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
                    setTtPremium(ttPremium)
                  } 
                })
                .catch(error=> alert(error))
              } 
            })
            .catch(error=> alert(error))


            var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'executiva'";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) { 
                var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'executiva'";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response2=> {
                  if (response2.data.length > 0) { 
                    var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
                    ttExecutiva = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
                    setTtExecutiva(ttExecutiva)
                  } 
                })
                .catch(error=> alert(error))
              } 
            })
            .catch(error=> alert(error))


            var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'economica'";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(endpoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) { 
                var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'economica'";
                var fData = new FormData();
                fData.append('query', query);
                axios.post(endpoint+'query.php', fData)
                .then(response2=> {
                  if (response2.data.length > 0) { 
                    var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
                    ttEconomica = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
                    setTtEconomica(ttEconomica)
                  } 
                })
                .catch(error=> alert(error))
              } 
            })
            .catch(error=> alert(error))
        

          setTimeout(function() {
            var valorTotal = 0;
            var totalClasses = 0;

            if (ttPrimeiraClasse) {
              valorTotal = parseFloat(valorTotal)  + parseFloat(primeiraClasse);
              totalClasses = totalClasses + 1;
            }
            if (ttPremium) {
              valorTotal = parseFloat(valorTotal) + parseFloat(premium);
              totalClasses = totalClasses + 1;
            }
            if (ttExecutiva) {
              valorTotal = parseFloat(valorTotal) + parseFloat(executiva);
              totalClasses = totalClasses + 1;
            }
            if (ttEconomica) {
              valorTotal = parseFloat(valorTotal) + parseFloat(economica);
              totalClasses = totalClasses + 1;
            }

            setQtdeClasses(totalClasses)

            setCustoMedio(valorTotal / totalClasses)
            setTotalAssentos(parseInt(ttPrimeiraClasse) + parseInt(ttPremium) + parseInt(ttExecutiva) + parseInt(ttEconomica));
            setLoading(false);
          }, 2000) 

        
        }


        if (response.data[0]['primeiraclasse_chd'] == '1') { document.getElementById("cb_primeiraclasse").checked = true; }
        if (response.data[0]['premium_chd'] == '1') { document.getElementById("cb_premium").checked = true; }
        if (response.data[0]['executiva_chd'] == '1') { document.getElementById("cb_executiva").checked = true; }
        if (response.data[0]['economica_chd'] == '1') { document.getElementById("cb_economica").checked = true; }
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
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
      } 
    })
    .catch(error=> alert(error))



    

    
  }

  function validaForm(e) {

    setLoading(true);
    e.preventDefault();
    var query = "UPDATE `vpcharter_fretamento` SET `contratante` = '"+contratante+"', `data_frete` = '"+dataIda+"', `date_volta` = '"+dataVolta+"', `cancelamento` = '"+cancelamento+"', `custo` = '0', `primeiraclasse_frete` = '"+primeiraclasseNorma+"', `premium_frete` = '"+premiumNorma+"', `executiva_frete` = '"+executivaNorma+"', `economica_frete` = '"+economicaNorma+"' WHERE `vpcharter_fretamento`.`id` = '"+id+"'; ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(Globals.endPoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAlert(true)
        setTypeAlert('alert-success')
        settitleAlert('Alterado com sucesso!')
        setTxtAlert(' ')
        setLoading(false);
        setTimeout(()=> setAlert(false),5000);
        setTimeout(()=> navigate('/aereo/tarifas/cadastrotarifa/'+id),5000);
      } 
    })
    .catch(error=> console.log(error))

  }

  function selectAeroporto (x) {
    for (var i = 0, len = aeroportoData.length; i < len; ++i) {
      if (aeroportoData[i]['iata'] == x) {
        //return aeroportoData[i]['uf']+' • '+x+' - '+aeroportoData[i]['nome']+' - '+aeroportoData[i]['cidade'];
        return aeroportoData[i]['nome'] + ' / ' + aeroportoData[i]['uf'];
      }
    }
  }

  function selectCidadeAeroporto (x) {
    for (var i = 0, len = aeroportoData.length; i < len; ++i) {
      if (aeroportoData[i]['iata'] == x) {
        return aeroportoData[i]['cidade'];
      }
    }
  }



  function calculaMedia (cl1, cl2, cl3, cl4, qt) {
    var tt = 0;
    if (ttPrimeiraClasse) { tt = parseFloat(tt) + parseFloat(cl1); }
    if (ttPremium) { tt = parseFloat(tt) + parseFloat(cl2); }
    if (ttExecutiva) { tt = parseFloat(tt) + parseFloat(cl3); }
    if (ttEconomica) { tt = parseFloat(tt) + parseFloat(cl4); }
    tt = tt / qt;
    //tt = tt / totalAssentos;
    tt = tt.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return tt;
  }

  function formatTime (x) {
    return x.substring(0, 5) + 'h';
  }

  function filtraIda(e) {
    setIdRotaIda('')
    setIda(e)
    var result = [];
    for (var i = 0; i < dataBaseRotasOrigem.length; i++) {
      if ( dataBaseRotasOrigem[i]['id_rota'].match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['origem'].match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['cidade'].toUpperCase().match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['uf'].match(e.toUpperCase().trim()) ) {
        result.push(dataBaseRotasOrigem[i]);
      }
    }
    setDataFilterBaseRotasOrigem(result)
  }
  function filtraVolta(e) {
    setIdRotaVolta('')
    setVolta(e)
    var result = [];
    for (var i = 0; i < dataBaseRotasOrigem.length; i++) {
      if ( dataBaseRotasOrigem[i]['id_rota'].match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['origem'].match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['cidade'].toUpperCase().match(e.toUpperCase().trim()) || dataBaseRotasOrigem[i]['uf'].match(e.toUpperCase().trim()) ) {
        result.push(dataBaseRotasOrigem[i]);
      }
    }
    setDataFilterBaseRotasOrigem(result)
  }


  function countAssentos(aeroId, id_rota) {

    setLoading(true);

    var ttPrimeiraClasse = 0;
    var ttPremium = 0;
    var ttExecutiva = 0;
    var ttEconomica = 0;

    var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'primeiraclasse'";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) { 
        var totalColunasPC = response.data[0]['total_colunas'];
        var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'primeiraclasse'";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response2=> {
          if (response2.data.length > 0) { 
            var totalFileiraPC = response2.data[0]['total_fileiras'];
            var tt = parseInt(totalFileiraPC) - parseInt(1);
            ttPrimeiraClasse = parseInt(tt) * parseInt(totalColunasPC)
            setTtPrimeiraClasse(ttPrimeiraClasse)
          } 
        })
        .catch(error=> console.log(error))
      } 
    })
    .catch(error=> console.log(error))



    var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'premium'";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) { 
        var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'premium'";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response2=> {
          if (response2.data.length > 0) { 
            var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
            ttPremium = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
            setTtPremium(ttPremium)
          } 
        })
        .catch(error=> console.log(error))
      } 
    })
    .catch(error=> console.log(error))


    var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'executiva'";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) { 
        var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'executiva'";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response2=> {
          if (response2.data.length > 0) { 
            var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
            ttExecutiva = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
            setTtExecutiva(ttExecutiva)
          } 
        })
        .catch(error=> console.log(error))
      } 
    })
    .catch(error=> console.log(error))


    var query = "SELECT COUNT(*) AS total_colunas FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `coluna` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'economica'";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) { 
        var query = "SELECT COUNT(*) AS total_fileiras FROM `vpcharter_categoria_assentos` WHERE `aeronave` = '"+aeroId+"' AND `fileira` IS NOT NULL AND `tipo` IS NULL AND `categoria` = 'economica'";
        var fData = new FormData();
        fData.append('query', query);
        axios.post(endpoint+'query.php', fData)
        .then(response2=> {
          if (response2.data.length > 0) { 
            var tt = parseInt(response2.data[0]['total_fileiras']) - parseInt(1);
            ttEconomica = parseInt(tt) * parseInt(response.data[0]['total_colunas'])
            setTtEconomica(ttEconomica)
          } 
        })
        .catch(error=> console.log(error))
      } 
    })
    .catch(error=> console.log(error))


    setTimeout(function() {
      var valorTotal = 0;
      var totalClasses = 0;

      if (ttPrimeiraClasse) {
        valorTotal = parseFloat(valorTotal)  + parseFloat(primeiraClasse);
        totalClasses = totalClasses + 1;
      }
      if (ttPremium) {
        valorTotal = parseFloat(valorTotal) + parseFloat(premium);
        totalClasses = totalClasses + 1;
      }
      if (ttExecutiva) {
        valorTotal = parseFloat(valorTotal) + parseFloat(executiva);
        totalClasses = totalClasses + 1;
      }
      if (ttEconomica) {
        valorTotal = parseFloat(valorTotal) + parseFloat(economica);
        totalClasses = totalClasses + 1;
      }

      setQtdeClasses(totalClasses)
      setCustoMedio(valorTotal / totalClasses)
      setTotalAssentos(parseInt(ttPrimeiraClasse) + parseInt(ttPremium) + parseInt(ttExecutiva) + parseInt(ttEconomica));
      setLoading(false);
    }, 2000) 





    /*
    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id as id_aeronave, vpcharter_rotas.id as id_rota, vpcharter_frota.fabricante, `vpcharter_frota`.`id` as idAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_rotas.origem, vpcharter_rotas.destino, vpcharter_tarifas.primeiraclasse, vpcharter_tarifas.premium, vpcharter_tarifas.executiva, vpcharter_tarifas.economica, vpcharter_rotas.voo, vpcharter_rotas.duracao, vpcharter_rotas.saida, vpcharter_tarifas.primeiraclasse_chd, vpcharter_tarifas.premium_chd, vpcharter_tarifas.executiva_chd, vpcharter_tarifas.economica_chd FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id INNER JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave LEFT JOIN `vpcharter_tarifas` ON vpcharter_rotas.id = vpcharter_tarifas.rota WHERE vpcharter_rotas.id = '"+id_rota+"' LIMIT 1 ";
    console.log(query)
    
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)

        if (response.data[0]['primeiraclasse']) { setPrimeiraClasse(parseFloat(response.data[0]['primeiraclasse'])) }
        if (response.data[0]['premium']) { setPremium(parseFloat(response.data[0]['premium'])) }
        if (response.data[0]['executiva']) { setExecutiva(parseFloat(response.data[0]['executiva'])) }
        if (response.data[0]['economica']) { setEconomica(parseFloat(response.data[0]['economica'])) }

      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))
    */

  }

  function selectRotaIda(id_rota, idAeronave, voo, logo, nomeCia, iataIda, horaSaida, iataDestino, horaChegada) {
    setIda(id_rota)
    setIdAeronaveIda(idAeronave)
    setIdRotaIda(id_rota);
    setVooIda(voo);
    setLogoIda(logo);
    setNomeCiaIda(nomeCia);
    setIataIda(iataIda);
    setHoraSaidaIda(horaSaida)
    setIataDestinoIda(iataDestino);
    setHoraChegadaIda(horaChegada);
    countAssentos(idAeronave, id_rota)
  }
  function selectRotaVolta(id_rota, voo, logo, nomeCia, iataVolta, horaSaVolta, iataDestino, horaChegada) {
    setVolta(id_rota)
    setIdRotaVolta(id_rota);
    setVooVolta(voo);
    setLogoVolta(logo);
    setNomeCiaVolta(nomeCia);
    setIataVolta(iataVolta);
    setHoraSaidaVolta(horaSaVolta)
    setIataDestinoVolta(iataDestino);
    setHoraChegadaVolta(horaChegada);
  }

  function alteraRotaIda() {
    setTotalAssentos('')
    setIda('')
    setIdAeronaveIda('')
    setIdRotaIda('');
    setVooIda('');
    setLogoIda('');
    setNomeCiaIda('');
    setIataIda('');
    setHoraSaidaIda('')
    setIataDestinoIda('');
    setHoraChegadaIda('');
    document.getElementById("inputIda").focus();
  }
  function alteraRotaVolta() {
    setVolta('')
    setIdRotaVolta('');
    setVooVolta('');
    setLogoVolta('');
    setNomeCiaVolta('');
    setIataVolta('');
    setHoraSaidaVolta('')
    setIataDestinoVolta('');
    setHoraChegadaVolta('');
    document.getElementById("inputVolta").focus();
  }

  function newRota() {
    navigate('/aereo/frota/');
  }

  function validaFormModal() {
    var multa = document.getElementById("r_multa").value.replace("R$", "").replace(".", "").replace(",", ".").replace(" ", ".");
    multa = multa.trim();
    var query = "UPDATE `vpcharter_fretamento` SET `multa` = '"+multa+"' WHERE `vpcharter_fretamento`.`id` = "+id+" ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(Globals.endPoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAlert(true)
        setTypeAlert('alert-success')
        settitleAlert('Alterado com sucesso!')
        setTxtAlert('Saída alterada!')
        //carregaPagina()
        setTimeout(()=> setAlert(false),5000);
        setTimeout(()=> navigate('/saidas'),5000);
      } else {
        setAlert(true)
        setTypeAlert('alert-danger')
        settitleAlert('Erro na Gravação!')
        setTxtAlert('')
        setTimeout(()=> setAlert(false),5000);
      }
    })
    .catch(error=> alert(error))

  }


  return (
    <>

 

    {loading && <LoadingAnimation />}

    <div className={alert ? "alert "+typeAlert : 'hide'} role="alert">
      <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
      {txtAlert}
    </div>


    <div className={openModal ? 'bg_loading' : 'hide'} >
      <div className='globalModal modalTrash'>
        <AiOutlineClose className='closeModalTrash' onClick={()=>setOpenModal(false)} />
        <div className='d-flex'>
          <BiTrash className='display-1' />
          <h2><b>Confirmar<br />Cancelamento</b></h2>
        </div>
        
        <div className='row'>
          <div className='col-12'>
            <label>Valor da Multa</label>
            <IntlCurrencyInput  id="r_multa" currency="BRL" config={currencyConfig} className="currency" value={valorMulta} />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <button type='button' className='btnTrash btnTrashModal' onClick={()=>validaFormModal()}>
              <span ><BsCheckLg /> Salvar</span>
            </button>
          </div>
        </div>

        

      </div>
    </div>

    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        
        <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/saidas" relative="path">Saídas</Link>&nbsp; / Edita Saída</div>

          <div className="row">
            <div className="col-12">
              <h1>Edita Saída</h1>
            </div>
          </div>

          <div className='contentAll'>

            <form onSubmit={(e)=> validaForm(e)}>
              <div className='row '>

                <div className='col-6 rotaGroup'>

                  <div className='titleRota'><IoAirplaneOutline /> Rota de Ida</div>
                  <div className='col-12'>
                    <label className='labelCustom'>Data</label>
                    <input type='date' value={dataIda} onChange={(e) => setDataIda(e.target.value)} required />
                  </div>
                  <div className='col-12 colSelect'>
                    <label className='labelCustom'>Local</label>
                    <input 
                      type='text' 
                      value={ida} 
                      onChange={(e) => filtraIda(e.target.value)} 
                      placeholder='Selecione por Rota, IATA, Cidade ou UF de Origem'
                      className={idRotaIda?'hide':''}
                      id="inputIda"
                      required 
                    />
                    <HiOutlineMagnifyingGlass className={idRotaIda?'hide':'iconSearch'}  />
                    <div className={ida.trim().length > 0 && !idRotaIda ? 'selectCustom':'hide'}>
                      <table className='tableSelectCustom'>
                        <thead className={dataFilterBaseRotasOrigem.length > 0 ? 'hide' : ''}>
                          <tr onClick={()=>newRota()}>
                            <td className='p-3'>
                              <p><b>Rota não encontrada!</b></p>
                              <p className='pink-salmon'>❯ &nbsp;&nbsp;Cadastre Nova Rota</p>
                            </td>
                          </tr>
                        </thead>
                        {dataFilterBaseRotasOrigem.map((data, index) => (
                          <tbody key={index}>
                            <tr className='lineSelectCustom' onClick={()=>selectRotaIda(data.id_rota, data.idAeronave, data.voo, data.logo, data.nomeCia, data.origem, data.saida, data.destino, data.chegada)}>
                              <td className='hideMobile'>
                              <img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nomeCia}<br />
                                  <small className='travel_blue'>Rota:</small> <b>{data.id_rota}</b><br />
                                  <small className='travel_blue'>Vôo :</small> <b>{data.voo}</b>
                              </td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{data.origem}</b> - <small>{data.nome} / {data.uf}</small> 
                                <h5 className='travel_blue'>{formatTime(data.saida)} <b>{data.cidade}</b></h5>
                              </td>
                              <td className='travel_blue text-align'><BsArrowRight className='h3' /></td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{data.destino}</b> - <small>{selectAeroporto(data.destino)}</small> 
                                <h5 className='travel_blue'>{formatTime(data.chegada)} <b>{selectCidadeAeroporto(data.destino)}</b></h5>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                    <div onClick={()=>alteraRotaIda()} className={idRotaIda?'row rowRotaSelect':'hide'}>

                      <div className='col-12 disableCol'>
                        <table className='tableSelectCustom'>
                          <tbody >
                            <tr className='lineSelectCustom'>
                              <td className=''>
                                  <img className={logoIda ? 'imgCia hideMobile' : 'hide'} src={logoIda} /> {logoIda ? '' : nomeCiaIda}<br />
                                  <small className='travel_blue hideMobile'>Rota:</small> <b className='hideMobile'>{idRotaIda}</b><br />
                                  <small className='travel_blue hideMobile'>Vôo :</small> <b className='hideMobile'>{vooIda}</b>
                              </td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{iataIda}</b> - <small>{selectAeroporto(iataIda)}</small> 
                                <h5 className='travel_blue'>{formatTime(horaSaidaIda)} <b>{selectCidadeAeroporto(iataIda)}</b></h5>
                              </td>
                              <td className='travel_blue text-align'><BsArrowRight className='h3' /></td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{iataDestinoIda}</b> - <small>{selectAeroporto(iataDestinoIda)}</small> 
                                <h5 className='travel_blue'>{formatTime(horaChegadaIda)} <b>{selectCidadeAeroporto(iataDestinoIda)}</b></h5>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>

                </div>


                <div className='col-6 rotaGroup'>

                  <div><IoAirplaneOutline className='flip' /> Rota de Volta</div>
                  <div className='col-12'>
                    <label className='labelCustom'>Data</label>
                    <input type='date' value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} required />
                  </div>
                  <div className='col-12 colSelect'>
                    <label className='labelCustom'>Local</label>
                    <input 
                      type='text' 
                      value={volta} 
                      onChange={(e) => filtraVolta(e.target.value)} 
                      placeholder='Selecione por Rota, IATA, Cidade ou UF de Origem'
                      className={idRotaVolta?'hide':''}
                      id="inputVolta"
                      required 
                    />
                    <HiOutlineMagnifyingGlass className={idRotaVolta?'hide':'iconSearch'}  />
                    <div className={volta.trim().length > 0 && !idRotaVolta ? 'selectCustom':'hide'}>
                      <table className='tableSelectCustom'>
                      <thead className={dataFilterBaseRotasOrigem.length > 0 ? 'hide' : ''}>
                          <tr onClick={()=>newRota()}>
                            <td className='p-3'>
                              <p><b>Rota não encontrada!</b></p>
                              <p className='pink-salmon'>❯ &nbsp;&nbsp;Cadastre Nova Rota</p>
                            </td>
                          </tr>
                        </thead>
                        {dataFilterBaseRotasOrigem.map((data, index) => (
                          <tbody key={index}>
                            <tr className='lineSelectCustom' onClick={()=>selectRotaVolta(data.id_rota, data.voo, data.logo, data.nomeCia, data.origem, data.saida, data.destino, data.chegada)}>
                              <td className='hideMobile'>
                              <img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nomeCia}<br />
                                  <small className='travel_blue'>Rota:</small> <b>{data.id_rota}</b><br />
                                  <small className='travel_blue'>Vôo :</small> <b>{data.voo}</b>
                              </td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{data.origem}</b> - <small>{data.nome} / {data.uf}</small> 
                                <h5 className='travel_blue'>{formatTime(data.saida)} <b>{data.cidade}</b></h5>
                              </td>
                              <td className='travel_blue text-align'><BsArrowRight className='h3' /></td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{data.destino}</b> - <small>{selectAeroporto(data.destino)}</small> 
                                <h5 className='travel_blue'>{formatTime(data.chegada)} <b>{selectCidadeAeroporto(data.destino)}</b></h5>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                    <div onClick={()=>alteraRotaVolta()} className={idRotaVolta?'row rowRotaSelect':'hide'}>

                      <div className='col-12 disableCol'>
                        <table className='tableSelectCustom'>
                          <tbody >
                            <tr className='lineSelectCustom'>
                              <td className=''>
                                  <img className={logoVolta ? 'imgCia hideMobile' : 'hide'} src={logoVolta} /> {logoVolta ? '' : nomeCiaVolta}<br />
                                  <small className='travel_blue hideMobile'>Rota:</small> <b className='hideMobile'>{idRotaVolta}</b><br />
                                  <small className='travel_blue hideMobile'>Vôo :</small> <b className='hideMobile'>{vooVolta}</b>
                              </td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{iataVolta}</b> - <small>{selectAeroporto(iataVolta)}</small> 
                                <h5 className='travel_blue'>{formatTime(horaSaidaVolta)} <b>{selectCidadeAeroporto(iataVolta)}</b></h5>
                              </td>
                              <td className='travel_blue text-align'><BsArrowRight className='h3' /></td>
                              <td className='tdCustom tdSelectCustom' >
                                <b className='travel_blue'>{iataDestinoVolta}</b> - <small>{selectAeroporto(iataDestinoVolta)}</small> 
                                <h5 className='travel_blue'>{formatTime(horaChegadaVolta)} <b>{selectCidadeAeroporto(iataDestinoVolta)}</b></h5>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                
                </div>

              </div>


              <div className='row'>



                <div className='col-6'>
                  <label>Cancelamento Gratuito até</label>
                  <input type='date' value={cancelamento} onChange={(e) => setCancelamento(e.target.value)} required />
                </div>
                

              {/*
                <div className='col-3'>
                  <label>Total de Assentos</label>
                  <div className='divDisablepq' id="totalAssentos">{totalAssentos}</div>
                </div>
                
                <div className='col-3'>
                  <label>Custo Médio por Assento</label>
                  <div className='divDisablepq'>{calculaMedia(primeiraClasse, premium, executiva, economica, qtdeClasses)} </div>
                </div>
                    */}

              </div>

              <div className='row'>
                <div className='col-12 mt-3'>
                  <label><b>Normas de Cancelamento</b></label>
                </div>
                <div className='col-6'>
                  <label>Primeira Classe</label>
                  <ContentEditable
                    className='editDiv'
                    tagName="div"
                    html={primeiraclasseNorma}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text");
                      document.execCommand("insertText", false, text);
                    }}
                    onChange={(e) => {setPrimeiraclasseNorma(e.target.value);}}
                  />
                </div>

                <div className='col-6'>
                  <label>Premium</label>
                  <ContentEditable
                    className='editDiv'
                    tagName="div"
                    html={premiumNorma}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text");
                      document.execCommand("insertText", false, text);
                    }}
                    onChange={(e) => {setPremiumNorma(e.target.value);}}
                  />
                </div>

                <div className='col-6'>
                  <label>Executiva</label>
                  <ContentEditable
                    className='editDiv'
                    tagName="div"
                    html={executivaNorma}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text");
                      document.execCommand("insertText", false, text);
                    }}
                    onChange={(e) => {setExecutivaNorma(e.target.value);}}
                  />
                </div>

                <div className='col-6'>
                  <label>Econômica</label>
                  <ContentEditable
                    className='editDiv'
                    tagName="div"
                    html={economicaNorma}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text");
                      document.execCommand("insertText", false, text);
                    }}
                    onChange={(e) => {setEconomicaNorma(e.target.value);}}
                  />
                </div>
              </div>


              <div className='row'>

                <div className='col'></div>
                <div className='col-3' onClick={()=>setOpenModal(true)}>
                  <button type='button' className='btnTrash'>
                    <span ><BiTrash /> Cancelamento</span>
                  </button>
                </div>

                <div className='col-3'>
                  <button type='submit'>
                    <span>✎ Alterar</span>
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
  
export default EditaSaidas