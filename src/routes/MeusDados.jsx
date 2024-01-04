import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSolidChevronRight } from "react-icons/bi";
import Header from '../components/Header';
import { LiaUserEditSolid } from "react-icons/lia";
import Globals from '../components/Globals'
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { PiUserLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";


function MeusDados() {

  const navigate = useNavigate()
  const [typeAlert, setTypeAlert] = useState ('');
  const [titleAlert, settitleAlert] = useState ('');
  const [txtAlert, setTxtAlert] = useState ('');
  const [statusUser, setStatusUser] = useState (null);
  const [firstName, setFirstName] = useState ('');
  const [familyName, setFamilyName] = useState ('');
  const [email, setEmail] = useState ('');
  const [pass, setPass] = useState (''); 
  const [img, setImg] = useState (null); 
  const [b64, setB64] = useState (null); 
  const [mystyle, setMystyle] = useState (null); 
  const [loading, setLoading] = useState (false);
  const [carregando, setCarregando] = useState ("");
  const [imageUser, setImageUser] = useState ();

  const [image, setImage] = useState (); 
  
  

  useEffect(() => {
    setStatusUser(Globals.userStatus)
    var query = "SELECT * FROM `vpcharter_users` WHERE `id` = '"+Globals.userId+"'  ";
    var fData = new FormData();
    fData.append('query', query);
    axios.post(Globals.endPoint+'query.php', fData)
    .then(response=> {
      if (response.data.length > 0) {
        setFirstName(response.data[0].firstName)
        setFamilyName(response.data[0].familyName)
        setEmail(response.data[0].email)
        setPass(response.data[0].pass)

        
        if (response.data[0].image) {
          setImage(response.data[0].image)
          document.getElementById("bg_image").style.backgroundImage = "url('"+Globals.endPoint+"usersimage/"+response.data[0].image+"')"
        } else {
          if (response.data[0].imageUrl) {
            setImage(response.data[0].imageUrl)
            document.getElementById("bg_image").style.backgroundImage = "url('"+response.data[0].imageUrl+"')"
          }
        }
        
      } else {
        setTypeAlert('alert-danger')
        settitleAlert('Usuário não encontrado!')
        setTimeout(()=> setTypeAlert(''),5000);
      }
    })
    .catch(error=> alert(error))
  }, [])


  function imageUploaded(e) {

    setImage(e.target.files[0]);
    var fData = new FormData();
        fData.append('userid', Globals.userId);
        fData.append('arquivo', e.target.files[0]);
        axios.post(Globals.endPoint+'uploadimage.php', fData)
        .then(response=> {
            //console.log(response.data);

            if (response.data != "0") {
              setTypeAlert('alert-danger')
              settitleAlert('Erro no arquivo!')
              setTxtAlert(response.data)
              setTimeout(()=> setTypeAlert(''),6000);
            }
            
            var query = "SELECT * FROM `vpcharter_users` WHERE `id` = '"+Globals.userId+"'  ";
            var fData = new FormData();
            fData.append('query', query);
            axios.post(Globals.endPoint+'query.php', fData)
            .then(response=> {
              if (response.data.length > 0) {
                setImageUser(response.data[0].image)
                Globals.userImage = response.data[0].image
                document.getElementById("bg_image").style.backgroundImage = "url('"+Globals.endPoint+"usersimage/"+response.data[0].image+"')";
              } else {
                setTypeAlert('alert-danger')
                settitleAlert('Usuário não encontrado!')
                setTimeout(()=> setTypeAlert(''),5000);
              }
            })
            .catch(error=> alert(error))



        })
        .catch(error=> alert(error))
        
  }

  function deleteImage() {

    setImageUser('')
    Globals.userImage = '';
    const pieces = document.getElementById("bg_image").style.backgroundImage.split('/');
    var last = pieces[pieces.length - 1];
    last = last.replace('")', '');

    document.getElementById("bg_image").style.backgroundImage = "none";
    var fData = new FormData();
        fData.append('userid', Globals.userId);
        fData.append('delImage', last);
        axios.post(Globals.endPoint+'uploadimage.php', fData)
        .then(response=> {
            //console.log(response.data);
            if (response.data != "0") {
              setTypeAlert('alert-danger')
              settitleAlert('Erro no arquivo!')
              setTxtAlert(response.data)
              setTimeout(()=> setTypeAlert('') ,6000);
            } else {
              setImage('');
            }
        })
        .catch(error=> alert(error))
  }

  function closeScrean() {
    setTypeAlert(''); 
    navigate('/home');
  }



  function validaForm(e) {
    setLoading(true)
    e.preventDefault();


    setTimeout(function() {
      var query = "UPDATE `vpcharter_users` SET `firstName` = '"+firstName+"', `familyName` = '"+familyName+"', `email` = '"+email+"', `pass` = '"+pass+"' WHERE `vpcharter_users`.`id` = '"+Globals.userId+"' ";
      var fData = new FormData();
      fData.append('query', query);
      axios.post(Globals.endPoint+'query.php', fData)
      .then(response=> {
        if (response.data.length > 0) {
          Globals.userName = firstName;
          Globals.userEmail = email;
          setTypeAlert('alert-success')
          setTxtAlert('Dados Alterados com sucesso')
          setTimeout(()=> closeScrean(),5000);
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



  return (
    <>
    <Header />
    <div className='allTab'>
      <Sidebar />
      <div className='content'>

        <div className={typeAlert ? "alert "+typeAlert : 'hide'} role="alert">
          <h4 className={titleAlert ? '' : 'hide'}>{titleAlert}</h4>
          {txtAlert}
        </div>
          <div className='breadCrumb'><LiaUserEditSolid className='icoBread' /><BiSolidChevronRight className='caretRight' /> Meus Dados</div>
          <div className="lineButtons row ">
            <div className="col">
              <h1>Meus Dados</h1>
            </div>
          </div>
          
          <div className='contentAll'>
              <div className='row'>
                <div className='col-5 colImagUser'>
                  <div id="bg_image" className="imageUser"><PiUserLight className={ image ? 'hide' : 'userCircle'} /></div>
                  <div className='tblImgUser'>
                      <div>
                        <label htmlFor='selecao-arquivo' className="labelInputFile" >
                          <span className="txtInputImage"><MdOutlineEdit /> Alterar</span>
                        </label>
                        <input type='file' accept='.jpg, .png' id='selecao-arquivo' onChange={(e) => imageUploaded(e)} />
                        
                      </div>
                      <div className={ image ? '' : 'hide'}>
                        <button className='labelInputFile btnDel' onClick={() => deleteImage()}><LuTrash2 /> Deletar</button>
                      </div>
                  </div>
                </div>
                
                <div className='col-7'>
                  <form onSubmit={(e)=> validaForm(e)}>
                    <div className='row'>
                      <div className='col-6'>
                        <label>Primeiro Nome</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                      </div>
                      <div className='col-6'>
                        <label>Sobrenome</label>
                        <input type='text' value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
                      </div>
                      <div className='col-6'>
                        <label>E-mail</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className='col-6'>
                        <label>Senha</label>
                        <input type='text' value={pass} onChange={(e) => setPass(e.target.value)} required />
                      </div>
                    </div>

                    

                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col'>
                          <button type='submit' ><span className={loading ? 'hide' : ''}><FiEdit /> Salvar</span><span className={loading ? 'loader' : 'hide'}></span></button>
                      </div>
                    </div>
                  </form>
                </div>
                
              </div>
          </div>
      </div>
    </div>

    </>
  )
}
  
export default MeusDados