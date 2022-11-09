import { app, db } from "../../database/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react';
import './styles.css'

import imgLogo from "../../assets/logos/logo.png";
import imgLogo3 from "../../assets/logos/logo3.png"
import sendBtn from "../../assets/buttons/send-mail.png"

export default function Chat() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const docRef = collection(db, 'messages')

  const order = query(docRef, orderBy('created'))

  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [email, setEmail] = useState('')

  const [file, setFile] = useState([])

  useEffect(() => {
    if (user !== null) {
      setName(user.displayName)
      setPhoto(user.photoURL)
      setEmail(user.email)
    }
  }, [])

  onSnapshot(order, (snapshot) => {
    let dados = []
    snapshot.docs.forEach((doc) => {
      dados.push({ ...doc.data(), id: doc.id })
    })
    setFile(dados)
  })

  async function Enviar() {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        user: name,
        text: text,
        photo: photo,
        email: email,
        created: serverTimestamp(),
      });
      document.getElementById('text').value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="screen">
      <header className="login_header">
        <Link to="/feed" className="back"></Link>
        <Link to="/feed" className="logo_back"><img src={imgLogo3} /></Link>
      </header>
      <div className='chat'>
        <div className='messages'>
          <div className='message'>
            {file.map((item) => {
              if (item.email == email) {
                return (
                  <div key={item.id} className="postChat" style={{ flexDirection: 'row-reverse' }}>
                    <div className="user">
                      <img src={item.photo} alt="" />
                      <span>{item.user}</span>
                    </div>
                    <p style={{ borderRadius: '10px 0px 10px 10px', backgroundColor:'#ea6982', boxShadow:'#D9D9D9 4px 4px 6px', color:'#FFFFFF' }}>{item.text}</p>
                  </div>
                )
              } else {
                return (
                  <div key={item.id} className="postChat">
                    <div className="user">
                      <img src={item.photo} alt="" />
                      <span>{item.user}</span>
                    </div>
                    <p>{item.text}</p>
                  </div>
                )
              }
            })}
          </div>
          <div className="line_modal"></div>
          <br/>
          <div className='inputChat'>
            <input id="text" onChange={(e) => setText(e.target.value)} type="text" placeholder='Mensagem' />
            <button onClick={Enviar} className="btn_sendmsg"><img src={sendBtn} className="img_sendmsg"/></button>
            {/* <Link to={`/perfil/${name}`}>Voltar</Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}
