import React, { useState } from 'react';

import './LoginForm.scss';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../utils/Validations';
import firebase from '../../../utils/Firebase';
import 'firebase/auth';

export const LoginForm = ({ setSelectedForm }) => {
  
  const onSubmit = () => {

  }

  
  return (

    <div className='login-form'>
      <h1>Musica para todos</h1>
    
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input 
            typle='text'
            name='email'
            palceholder='Correo Electronico'
            icon='mail outline'
            // error={}
          />
        </Form.Field>

        <Form.Field>
          <Input 
            typle='password'
            name='password'
            palceholder='Contraseña'
            icon='eye'
            // error={}
          />
        </Form.Field>

        <Button>
          Iniciar Sesión
        </Button>
      </Form>

      <div className='login-form__options'>
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          No tienes cuenta? 
          <span onClick={() => setSelectedForm('register')}>Registrate</span>
        </p>
      </div>

    </div>
  );
}
