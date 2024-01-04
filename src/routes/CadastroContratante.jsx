import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { LiaUserEditSolid } from "react-icons/lia";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { PiPlusCircleFill, PiCaretRightBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { GrClose } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdOutlineModeEdit, MdOutlineHome } from "react-icons/md";
import ReactInputMask from 'react-input-mask';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";


function CadastroContratante() {

  const [endpoint, setEndpoint] = useState ('http://frgarcia.com.br/vpcharter/');
  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [loading, setLoading] = useState (false);
  const [status, setStatus] = useState ('');
  const [userActive, setUserActive] = useState ('');
  const [openModal, setOpenModal] = useState (false);
  const [fabricante, setFabricante] = useState ('');
  const [fabricanteData, setFabricanteData] = useState ([]);
  const [tipo, setTipo] = useState ('');
  const [modelo, setModelo] = useState ('');
  const [aeronave, setAeronave] = useState (''); 
  const [contratante, seComtratante] = useState (''); 
  const [listData, seListData] = useState ([]); 
  const [listTotal, setListTotal] = useState ([]); 

  const [fabricacao, setFabricacao] = useState (''); 
  const [ultimaRevisao, setUltimaRevisao] = useState (''); 
  const [aeroporto, setAeroporto] = useState ('');
  const [aeroportoData, setAeroportoData] = useState ([]); 
  const [angarPrincipal, setAngarPrincipal] = useState ('');
  const [registro, setRegistro] = useState (''); 
  const [fabricanteModelo, setFabricanteModelo] = useState ('');
  const [idFabricanteModelo, setIdFabricanteModelo] = useState ('');
  const [typeForm, setTypeForm] = useState ('Insert');
  const [loadingModal, setLoadingModal] = useState (false);
  const [razaoSocial, setRazaoSocial] = useState ('');
  const [cnpj, setCnpj] = useState ('');
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState ('');
  const [cep, setCep] = useState ('');
  const [endereco, setEndereco] = useState ('');
  const [numero, setNumero] = useState ('');
  const [bairro, setBairro] = useState ('');
  const [complemento, setComplemento] = useState ('');
  const [uf, setUf] = useState ('');
  const [cidade, setCidade] = useState ('');
  const [responsavel, setResponsavel] = useState ('');
  const [email, setEmail] = useState ('');
  const [telefone, setTelefone] = useState ('');
  const [dataInicioAtividade, setDataInicioAtividade] = useState ('');
  const [situacaoCadastral, setSituacaoCadastral] = useState ('');
  const [qualificacaoResponsavel, setQualificacaoResponsavel] = useState ('');
  const [buscaFiltro, setBuscaFiltro] = useState ('');
  


  useEffect(() => {
    setLoading(true);
    var query = "SELECT * FROM `vpcharter_contratante` ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
        setListTotal(response.data.length)
      }
    })
    .catch(error=> alert(error))
    setLoading(false);
  }, [])



  function limpaForm() {
    setLoading(true);
    seComtratante("")
    setRazaoSocial("")
    setCnpj("")
    setInscricaoMunicipal("")
    setCep("")
    setEndereco("")
    setNumero("")
    setComplemento("")
    setUf("")
    setCidade("")
    setResponsavel("")
    setEmail("")
    setTelefone("")
    setBairro("")
    setDataInicioAtividade("")
    setSituacaoCadastral("")
    setQualificacaoResponsavel("")
    setTimeout(()=> setLoading(false),1000);
  }

  function validaForm(e) {
    setLoading(true)
    e.preventDefault();

    var val_cnpj = false;
    var val_email = false;
    var val_telefone = false;
    var numsStr = telefone.replace(/[^0-9]/g,'');

    if (numsStr.length >= 10) {
      val_telefone = true;
    }

    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@")+ 1, email.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
          val_email = true;
    }

    if (validarCNPJ(cnpj)) { val_cnpj = true; }
    
    if (!val_cnpj) {
      setTypeAlert('alert-danger')
      settitleAlert('CNPJ Inválido!')
      document.getElementById('f_cnpj').focus();
      setTimeout(()=> setTypeAlert(''),5000);
    } else if (!val_email) {
      setTypeAlert('alert-danger')
      settitleAlert('E-mail Inválido!')
      document.getElementById('f_email').focus();
      setTimeout(()=> setTypeAlert(''),5000);
    } else if (!val_telefone) {
      setTypeAlert('alert-danger')
      settitleAlert('Telefone Inválido!')
      document.getElementById('f_telefone').focus();
      setTimeout(()=> setTypeAlert(''),5000);
    } else {
    
      setTimeout(function() {
        if (contratante) {
          var query = "UPDATE `vpcharter_contratante` SET `razaosocial` = '"+razaoSocial+"', `cnpj` = '"+cnpj+"', `inscricao_municipal` = '"+inscricaoMunicipal+"', `cep` = '"+cep+"', `endereco` = '"+endereco+"', `numero` = '"+numero+"', `bairro` = '"+bairro+"', `complemento` = '"+complemento+"', `uf` = '"+uf+"', `cidade` = '"+cidade+"', `data_inicio_atvidades` = '"+dataInicioAtividade+"',  `situacao_cadastral` = '"+situacaoCadastral+"', `responsavel` = '"+responsavel+"', `qualificacao_responsavel` = '"+qualificacaoResponsavel+"', `email` = '"+email+"', `telefone` = '"+telefone+"' WHERE `vpcharter_contratante`.`id` = '"+contratante+"';";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {
              setTypeAlert('alert-success')
              settitleAlert('Sucesso!')
              setTxtAlert('Contratante altrado com sucesso.')
              setTimeout(()=> setTypeAlert(''),5000);
              limpaForm();
              var query = "SELECT * FROM `vpcharter_contratante` ";
              var fData = new FormData();
              fData.append('query', query);
              axios.post(endpoint+'query.php', fData)
              .then(response=> {
                if (response.data.length > 0) {  seListData(response.data) }
              })
              .catch(error=> alert(error))
            }
          })
          .catch(error=> alert(error))

        } else {
          var query = "SELECT * FROM `vpcharter_contratante` WHERE `cnpj` = '"+cnpj+"' ";
          var fData = new FormData();
          fData.append('query', query);
          axios.post(endpoint+'query.php', fData)
          .then(response=> {
            if (response.data.length > 0) {
              setTypeAlert('alert-danger')
              settitleAlert('CNPJ já cadastrado!')
              setTxtAlert('Por favor, verifique os dados.')
              setTimeout(()=> setTypeAlert(''),5000);
            } else {
              var query = "INSERT INTO `vpcharter_contratante` (`id`, `razaosocial`, `cnpj`, `inscricao_municipal`, `cep`, `endereco`, `numero`, `bairro`, `complemento`, `uf`, `cidade`, `data_inicio_atvidades`, `situacao_cadastral`, `responsavel`, `qualificacao_responsavel`, `email`, `telefone`) VALUES (NULL, '"+razaoSocial+"', '"+cnpj+"', '"+inscricaoMunicipal+"', '"+cep+"', '"+endereco+"', '"+numero+"', '"+bairro+"', '"+complemento+"', '"+uf+"', '"+cidade+"', '"+dataInicioAtividade+"', '"+situacaoCadastral+"', '"+responsavel+"', '"+qualificacaoResponsavel+"', '"+email+"', '"+telefone+"') ";
              var fData = new FormData();
              fData.append('query', query);
              axios.post(endpoint+'query.php', fData)
              .then(response=> {
                if (response.data.length > 0) {
                  setTypeAlert('alert-success')
                  settitleAlert('Sucesso!')
                  setTxtAlert('Contratante cadastrado com sucesso.')
                  setTimeout(()=> setTypeAlert(''),5000);
                  limpaForm();
                  var query = "SELECT * FROM `vpcharter_contratante` ";
                  var fData = new FormData();
                  fData.append('query', query);
                  axios.post(endpoint+'query.php', fData)
                  .then(response=> {
                    if (response.data.length > 0) { seListData(response.data) }
                  })
                  .catch(error=> alert(error))
            } else {
              setTypeAlert('alert-danger')
              settitleAlert('Erro na Gravação!')
              setTimeout(()=> setTypeAlert(''),5000);
            }
          })
          .catch(error=> alert(error))
          }
        })
        .catch(error=> alert(error))
        }
        setLoading(false)
      }, 1000)    
    }
  }

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj == '') return false;
    if (cnpj.length != 14)
        return false;
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
  }

  function cosultaCep(e) {
    const cep = e;
    const url = `https://viacep.com.br/ws/${cep}/json`;
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            'content-type': 'application/json;charset=utf-8',
        }
    }
    fetch(url, options).then(
      response => response.json()
    ).then(
        data => {
          if (data.erro == 'true') {
            alert("");
            setTypeAlert('alert-danger')
            settitleAlert('CEP errado! Por favor, digite corretamente.')
            setTimeout(()=> setTypeAlert(''),5000);
          } else {
            setCidade(data.localidade)
            setEndereco(data.logradouro)
            setUf(data.uf)
            setBairro(data.bairro)
          }
        }
    )
  }

  function cosultaCNPJ(e) {
    setLoading(true)
    const cnpj = e.replace(/[^0-9]/g,'')
    const url = `https://publica.cnpj.ws/cnpj/${cnpj}`;
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            'content-type': 'application/json;charset=utf-8',
        }
    }
    fetch(url, options).then(
      response => response.json()
    ).then(
        data => {
          if (data.erro == 'true') {
            alert("");
            setTypeAlert('alert-danger')
            settitleAlert('CNPJ errado! Por favor, digite corretamente.')
            setTimeout(()=> setTypeAlert(''),5000);
          } else {
            setRazaoSocial(data.razao_social)
            setCep(data.estabelecimento.cep)
            cosultaCep(data.estabelecimento.cep)
            setNumero(data.estabelecimento.numero)
            setComplemento(data.estabelecimento.complemento)
            setEmail(data.estabelecimento.email)
            setTelefone(data.estabelecimento.ddd1 + data.estabelecimento.telefone1)
            setDataInicioAtividade(data.estabelecimento.data_inicio_atividade)
            setSituacaoCadastral(data.estabelecimento.situacao_cadastral)
            if (data.socios.length > 0) {
              setResponsavel(data.socios[0].nome)
              setQualificacaoResponsavel(data.socios[0].qualificacao_socio.descricao)
              setResponsavel(data.socios[0].nome)
              //setInscricaoMunicipal(data.estabelecimento.inscricoes_estaduais[0].inscricao_estadual)
            }
            console.log(data)
            setLoading(false)
          }
        }
    )
  }

  function editaContratante(id, razaosocial, cnpj, inscricao_municipal, cep, endereco, numero, complemento, uf, cidade, responsavel, email, telefone, bairro, data_inicio_atvidades, situacao_cadastral, qualificacao_responsavel) {
    setLoading(true)
    limpaForm()
    seComtratante(id)
    setRazaoSocial(razaosocial)
    setCnpj(cnpj)
    setInscricaoMunicipal(inscricao_municipal)
    setCep(cep)
    setEndereco(endereco)
    setNumero(numero)
    setComplemento(complemento)
    setUf(uf)
    setCidade(cidade)
    setResponsavel(responsavel)
    setEmail(email)
    setTelefone(telefone)
    setBairro(bairro)
    console.log(data_inicio_atvidades)
    setDataInicioAtividade(data_inicio_atvidades)
    setSituacaoCadastral(situacao_cadastral)
    setQualificacaoResponsavel(qualificacao_responsavel)
    setTimeout(()=> setLoading(false),1000);
  }


  function listSearch() {
    setLoading(true);
    setTypeAlert('')
    var query = "SELECT * FROM `vpcharter_contratante` WHERE `razaosocial` LIKE '%"+buscaFiltro+"%' OR `cnpj` LIKE '%"+buscaFiltro+"%' OR `cep` LIKE '%"+buscaFiltro+"%' OR `endereco` LIKE '%"+buscaFiltro+"%' OR `uf` LIKE '%"+buscaFiltro+"%' OR `cidade` LIKE '%"+buscaFiltro+"%' OR `responsavel` LIKE '%"+buscaFiltro+"%' OR `email` LIKE '%"+buscaFiltro+"%' ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(endpoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        seListData(response.data)
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
      setLoading(true);
      var query = "SELECT * FROM `vpcharter_contratante` ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(endpoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          seListData(response.data)
          setListTotal(response.data.length)
          setLoading(false);
        }
      })
      .catch(error=> alert(error))
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
        <div className='breadCrumb'><Link to="/admin" relative="path"><MdOutlineHome className='icoBread' /><BiSolidChevronRight className='caretRight' /> Admin</Link>&nbsp;/&nbsp;Agência/Cliente</div>


          <div className="lineButtons row ">
            <div className="col">
              <h1>Agência/Cliente</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>

                <div className='col'>
                  <form onSubmit={(e)=> validaForm(e)}>
                    <div className='row'>

                    <div className='col-3'>
                        <label>CPNJ</label>
                        <ReactInputMask mask="99.999.999/9999-99" id="f_cnpj" className='defaultField' value={cnpj} onChange={(e) => setCnpj(e.target.value)} onBlur={(e)=>cosultaCNPJ(e.target.value)}  required  />
                      </div>

                      <div className='col-6'>
                        <label>Nome/Razão Social</label>
                        <input type='text' value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required />
                      </div>
                      
                      <div className='col-3'>
                        <label>Inscrição Municipal</label>
                        <input type='text' value={inscricaoMunicipal} onChange={(e) => setInscricaoMunicipal(e.target.value)} required />
                      </div>

                      <div className='col-2'>
                        <label>CEP</label>
                        <ReactInputMask mask="99999-999" className='defaultField' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={(e)=>cosultaCep(e.target.value)} required />
                      </div>
                      <div className='col-8'>
                        <label>Endereço</label>
                        <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                      </div>
                      <div className='col-2'>
                        <label>Número</label>
                        <input type='text' value={numero} onChange={(e) => setNumero(e.target.value)} required />
                      </div>

                      <div className='col-4'>
                        <label>Bairro</label>
                        <input type='text' value={bairro} onChange={(e) => setBairro(e.target.value)}  />
                      </div>

                      <div className='col-5'>
                        <label>Complemento</label>
                        <input type='text' value={complemento} onChange={(e) => setComplemento(e.target.value)}  />
                      </div>
                      <div className='col-3'>
                        <label>Estado</label>
                        <select value={uf} onChange={(e) => setUf(e.target.value)} required >
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espirito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                      <div className='col-6'>
                        <label>Cidade</label>
                        <input type='text' value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                      </div>
                      <div className='col-3'>
                        <label>Data Início Atvidades</label>
                        <input type='date' value={dataInicioAtividade} onChange={(e) => setDataInicioAtividade(e.target.value)} />
                      </div>
                      <div className='col-3'>
                        <label>Situação Cadastral</label>
                        <input type='text' value={situacaoCadastral} placeholder='Ativo/Inativo' onChange={(e) => setSituacaoCadastral(e.target.value)} />
                      </div>
                      
                      <div className='col-4'>
                        <label>Responsável</label>
                        <input type='text' value={responsavel} placeholder='Nome do Respons´vel' onChange={(e) => setResponsavel(e.target.value)} required />
                      </div>
                      <div className='col-2'>
                        <label>Qualificação Resp.</label>
                        <input type='text' value={qualificacaoResponsavel} placeholder='Sócio/Diretor' onChange={(e) => setQualificacaoResponsavel(e.target.value)} />
                      </div>
                      <div className='col-3'>
                        <label>E-mail</label>
                        <input type='text' id="f_email" value={email} placeholder='email_responsavel@empresa.com' onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className='col-3'>
                        <label>Telefone</label>
                        <ReactInputMask id="f_telefone" mask="(99) 99999-9999" className='defaultField' value={telefone} onChange={(e) => setTelefone(e.target.value)} required />

                      </div>


                    </div>

                    <div className='row'>
                      <div className='col'></div>
                      <div className='col-3'>
                          <button type='submit' >
                            <span className={loading ? 'hide' : ''}>
                              <span className={!contratante ? '' : 'hide'}><PiCaretRightBold /> Salvar</span>
                              <span className={contratante ? '' : 'hide'}><FiEdit /> Alterar</span>
                              </span>
                            <span className={loading ? 'loader' : 'hide'}></span>
                          </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>

          <div className='contentAll mt-3'>
              
              <div className='row lineButtons'>
                <div className="col ">
                  <h4>Agências/Clientes</h4>
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
                    <div>{listData.length}</div>
                    <div>de</div>
                    <div className='listTotal'>{listTotal}</div>
                    <button type="button" className="btn btnNew" onClick={()=>limpaForm()}>Novo <PiPlusCircleFill /></button>
                  </div>
                </div>
                
              </div>

              <div className='row'>
                <div className='table_list'> 
                  <table className='tblDefault'>
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Razão Social</th>
                        <th scope="col">CNPJ</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                        <th scope="col">Responsável</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {listData.map((data, index) => (
                      <tr key={index} onClick={() => editaContratante(data.id, data.razaosocial, data.cnpj, data.inscricao_municipal, data.cep, data.endereco, data.numero, data.complemento, data.uf, data.cidade, data.responsavel, data.email, data.telefone, data.bairro, data.data_inicio_atvidades, data.situacao_cadastral, data.qualificacao_responsavel)}  className={contratante == data.id?'trSelect':''}>
                        <td>{data.id}</td>
                        <td>{data.razaosocial}</td>
                        <td>{data.cnpj}</td>
                        <td>{data.cidade}</td>
                        <td>{data.uf}</td>
                        <td>{data.responsavel}</td>
                        <td>{data.email}</td>
                        <td>{data.telefone}</td>
                        <td><BiSolidEdit /></td>
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
  
export default CadastroContratante