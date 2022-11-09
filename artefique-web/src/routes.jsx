import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home'
import Feed from './pages/Feed'
import Login  from './pages/Login';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat'
import Config from './pages/Config';

import Teste from './pages/Teste'

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Home/>}/>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/perfil/:user' element={<Perfil/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/:user/config' element={<Config/>}/>
                <Route path='/teste' element={<Teste/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;