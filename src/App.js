import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Shorty from './views/shorty';
import Redirect_Url from './views/RedirectUrl';
import { IconButton } from './components/mui';
import { Close, Link, Menu } from '@mui/icons-material';
import UrlList from './components/URL/ListUrls';
import Verify from './views/Verify';
import Login from './views/login';
import { useSelector } from 'react-redux';
import Home from './views/home';
import { CollapesNav, NavBar } from './components/nav';
import SignUp from './views/SignUp';
import Verification from './components/verification';
import ForgetPassword from './views/forgetPassword';
import ChangePassword from './views/changePassword';

function App(props) {

  const {user_login} = useSelector(state => state.users.login)

  return (
   <>
   
    <BrowserRouter>   
    <div className="d-none d-sm-block" >
    <NavBar />
  </div>
  <div className="d-block d-sm-none" >
    <CollapesNav/>
  </div>
      <Routes>
        <Route exact path="/" element={<Home {...props} />}/>
        <Route exact path="/user/login" element ={<Login />} />
        <Route exact path="/user/signup" element ={<SignUp />} />
        <Route exact path="/user/dashboard" element={<> <Shorty {...props}/></>} />
        <Route exact path="/user/links" element={<><UrlList {...props} /></> }/>
        <Route exact path="/user/verify" element={<Verify mailId={user_login ? user_login.email : ''} {...props} />}/>
        <Route exact path='/:id/verify/k' element={<Verification />} /> 
        <Route exact path ="/user/forgetpassword" element={<ForgetPassword />} />
        <Route exact path = "/:userId/changepassword/k" element={<ChangePassword/>} />
        <Route exact path="/:shortId" element={<Redirect_Url {...props} />}/>


        
        <Route path="*" element={<div className="header" style={{minHeight:"100vh", borderRadius:"0 0 0 70vw"}}><h1>404</h1></div>}/>
      </Routes>
    </BrowserRouter></>
  );
}

export default App;


