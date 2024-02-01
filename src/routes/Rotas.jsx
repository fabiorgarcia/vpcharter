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
import { MdOutlineHome } from "react-icons/md";
import LoadingAnimation from "../components/LoadingAnimation";
import { PiPlusCircleFill } from "react-icons/pi";



function Rotas() {

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
  const [horarioChegada, setHorarioChegada] = useState ('');
  const [numeroVoo, setNumeroVoo] = useState ('');
  

  useEffect(() => {
    listaAeronave()
  }, [])


  function listaAeronave() {
    setLoading(true);

    setAeroportoOrigem('')
    setAeroportoDestino('')
    setDuracao('')
    setHorarioSaida('')
    setHorarioChegada('')
    setNumeroVoo('')
    setRota('')

    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_frota.fabricacao, vpcharter_frota.ultimaRevisao, vpcharter_frota.angarPrincipal, vpcharter_frota.registro, vpcharter_frota.primeiraClasse, vpcharter_frota.classeExecutiva, vpcharter_frota.classeEconomica FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id WHERE vpcharter_frota.id = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)        
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_rotas` WHERE `aeronave` = '"+id+"' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      setDataRotas(response.data)
    })
    .catch(error=> alert(error))


    var query = "SELECT * FROM `vpcharter_aeroportos` order by `uf` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setAeroportoData(response.data)
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))



    setLoading(false);
  }

  function editaRota(rota, origem, destino, duracao, saida, voo, chegada) {
    window.scrollTo(0,0);
    setLoading(true);
    setRota(rota)
    setAeroportoOrigem(origem)
    setAeroportoDestino(destino)
    setDuracao(duracao)
    setHorarioSaida(saida)
    setHorarioChegada(chegada)
    setNumeroVoo(voo)
    setTimeout(()=> setLoading(false),1000);
  }

  function novaRota() {
    window.scrollTo(0,0);
    setLoading(true);
    setRota('')
    setAeroportoOrigem('')
    setAeroportoDestino('')
    setDuracao('')
    setHorarioSaida('')
    setHorarioChegada('')
    setNumeroVoo('')
    setTimeout(()=> setLoading(false),1000);
  }

  function validaForm(e) {
    e.preventDefault();

    if (rota) {

      var query = "UPDATE `vpcharter_rotas` SET `origem` = '"+aeroportoOrigem+"', `destino` = '"+aeroportoDestino+"', `duracao` = '"+duracao+"', `saida` = '"+horarioSaida+"', `chegada` = '"+horarioChegada+"', `voo` = '"+numeroVoo+"' WHERE `vpcharter_rotas`.`id` = "+rota+";"
      var fData = new FormData();
      fData.append('query', query);
      axios.post(Globals.endPoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          setAlert(true)
          setTypeAlert('alert-success')
          setTxtAlert('Alterado com sucesso!')
          setTimeout(()=> setAlert(false),5000);

          listaAeronave()

        } else {
          setAlert(true)
          setTypeAlert('alert-danger')
          setTxtAlert('Erro na Gravação!')
          setTimeout(()=> setAlert(false),5000);
        }
      })
      .catch(error=> alert(error))

    } else {
      var query = "INSERT INTO `vpcharter_rotas` (`id`, `aeronave`, `origem`, `destino`, `duracao`, `saida`, `chegada`, `voo`) VALUES (NULL, '"+id+"', '"+aeroportoOrigem+"', '"+aeroportoDestino+"', '"+duracao+"', '"+horarioSaida+"', '"+horarioChegada+"', '"+numeroVoo+"');";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(Globals.endPoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          console.log(response.data)
          listaAeronave()

        } else {
          setAlert(true)
          setTypeAlert('alert-danger')
          setTxtAlert('Erro na Gravação!')
          setTimeout(()=> setAlert(false),5000);
        }
      })
      .catch(error=> alert(error))
    }
  }

  function formatAeroporto (x) {
    for (var i = 0, len = aeroportoData.length; i < len; ++i) {
      if (aeroportoData[i]['iata'] == x) {
        return x+' - '+aeroportoData[i]['nome']+' - '+aeroportoData[i]['cidade']+' / '+aeroportoData[i]['uf'];
        break
      }
    }
  }

  function formatTime (x) {
    return x.substring(0, 5) + 'h';
  }


  return (
    <>
    {loading && <LoadingAnimation />}

    <div className={alert ? "alert "+typeAlert : 'hide'} role="alert">
      <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
      {txtAlert}
    </div>

    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;<Link to="/aereo/frota" relative="path">Frota</Link>&nbsp;/&nbsp;<Link to={"/aereo/frota/editaaeronave/"+id} relative="path">Aeronave</Link>&nbsp;/&nbsp;<Link to={"/aereo/frota/mapaassentos/"+id} relative="path">Mapa de Assentos</Link>&nbsp;/&nbsp;Rotas</div>

          <div className="lineButtons">
            <div className="">
              <h1>Rotas</h1>
            </div>
          </div>

          <div className='contentAll'>

          <div className='row mb-3'>
            <div className='col-12'>
              {dataBase.map((data, index) => (
                <div key={index} className='row tblRotas'>
                  <div className='col-2'>
                    <label>Id</label>
                    <div className='divDisable h2'><strong>{rota}</strong></div>
                  </div>
                  <div className='col-3'>
                    <label>Companhia</label>
                    <div className='divDisable h2'><img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nome}</div>
                  </div>
                  <div className='col'>
                    <label>Modelo</label>
                    <div className='divDisable h2'>{data.aeronave}</div>
                  </div>
                  
                  <div className='col-3'>
                    <label>Aeronave</label>
                    <div className='divDisable h2'>{data.nomeAeronave}</div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

            <form onSubmit={(e)=> validaForm(e)}>
              <div className='row'>

                <div className='col-8'>
                  <label>Origem</label>
                  <select name="select" value={aeroportoOrigem} onChange={(e) => setAeroportoOrigem(e.target.value)} >
                    <option value=''></option>
                    {aeroportoData.map((data, index) => (
                      <option key={index} value={data.iata}>{data.iata} - {data.nome} - {data.cidade} / {data.uf}</option>
                    ))}
                  </select>
                </div>
                <div className='col-2'>
                  <label>Horário de Saída</label>
                  <input type='time' required value={horarioSaida} onChange={(e)=>setHorarioSaida(e.target.value)}  />
                </div>
                <div className='col-2'>
                  <label>Duração (Horas)</label>
                  <input type='time' required value={duracao} onChange={(e)=>setDuracao(e.target.value)} />
                </div>

                <div className='col-8'>
                  <label>Destino</label>
                  <select name="select" value={aeroportoDestino} onChange={(e) => setAeroportoDestino(e.target.value)} >
                    <option value=''></option>
                    {aeroportoData.map((data, index) => (
                      <option key={index} value={data.iata}>{data.iata} - {data.nome} - {data.cidade} / {data.uf}</option>
                    ))}
                  </select>
                </div>
                <div className='col-2'>
                  <label>Horário de Chegada</label>
                  <input type='time' required value={horarioChegada} onChange={(e)=>setHorarioChegada(e.target.value)}  />
                </div>
                
                
                
                
                <div className='col-2'>
                  <label>Nº Voo</label>
                  <input type='text' required value={numeroVoo} onChange={(e)=>setNumeroVoo(e.target.value)}  />
                </div>
                    

              </div>

              {/*
              <div className='row'>
                <div className='col-3'>
                  <label><b>CHEGADA ↽</b> Origem</label>
                  <select name="select" value={aeroportoOrigem} onChange={(e) => setAeroportoOrigem(e.target.value)} >
                    {aeroportoData.map((data, index) => (
                      <option key={index} value={data.iata}>{data.iata} - {data.nome} - {data.cidade} / {data.uf}</option>
                    ))}
                  </select>
                </div>
                <div className='col-2'>
                  <label>Horário de Saída</label>
                  <input type='time' required value={horarioSaida} onChange={(e)=>setHorarioSaida(e.target.value)}  />
                </div>
                <div className='col-3'>
                  <label>Destino</label>
                  <select name="select" value={aeroportoDestino} onChange={(e) => setAeroportoDestino(e.target.value)} >
                    {aeroportoData.map((data, index) => (
                      <option key={index} value={data.iata}>{data.iata} - {data.nome} - {data.cidade} / {data.uf}</option>
                    ))}
                  </select>
                </div>
                <div className='col-2'>
                  <label>Horário de Chegada</label>
                  <input type='time' required value={horarioChegada} onChange={(e)=>setHorarioChegada(e.target.value)}  />
                </div>
                <div className='col-2'>
                  <label>Número do Voo</label>
                  <input type='text' required value={numeroVoo} onChange={(e)=>setNumeroVoo(e.target.value)}  />
                </div>
              </div>
              */}


              <div className='row'>
                <div className='col'></div>
                <div className='col-2'>
                  <button type='submit'>
                    <span className={!rota ? '' : 'hide'}><BsCheckLg /> Salvar</span>
                    <span className={rota ? '' : 'hide'}><FiEdit /> Alterar</span>
                  </button>
                </div>
              </div>
            </form>

          </div>

          <div className='contentAll mt-3'>
            <div className='lineButtons'>
            <div className='col'><h5>Rotas da Aeronave</h5></div>
              <div className='btnTable'><button type="button" className="btn btnNew" onClick={()=>novaRota()}>Nova Rota <PiPlusCircleFill /></button></div>
            </div>
              
            <div className='row'>
              
              <div className='col-12 table_list p-3 '> 
                <table className='tblDefault'>
                  <thead>
                    <tr>
                      <th scope="col">Rota</th>
                      <th scope="col">Origem</th>
                      <th scope="col">Destino</th>
                      <th scope="col">Saída</th>
                      <th scope="col">Chegada</th>
                      <th scope="col">Duração</th>
                      <th scope="col">Voo</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataRotas.map((data, index) => (
                    <tr key={index} onClick={() => editaRota(data.id, data.origem, data.destino, data.duracao, data.saida, data.voo, data.chegada)} className={rota == data.id?'trSelect':''}>
                      <td>{data.id}</td>
                      <td>{formatAeroporto(data.origem)}</td>
                      <td>{formatAeroporto(data.destino)}</td>
                      <td>{formatTime(data.saida)}</td>
                      <td>{formatTime(data.chegada)}</td>
                      <td>{formatTime(data.duracao)}</td>
                      <td>{data.voo}</td>
                      <td><FiEdit className='pink-salmon' /></td>
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
  
export default Rotas