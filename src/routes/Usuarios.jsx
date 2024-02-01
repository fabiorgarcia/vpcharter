import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { LiaUserEditSolid } from "react-icons/lia";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { PiPlusCircleFill, PiUsers } from "react-icons/pi";
import LoadingAnimation from "../components/LoadingAnimation";
import { BsChevronLeft, BsChevronRight  } from "react-icons/bs";
import { MdOutlineHome } from "react-icons/md";


function Usuarios() {

  const [endpoint, setEndpoint] = useState (Globals.endPoint);
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [users, setUsers] = useState ([]); 
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [agenciaCliente, setAgenciaCliente] = useState ('');
  const [listAgenciaCliente, seListAgenciaCliente] = useState ([]); 

  const [dataTotal, setDataTotal] = useState (0);
  const [startQuery, setStartQuery] = useState (0);
  const [limitQuery, setLimitQuery] = useState (25);
  const [newStartQuery, setNewStartQuery] = useState (25);
  const [stepsQuery, setStepsQuery] = useState (1);
  const [orderby, setOrderby] = useState ('name');
  const [orderDirection, setOrderDirection] = useState ('ASC');
  
  

  useEffect(() => {
    listaUsers()
    listaTotal()
    listaAgenciaCliente()
  }, [])



  function listaAgenciaCliente() {
    var query = "SELECT * FROM `vpcharter_contratante` ORDER BY `vpcharter_contratante`.`razaosocial` ASC ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListAgenciaCliente(response.data)
        setLoading(false);
      }
    })
    .catch(error=> alert(error))
    
  }



  function listaUsers() {
    setLoading(true)
    var query = "SELECT * FROM `vpcharter_users` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(Globals.endPoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setUsers(response.data)
        setLoading(false)
      } 
    })
    .catch(error=> alert(error))
  }

  function listaTotal() {
    var newQuery = 'SELECT COUNT(*) AS total from vpcharter_users';
    setLoading(true);
    let fData = new FormData();
        fData.append('query', newQuery);
        axios.post(endpoint+'query.php', fData)
        .then(response=> {
            setLoading(false)
            setDataTotal(response.data[0].total)
        })
        .catch(error=> alert(error))
  }

  function formatNumber(x){
    const formatNumber = new Intl.NumberFormat('pt-BR')
    return formatNumber.format(x);
  }


  function changeStatus(e, idUser) {
    setLoading(true)
    setStatus(e);
    var query = "UPDATE `vpcharter_users` SET  `status` = '"+e+"' WHERE `vpcharter_users`.`id` = '"+idUser+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      listaUsers()
    })
    .catch(error=> alert(error))
  }

  function changeUserActive(e, idUser) {
    setLoading(true)
    setUserActive(e);
    var newUserActive = "0";
    if (e == "0") { newUserActive = "1" }
    var query = "UPDATE `vpcharter_users` SET  `userActive` = '"+newUserActive+"' WHERE `vpcharter_users`.`id` = '"+idUser+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      listaUsers()
    })
    .catch(error=> alert(error))
  }

  function changeAgenciaCliente(e, idUser) {
    setLoading(true)
    setAgenciaCliente(e);
    
    if (e == "0") { newStatus = "9" }
    var query = "UPDATE `vpcharter_users` SET  `agenciaCliente` = '"+e+"' WHERE `vpcharter_users`.`id` = '"+idUser+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      listaUsers()
    })
    .catch(error=> alert(error))
  
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
          <div className='breadCrumb'><Link to="/admin" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> Admin</Link>&nbsp;/&nbsp;Usuários</div>

          <div className="lineButtons">
            <div className="col">
              <h1>Usuários</h1>
            </div>
            <div className="btnTable" >
              {/*
              <select onChange={(e) => changeLimit(e.target.value)} className={dataTotal > 25 ? 'selectLimit' : 'hidden'}>
                  <option value="25">25</option>
                  {dataTotal > 50 ? <option value="50">50</option> : undefined}
                  {dataTotal > 100 ? <option value="100">100</option> : undefined}
                  {dataTotal > 250 ? <option value="250">250</option> : undefined}
                  {dataTotal > 500 ? <option value="500">500</option> : undefined}
              </select>
              <div className="tdtoal">{startQuery+1} - {newStartQuery}  de  {formatNumber(dataTotal)}</div>
              <button type="button" className="btn btn-light m-1" onClick={() => lessData()} disabled={startQuery==0 ? true : false}><BsChevronLeft /></button>
              <button type="button" className="btn btn-light m-1" onClick={() => moreData()} disabled={newStartQuery==dataTotal ? true : false}><BsChevronRight /></button>
              <button onClick={() => onTableChange()} type="button" className="btn btn-light m-1 nomob">{tdShort ? <RiExpandLeftRightFill title="Expandir" /> : <RiContractLeftRightFill title="Contrair" />}</button>*/}
            </div>
          </div>


          <div className='contentAll'>
              
              <div className='row'>
                <div  className='col-12 table_list'> 
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>Status</td>
                        <td>Empresa</td>
                        <td className='text-center'>Ativo</td>
                      </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.familyName}</td>
                        <td>{user.email}</td>
                        <td className='text-center'>                        
                          <select value={user.status} onChange={(e)=>changeStatus(e.target.value, user.id)} required >
                            <option value="">--</option>
                            <option value="0">Operacional</option>
                            <option value="1">Financeiro</option>
                            <option value="2">Produtos internos</option>
                            <option value="3">Comprador</option>
                            <option value="9">Gestão</option>
                            <option value="99">Administrador</option>
                          </select>
                        
                        
                        </td>
                        <td>

                          <select value={user.agenciaCliente} onChange={(e)=>changeAgenciaCliente(e.target.value, user.id)}  >
                            <option value=''>-</option>
                            {listAgenciaCliente.map((data, index) => (
                              <option key={index} value={data.id}>{data.razaosocial}</option>
                            ))}
                          </select>

                        {/*
                          <select value={user.status} onChange={(e)=>changeStatus(e.target.value, user.id)}  required >
                            <option value="0">Viagens Promo</option>
                          </select>
                            */}
                        </td>
                        <td className='text-center'><input type="checkbox" name="scales" value={user.userActive} checked={user.userActive == "0" ? true : false} onChange={(e)=>changeUserActive(e.target.value, user.id)} /></td>
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
  
export default Usuarios