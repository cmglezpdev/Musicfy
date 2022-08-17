import React, { useState } from 'react'
import { AuthOptions } from '../../components/Auth/AuthOptions/AuthOptions';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';
import { RegisterFrom } from '../../components/Auth/RegisterForm/RegisterForm';

import backgroundAuth from '../../assets/jpg/background-auth.jpg'
import logoNameWhite from '../../assets/png/logo-name-white.png'

import './auth.scss'


export const Auth = () => {

  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <div className='auth' style={{backgroundImage:`url(${backgroundAuth})`}}>
        <div className='auth__dark' />
        <div className='auth__box'>
          <div className='auth__box-logo'>
            <img src={logoNameWhite} alt="Musicfy" draggable="false"/>
          </div>  
          {/* { handleForm() } */}
          { selectedForm === 'login' && <LoginForm setSelectedForm={setSelectedForm}/> }
          { selectedForm === 'register' && <RegisterFrom setSelectedForm={setSelectedForm}/> }
          { selectedForm === null && <AuthOptions setSelectedForm={setSelectedForm}/> }
        </div>

    </div>
  );
}
