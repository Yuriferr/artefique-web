import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { app } from "../../database/firebase";
import { getAuth, deleteUser } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../database/firebase'

import { collection, addDoc, query, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../database/firebase'

import Modal from "../../components/Modal/Modal";

// Asset import
import imgHome from "../../assets/home.png";
import imgExluir from "../../assets/excluir.png";
import imgUpdate from "../../assets/engrenagem.png";
import imgChat from "../../assets/buttons/chat.png";
import imgAdd from "../../assets/buttons/adicionar.png";
import imgLogo2 from "../../assets/logos/logo2.png";
import imgLogo3 from "../../assets/logos/logo3.png"
import logoLinkedin from "../../assets/linkedin.png";
import logoEmail from "../../assets/email.png";
import logoFacebook from "../../assets/facebook2.png";
import logoTwitter from "../../assets/twitter.png";
import logoInstagram from "../../assets/instagram.png";
import imgAvatar from "../../assets/defaultavatar.png";

import editBtn from "../../assets/buttons/edit.png"
import imgstorysetImage from "../../assets/storyset/Image folder-bro2.png"

function Perfil() {
  const navigation = useNavigate();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const docRef = collection(db, 'posts')

  const order = query(docRef, orderBy('created', 'desc'))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoUrl] = useState('')
  const [modal, setModal] = useState(false);

  const [namePost, setNamePost] = useState('')
  const [descPost, setDescPost] = useState('')
  const [imgUrlPost, setImgUrlPost] = useState('')

  const [imgFeedPerfil, setimgFeedPerfil] = useState([])
  let uploadImg = document.getElementById('file')

  const [teste, setTeste] = useState([])

  useEffect(() => {
    if (user !== null) {
      setName(user.displayName)
      setEmail(user.email)
      setPhotoUrl(user.photoURL)
    }

  }, [])

  onSnapshot(order, (snapshot) => {
    let dados = []
    snapshot.docs.forEach((doc) => {
      dados.push({...doc.data() , id: doc.id})
    })
    setimgFeedPerfil(dados)
  })


  function Delete(){
    deleteUser(user).then(() => {
      navigation('/', { replace: true });
    }).catch((error) => {
      console.log(error)
    });
  }

  function ClickInput(){
    uploadImg.click()
  }

  function EscolherImg(file){
        if(!file) return;

        const storageRef = ref(storage, `image/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            snapshot => {
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setImgUrlPost(url)
                })
            }
        )
  }

  async function SalvarImg(){
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        Desc: descPost,
        Nome: namePost,
        Url: imgUrlPost,
        User: email,
        created: serverTimestamp(),
      });
      setModal(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <header>
        <div className="feed_header_items">
          <Link to="/feed">
            <img className="feed_logo" src={imgLogo3} />
          </Link>
        </div>
        <div className="feed_header_items">
          <a onClick={() => setModal(true)}>
            <img className="icon" src={imgAdd} />
          </a>
          <a onClick={() => navigation(`/${name}/config`, {replace: true})}>
            <img className="icon" src={imgUpdate} />
          </a>
          <a onClick={Delete}>
            <img className="icon" src={imgExluir} />
          </a>
        </div>
      </header>

      {modal ? (<Modal onClose={() => setModal(false)}>
        <div>
          <div className="modal_container">
            <div className="post_image">
              <img className="select_img" src={imgUrlPost} alt="escolha uma imagem" />
            </div>
            <div className="button_position">
                <input onChange={(e) => EscolherImg(e.target.files[0])} type="file" id="file" style={{display: 'none'}}/>
                <button onClick={ClickInput} className="modal_editbtn"><img className="select_imgbtn" src={editBtn} /></button>
            </div>
          </div>
          <div className="line_modal" />
          <br />
          <div className="post_info">
            <div >
              <label className="info_label">Titulo:</label>
              <input onChange={(e) => setNamePost(e.target.value)} className="title_post" placeholder="Noite Estrelada" />
            </div>
            <br />
            <div >
              <label className="info_label">Descrição:</label>
              <input onChange={(e) => setDescPost(e.target.value)} className="desc_post" placeholder="Releitura em Pixel Art" />
            </div>
          </div>
          <div className="buttons">
              <button className="modalredefine_btn">Redefinir</button>
              <button onClick={SalvarImg} className="modalsave_btn">Salvar</button>
          </div>
        </div>
      </Modal>
      ) : null}

      <section>
        <div className="perfil">
          <div className="tags"></div>
          <div className="perfil_img">
            <img className="avatar" referrerPolicy="no-referrer" src={photoURL}/>
          </div>
          <div className="perfil_info">
            <p className="perfil_name">{name}</p>
            <div className="desc">
              <p className="perfil-desc"></p>
            </div>
          </div>
          <Link to='/chat'><img className="chat_btn" src={imgChat}/></Link>
        </div>
      </section>
      <section>
        <div className="gallery">
          <div className="row">
            {imgFeedPerfil.map((item) => {
              if(item.User == email){
                return (
                    <img key={item.Url} className="item" src={item.Url}/>
                )
              }
            })}
          </div>
        </div>
      </section>
      <footer>
        <div className="logo">
          <img className="img_logo" src={imgLogo2} />
        </div>
        <div className="side_footer">
          <p className="privacy">Politica de Privacidade</p>
          <div className="logo2">
            <a href="">
              <img className="logo3" src={logoEmail} />
            </a>
            <a href="">
              <img className="logo3" src={logoLinkedin} />
            </a>
            <a href="">
              <img className="logo3" src={logoFacebook} />
            </a>
            <a href="">
              <img className="logo3" src={logoInstagram} />
            </a>
            <a href="">
              <img className="logo3" src={logoTwitter} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Perfil;
