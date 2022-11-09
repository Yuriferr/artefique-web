import './styles.css'

import imgConfif from '../../assets/config/config.png'

import { app } from "../../database/firebase";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { useEffect, useState } from 'react';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../database/firebase'

import { Link, useNavigate } from "react-router-dom";


import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../database/firebase'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";



// Asset import
import imgHome from "../../assets/home.png";
import imgExluir from "../../assets/excluir.png";
import imgUpdate from "../../assets/engrenagem.png";
import imgChat from "../../assets/chat.png";
import imgLogo2 from "../../assets/logos/logo2.png";
import imgLogo3 from "../../assets/logos/logo3.png"
import logoLinkedin from "../../assets/linkedin.png";
import logoEmail from "../../assets/email.png";
import logoFacebook from "../../assets/facebook2.png";
import logoTwitter from "../../assets/twitter.png";
import logoInstagram from "../../assets/instagram.png";
import imgAvatar from "../../assets/defaultavatar.png";

//Placeholder
import pixelArtPH from "../../assets/Placeholder/pixel_art.jpg"

export default function Config() {
    const navigation = useNavigate();
    const auth = getAuth(app);
    const user = auth.currentUser;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [photoURL, setPhotoUrl] = useState('')

    const [newName, setNewName] = useState('')
    const [newPhotoUrl, setNewPhotoUrl] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')

    let uploadImg = document.getElementById('file')

    useEffect(() => {
        if (user !== null) {
            setName(user.displayName)
            setPhotoUrl(user.photoURL)
            document.getElementById('join').style.display = 'none'
            document.getElementById('login').style.display = 'none'
            document.getElementById('imgPerfil').style.display = 'block'
        }
    }, [])

    useEffect(() => {
        if (user !== null) {
            setName(user.displayName)
            setEmail(user.email)
            setPhotoUrl(user.photoURL)
        }
    }, [])

    function Salvar() {
        updateProfile(auth.currentUser, {
            displayName: newName, photoURL: newPhotoUrl
        }).then(() => {
        }).catch((error) => {
            console.log(error)
        });
        if (newPassword == passwordConf) {
            updatePassword(user, newPassword).then(() => {
            }).catch((error) => {
                console.log(error)
            });
        } else {
            alert('confirme a senha')
        }
        navigation(`/feed`, { replace: true });
    }

    function clickImg() {
        uploadImg.click()
    }

    function EscolherImg(file) {
        if (!file) return;

        const storageRef = ref(storage, `imageProfile/${file.name}`)
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
                    setNewPhotoUrl(url)
                })
            }
        )
    }

    return (
        <div className="config">
            <header className='feed_header'>
                <div className='feed_header_items'>

                    <Link to='/feed'>
                        <img className="feed_logo" src={imgLogo3} />
                    </Link>
                </div>
                <div className='feed_header_items'>
                    <Link to={`/perfil/${name}`}><img id="imgPerfil" className="imgPerfil" src={photoURL} /></Link>
                    <button id="join" className='feed_join'><Link className='linkLogin' to='/cadastro'>Join</Link></button>
                    <button id="login" className='feed_login'><Link className='feed_linkLogin' to='/login'>Login</Link></button>
                </div>
            </header>
            <section className="config_titulo">
                <img src={imgConfif} className="iconConfig" alt="" />  <h1>Configurações</h1>
            </section>
            <div className="config_conteudo">
                <div className="config_perfil">
                    <h2 className="config_perfiltitulo">
                        PERFIL
                    </h2>
                    <div className="config_fotoPerfil">
                        <img className='config_imgProfile' src={photoURL} alt="" srcset="" />
                    </div>
                    <div className="enviararquivo">
                        <input onChange={(e) => EscolherImg(e.target.files[0])} type="file" id='file' style={{ display: 'none' }} />
                        <button onClick={clickImg} className="btnred">Escolher Imagem</button>
                    </div>
                    <div className="config_tags">

                    </div>
                </div>
                <div className="barraCentral"></div>
                <div className="config_info">
                    <div className="config_divInfo">
                        <h2>
                            Informações Pessoais
                        </h2>
                        <div className="botoes">
                            <button className="btnred">Redefinir</button>
                            <button onClick={Salvar} className="btnsave" type="submit">Salvar</button>
                        </div>
                    </div>
                    <hr className='hrConfig' />
                    <div>
                        <form className='formConfig'>
                            <div className="divInput">
                                <label className="textoLbl" for="user">Usuário:</label><br />
                                <input onChange={(e) => setNewName(e.target.value)} placeholder={name} className="inputText" type="text" id="inputUser" name="user" /><br />
                            </div>
                            <div className="divInput">
                                <label className="textoLbl" for="email">Email:</label><br />
                                <input placeholder={email} disabled className="inputText" type="email" id="inputEmail" name="email" /><br />
                            </div>
                            <div className="divInput">
                                <label className="textoLbl" for="senhaAntiga">Senha Antiga:</label><br />
                                <input placeholder="*********" className="inputText" type="password" id="inputSenhaAntiga" name="senhaAntiga" /><br />
                            </div>
                            <div className="senhas">
                                <div className="divInput">
                                    <label className="textoLbl" for="senhaNova">Nova Senha:</label><br />
                                    <input onChange={(e) => setNewPassword(e.target.value)} placeholder="Nova senha" className="inputText" type="password" id="inputSenhaNova" name="senhaNova" /><br />
                                </div>
                                <div className="divInput">
                                    <label className="textoLbl" for="senhaNova2">Confirmar Nova Senha:</label><br />
                                    <input onChange={(e) => setPasswordConf(e.target.value)} placeholder="Confirme a senha" className="inputText" type="text" id="inputSenhaNova2" name="senhaNova2" /><br />
                                </div>
                            </div>
                            {/* <div className="divInput">
                                <label className="textoLbl" for="descricao">Descrição:</label><br/>
                                <input placeholder="Ele é neto adotivo de Vovô Gohan, filho de Bardock e Gine..." className="inputText inputDesc" type="text" id="inputDescricao" name="descricao"/>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            <section className='config_footer'>
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
            </section>
        </div>
    )
}