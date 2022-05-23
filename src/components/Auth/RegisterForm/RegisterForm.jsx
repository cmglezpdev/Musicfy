import React, { useState } from 'react'

import firebase from '../../../utils/Firebase';
import { useForm } from '../../../Hooks/useForm';
import { validateEmail } from '../../../utils/Validations';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Icon, Form, Input, Button } from 'semantic-ui-react';
import './RegisterForm.scss';


// TODO: ver si puedo usar useReducer para no usar tantos estados
// TODO: Integrar la validacion de las cuentas al useForm

export const RegisterFrom = ({ setSelectedForm }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [ stateForm, handleInputChange, reset ] = useForm({
      email: "",
      password: "",
      username: ""
  });
  const { email, password, username } = stateForm;

  const handleShowPassword = () => {
    setShowPassword( !showPassword );
  }

  const onSubmit = () => {
    setFormError({});
    let error = {};
    let formOK = true;

    if( !validateEmail(email) ) {
      error.email = true;
      formOK = false;
    }
    if( password.length < 6 ) {
      error.password = true;
      formOK = false;
    }

    if( !username ) {
      error.username = true;
      formOK = false;
    }
    setFormError( error );
    console.log( formError );
  }
 
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy Gratis</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input 
            type='text'
            name='email'
            value={email}
            placeholder='Correo Electronico'
            icon='mail outline'
            onChange={handleInputChange}
            error={formError.email}
          />
          { formError.email && (
            <span className='error-text'> 
              Por favor introduce un correo electronico valido
            </span> 
          )}
        </Form.Field>
      



        <Form.Field>
          <Input 
            type={ showPassword ? 'text' : 'password' }
            name='password'
            value={password}
            placeholder='Contraseña'
            icon={
              showPassword ? (
                <Icon name='eye slash outline' link onClick={handleShowPassword} />
              ) : (
                <Icon name='eye' link onClick={handleShowPassword} />
              )
            }
            onChange={handleInputChange}
            error={formError.password}
          />
          { formError.password && (
              <span className='error-text'> 
                La Contraseña debe tener mas de 6 caracteres
              </span> 
          )}
        </Form.Field>




        <Form.Field>
          <Input 
            type='text'
            name='username'
            value={username}
            placeholder='Como deberíamos llamarte?'
            icon='user circle outline'
            onChange={handleInputChange}
            error={formError.username}
          />
          { formError.username && (
              <span className='error-text'> 
                Por favor introduce un nombre de usuario mas grande
              </span> 
          )}
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

