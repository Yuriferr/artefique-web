import './styles.css';

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { app } from "../../database/firebase";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../database/firebase'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";


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

function Feed() {
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
        <div>
            <div className="Feed">
                <header className='feed_header'>
                    <div className='feed_header_items'>

                        <Link to='/'>
                            <img className="feed_logo" src={imgLogo3} />
                        </Link>
                    </div>
                    <div className='feed_header_items'>
                        <Link to={`/perfil/${name}`}><img id="imgPerfil" className="imgPerfil" src={photoURL}/></Link>
                        <button id="join" className='feed_join'><Link className='linkLogin' to='/cadastro'>Join</Link></button>
                        <button id="login" className='feed_login'><Link className='feed_linkLogin' to='/login'>Login</Link></button>
                    </div>
                </header>
                <section className='feed_content'>
                    <div className='searchbar'>
                        <form action="/action_page.php">
                            <input type="text" placeholder="Search.." name="search" className='searchbar_feed' />
                            <button type="submit" className="searchbar_button">Pesquisar</button>
                        </form>
                    </div>
                    <div className='categories'>
                        <div className='rows'>
                            <h3 className='feedcategory_name'>Cenários</h3>
                            <>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {imgFeed.map(item => {
                                        return(
                                            <SwiperSlide key={item.Url}>
                                                <img src={item.Url}/>
                                                <div className='artist_feed'>
                                                    {item.Nome}
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </>
                        </div>
                        <div className='rows'>
                            <h3 className='feedcategory_name'>Sprite Sheets</h3>
                            <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {imgFeed.map(item => {
                                        return(
                                            <SwiperSlide key={item.Url}>
                                                <img src={item.Url}/>
                                                <div className='artist_feed'>
                                                    {item.Nome}
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                        </div>
                        <div className='rows'>
                            <h3 className='feedcategory_name'>Objetos</h3>
                            <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {imgFeed.map(item => {
                                        return(
                                            <SwiperSlide key={item.Url}>
                                                <img src={item.Url}/>
                                                <div className='artist_feed'>
                                                    {item.Nome}
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
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

        </div>

    )
}

export default Feed;

