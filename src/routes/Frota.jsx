import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiPlusCircleFill } from "react-icons/pi";
import { MdOutlineHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { FaMagnifyingGlass } from "react-icons/fa6";


function Frota() {

  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [dataBase, setDataBase] = useState ([]); 
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
  const [newData, setNewData] = useState (true);;
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 


  useEffect(() => {
    listaUsers()
    listaTotal()
  }, [])


  function listaUsers() {
    setLoading(true);
    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_frota.fabricacao, vpcharter_frota.ultimaRevisao, vpcharter_frota.angarPrincipal, vpcharter_frota.registro, vpcharter_rotas.origem, vpcharter_rotas.destino FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id LEFT JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave GROUP BY vpcharter_frota.id";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setDataBase(response.data)
        seListData(response.data)
        setListTotal(response.data.length)
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
    navigate('/aereo/frota/editaaeronave/'+x);
  }

  function newId() {
    navigate('/aereo/frota/cadastroaeronave');
  }
  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    var query = "SELECT vpcharter_fabricante.aeronave, vpcharter_frota.id, vpcharter_frota.fabricante, vpcharter_frota.nomeAeronave, vpcharter_companhia.nome, vpcharter_companhia.logo, vpcharter_frota.fabricacao, vpcharter_frota.ultimaRevisao, vpcharter_frota.angarPrincipal, vpcharter_frota.registro, vpcharter_rotas.origem, vpcharter_rotas.destino FROM `vpcharter_frota` INNER JOIN vpcharter_companhia ON vpcharter_frota.companhia = vpcharter_companhia.id INNER JOIN `vpcharter_fabricante` ON vpcharter_frota.`fabricante` = vpcharter_fabricante.id LEFT JOIN `vpcharter_rotas` ON vpcharter_frota.id = vpcharter_rotas.aeronave WHERE vpcharter_companhia.nome LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.nomeAeronave LIKE '%"+buscaFiltro+"%' OR vpcharter_frota.fabricante LIKE '%"+buscaFiltro+"%' OR vpcharter_fabricante.aeronave LIKE '%"+buscaFiltro+"%' GROUP BY vpcharter_frota.id";

    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setDataBase(response.data)
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
      listaUsers()
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
          <div className='breadCrumb'><Link to="/home" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' />  Home</Link>&nbsp;/&nbsp;<Link to="/aereo" relative="path">Aéreo</Link>&nbsp;/&nbsp;Frota</div>

          <div className='row lineButtons mt-3 mb-2'>
            <div className="col "><h1>Frota</h1></div>
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
                <button type="button" className="btn btnNew" onClick={()=>newId()}>Novo <PiPlusCircleFill /></button>
              </div>
            </div>
          </div>

          <div className='contentAll'>

              <div className='row'>
                <div className='col-12 table_list'> 
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <th scope="col">Aeronave</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Companhia</th>
                        <th scope="col">Fabricação</th>
                        <th scope="col">Última Revisão</th>
                        <th scope="col">Angar Principal</th>
                        <th scope="col">Registo</th>
                        <th scope="col" className='text-center'>Assentos</th>
                        <th scope="col" className='text-center'>Rotas</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataBase.map((data, index) => (
                      <tr key={index}>
                        <td onClick={() => editaaeronave(data.id)}>{data.aeronave}</td>
                        <td onClick={() => editaaeronave(data.id)}>{data.nomeAeronave}</td>
                        <td onClick={() => editaaeronave(data.id)}><img className={data.logo ? 'imgCia' : 'hide'} src={data.logo} /> {data.logo ? '' : data.nome}</td>
                        <td onClick={() => editaaeronave(data.id)}>{formatMesAno(data.fabricacao)}</td>
                        <td onClick={() => editaaeronave(data.id)}>{formatDate(data.ultimaRevisao)}</td>
                        <td onClick={() => editaaeronave(data.id)}>{data.angarPrincipal}</td>
                        <td onClick={() => editaaeronave(data.id)}>{data.registro}</td>
                        <td className='text-center'><Link to={"/aereo/frota/mapaassentos/"+data.id}><button>Assentos</button></Link></td>
                        <td className='text-center'><Link to={"/aereo/frota/rotas/"+data.id}><button><span className={data.origem ? '' : 'hide'}>Rotas</span><span className={data.origem ? 'hide' : ''}>• • •</span></button></Link></td>
                        <td onClick={() => editaaeronave(data.id)}><div className='btnAddValor' title='Alterar Valor'>✎</div></td>
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
  
export default Frota