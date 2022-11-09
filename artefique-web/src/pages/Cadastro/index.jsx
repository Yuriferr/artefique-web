import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

import { app } from "../../database/firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import imgLogo from "../../assets/logos/logo.png";
import imgGoogle from "../../assets/google.png";
import imgFacebook from "../../assets/facebook.png";
import imgApple from "../../assets/apple.png";
import imgSideways from "../../assets/sideways.png";

import imgDesignerRegister from "../../assets/storyset/Video game developer-bro.png";
import imgDesignerRegister2 from "../../assets/storyset/Video game developer-bro2.png";
import { useEffect } from "react";
import { useState } from "react";

function Cadastro() {
  const navigation = useNavigate();
  const auth = getAuth(app);

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function Cadastrar(e){
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: "https://firebasestorage.googleapis.com/v0/b/teste-e3910.appspot.com/o/artefique%2FMaking%20art-bro.png?alt=media&token=96c73d66-1c7d-49c7-b3e4-5418f05865f6"
      }).then(() => {
      }).catch((error) => {
        console.log(error)
      });
      alert('acadastrado com sucesso')
      navigation('/login', { replace: true });
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  }

  return (
    <div className="full_size">
      <header className="login_header">
        <Link to="/feed" className="back"></Link>
        <img src={imgLogo} />
      </header>
      <div className="grid_reg">
        <div className="side_element">
          <img className="background_img" src={imgDesignerRegister2} />
        </div>

        <div className="register_screen">
          <form onSubmit={Cadastrar} className="form_register">
            <div className="register_block">
              <div className="title_register">
                Crie uma&nbsp;
                <span>Conta</span>
              </div>
              <div className="underline_reg"></div>
              <section className="register_inputs">
                {/* <section className="reg_section_input">
                </section>

                <div className="vl"></div> */}

                <section className="reg_section_input">
                <div className="reg_inputs">
                    {/* <label className='label_input'>Email:</label> */}
                    <input
                      id="name"
                      type="text"
                      className="insert_input_reg"
                      placeholder="Name"
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="reg_inputs">
                    {/* <label className='label_input'>Email:</label> */}
                    <input
                      id="email"
                      type="email"
                      className="insert_input_reg"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="reg_inputs">
                    {/* <label className='label_input'>Email:</label> */}
                    <input
                      id="confirmeEmail"
                      type="email"
                      className="insert_input_reg"
                      placeholder="Confirmar Email"
                    />
                  </div>

                  <div className="reg_inputs">
                    {/* <label className='label_input'>Senha:</label> */}
                    <input
                      id="reg_password"
                      type="password"
                      className="insert_input_reg"
                      placeholder="Senha"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="reg_inputs">
                    {/* <label className='label_input'>Senha:</label> */}
                    <input
                      id="confirmeReg_password"
                      type="password"
                      className="insert_input_reg"
                      placeholder="Confirmar Senha"
                    />
                  </div>
                </section>
              </section>
              <section className="buttons">
                <button className="create" type="submit">
                  Cadastrar
                </button>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
