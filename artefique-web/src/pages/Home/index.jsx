import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { app } from "../../database/firebase";
import { getAuth } from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../database/firebase'

import Modal from "../../components/Modal/Modal";

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
import bannerHome from "../../assets/background/banner.png";
import placeholderLp from "../../assets/Placeholder/cu.png"
import team from "../../assets/storyset/User research-bro.png"

import business from "../../assets/balls/tap.png"
import brush from "../../assets/balls/pincel.png"
import dev from "../../assets/balls/coding.png"
import find from "../../assets/balls/find.png"

function Home() {
    const navigation = useNavigate();
    const auth = getAuth(app);
    const user = auth.currentUser;

    const [name, setName] = useState('')
    const [photoURL, setPhotoUrl] = useState('')

    const [imgFeed, setImgFeed] = useState([])
    let dados = []

    useEffect(() => {
        if (user !== null) {
            setName(user.displayName)
            setPhotoUrl(user.photoURL)
            document.getElementById('join').style.display = 'none'
            document.getElementById('login').style.display = 'none'
            document.getElementById('imgPerfil').style.display = 'block'
        }
    }, [])

    LerDados()

    async function LerDados(){
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          dados.push(doc.data())
        })
        setImgFeed(dados)
      }


    return (
        <div className="Home">

            <header className='feed_header'>
                <div className='feed_header_items'>

                    <Link to='/'>
                        <img className="feed_logo" src={imgLogo3} />
                    </Link>
                </div>
                <div className='feed_header_items'>
                    <Link to={`/perfil/${name}`}><img id="imgPerfil" className="imgPerfil" src={photoURL} /></Link>
                    <button id="join" className='feed_join'><Link className='linkLogin' to='/cadastro'>Join</Link></button>
                    <button id="login" className='feed_login'><Link className='feed_linkLogin' to='/login'>Login</Link></button>
                </div>
            </header>

            <div className="Lp_Banner">
                <img className="banner" src={bannerHome}></img>
            </div>

            <div className="search_section">
                <div className="lp_title">
                    <span className="pink_title">Seu </span> game, <br />
                    <span className="orange_title">Nossa </span> arte.
                </div>
                <div className='searchbar'>
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search" className='searchbar_feed' />
                        <Link className='linkLogin' to='/feed'><button type="submit" className="searchbar_button">Pesquisar</button></Link>
                    </form>
                </div>
            </div>

            <section className="about_us">
                <div>
                    <h2>Sobre Nós</h2>
                </div>
                <div className="info_block">
                    <div className="text_block">
                        <span className="title_lp">
                            <Link to="/feed">
                                Artifique</Link> </span> <br />
                        É uma StartUp pensada como uma plataforma para ajudar criadores de games procurando artes e estilo para seus jogos e designers de jogos que estão com dificuldade para se inserir no mercado, atuando como uma ponte de MarketPlace entre os dois. <br /> <br />
                        <span className="title_lp">
                            <Link to="/feed">
                                <a>Visite o Site →</a>
                            </Link></span>
                    </div>
                    <div className="image_block">
                        <img className="about_img" src={team} />
                    </div>
                </div>
            </section>
            <section className="pink">
                <div className="pink_info">
                    <div className="lp_grid">
                        <div className="lp_ballinfo">
                            <div className="LP_ball">
                                <img src={business} className="LP_ballicon"></img>
                            </div>
                            <span className="lp_balltext">
                                Acesse e estabeleça seu negócio
                            </span>
                        </div>
                        <div className="lp_ballinfo">
                            <div className="LP_ball">
                                <img src={brush} className="LP_ballicon"></img>
                            </div>
                            <span className="lp_balltext">
                            Começe como um artista querendo expor sua arte!</span>
                        </div>
                        <div className="lp_ballinfo">
                            <div className="LP_ball">
                                <img src={dev} className="LP_ballicon"></img>
                            </div>
                            <span className="lp_balltext">
                            Ou como um desenvolvedor a procura de game-designers</span>
                        </div>
                        <div className="lp_ballinfo">
                            <div className="LP_ball">
                                <img src={find} className="LP_ballicon"></img>
                            </div>
                            <span className="lp_balltext">
                            Procure por qualquer categoria que você deseja e mais um pouco</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="trending">
                <div className="info_tr">
                    <br />
                    <p>Explore um pouco da nossa página</p>
                    <h3>Trending</h3>
                    <div className="gallery">
                        <div className="row_lp">
                            {imgFeed.map(item => {
                                return(
                                    <div className="item">
                                    <img src={item.Url}/>
                                </div>
                                )
                            })}
                        </div>
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
    )
}

export default Home;

