import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

import { app } from "../../database/firebase";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

import imgLogo from "../../assets/logos/logo.png";
import imgGoogle from "../../assets/google.png";
import imgFacebook from "../../assets/facebook.png";
import imgApple from "../../assets/apple.png";
import imgSideways from "../../assets/sideways.png";
import imgLogo2 from "../../assets/logos/logo2.png";

import imgDesigner from "../../assets/storyset/Design community-bro.png";
import imgDesigner2 from "../../assets/storyset/Design community-bro2.png";
import imgDesigner3 from "../../assets/storyset/Design community-bro3.png";

import {useState } from "react";

function Login() {
  const navigation = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Logar(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation(`/perfil/${user.displayName}`, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function Google(){
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigation(`/perfil/${user.displayName}`, { replace: true });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

  return (
    <div className="full_size">
      <div className="grid">
        <header className="login_header">
          <Link to="/feed" className="back"></Link>
          <img src={imgLogo} />
        </header>
        <div className="login_screen">
          <form onSubmit={Logar}>
            <div className="login_block">
              <div className="title">
                Bem vindo ao <br />
                <span>Artefique</span>
              </div>
              <div className="underline"></div>
              <section className="section_input">
                <div className="inputs">
                  {/* <label className='label_input'>Email:</label> */}
                  <input
                    id="email"
                    type="email"
                    className="insert_input"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="inputs">
                  {/* <label className='label_input'>Senha:</label> */}
                  <input
                    id="password"
                    type="password"
                    className="insert_input"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </section>
              <section className="preferences">
                <div className="remember">
                  <input type="checkbox" id="remember" name="remember" />
                  <label for="remember">Lembrar de mim</label>
                </div>
                <div className="forgot">
                  <a href="" className="forgot_text">
                    {" "}
                    Esqueci minha senha
                  </a>
                </div>
              </section>

              <section className="buttons">
                <button type="submit" className="enter">
                  Entrar
                </button>
              </section>

              <section className="or">
                <div className="underline_black" />
                <div className="options">Ou</div>
                <div className="underline_black" />
              </section>

              <section>
                <div className="external_buttons">
                  <button className="button_logo" onClick={Google}>
                    <img className="morelogin_logo" src={imgGoogle} />
                  </button>
                  <button className="button_logo">
                    <img className="morelogin_logo" src={imgFacebook} />
                  </button>
                  <button className="button_logo">
                    <img className="morelogin_logo" src={imgApple} />
                  </button>
                </div>
              </section>

              <section className="buttons">
                <span className="link">Não tem uma conta? &nbsp; </span>
                <Link className="link" to="/cadastro">
                  Registrar
                </Link>
              </section>
            </div>
          </form>
        </div>
        <div className="side_element">
          <img className="background_img" src={imgDesigner3} />
        </div>
      </div>
      <div className="wrapper"></div>
    </div>
  );
}

export default Login;
