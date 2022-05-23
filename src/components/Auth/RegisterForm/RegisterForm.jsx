import React from 'react'

import firebase from '../../../utils/Firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Icon, Form, Input, Button } from 'semantic-ui-react';
import './RegisterForm.scss';


export const RegisterFrom = ({ setSelectedForm }) => {
 
  const onSubmit = () => {
      console.log("USuario Registrado");
  }
 
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy Gratis</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input 
            type='text'
            name='email'
            placeholder='Correo Electronico'
            icon='mail outline'
            // onChange={}
            // error={}
          />
        </Form.Field>
      
        <Form.Field>
          <Input 
            type='password'
            name='password'
            placeholder='Contraseña'
            icon='eye'
            // onChange={}
            // error={}
          />
        </Form.Field>
      
        <Form.Field>
          <Input 
            type='text'
            name='username'
            placeholder='Como deberíamos llamarte?'
            icon='user circle outline'
            // onChange={}
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
