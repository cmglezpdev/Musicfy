import React, { useState } from 'react'

import firebase from '../../../utils/Firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useForm } from '../../../Hooks/useForm';

import { Icon, Form, Input, Button } from 'semantic-ui-react';
import './RegisterForm.scss';


export const RegisterFrom = ({ setSelectedForm }) => {
  
  const [ stateForm, handleInputChange, reset ] = useForm({
      email: "",
      password: "",
      username: ""
  });
  const { email, password, username } = stateForm;
  
  const onSubmit = () => {
    console.log("USuario Registrado");
    console.log(stateForm);
  }
 
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy Gratis</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input 
            type='email'
            name='email'
            value={email}
            placeholder='Correo Electronico'
            icon='mail outline'
            onChange={handleInputChange}
            // error={}
          />
        </Form.Field>
      
        <Form.Field>
          <Input 
            type='password'
            name='password'
            value={password}
            placeholder='Contraseña'
            icon='eye'
            onChange={handleInputChange}
            // error={}
          />
        </Form.Field>
      
        <Form.Field>
          <Input 
            type='text'
            name='username'
            value={username}
            placeholder='Como deberíamos llamarte?'
            icon='user circle outline'
            onChange={handleInputChange}
            // error={}
          />
        </Form.Field>
      
        <Button type='submit'>
          Continuar
        </Button>

      </Form>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null) } >Volver</p>
        <p>
          Ya tienes Musicfy? 
          <span onClick={() => setSelectedForm("login") } >Iniciar Sesion</span>
        </p>
      </div>


    </div>
  )
}

