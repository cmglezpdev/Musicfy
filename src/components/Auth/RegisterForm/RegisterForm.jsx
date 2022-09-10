import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Icon, Form, Input, Button } from 'semantic-ui-react';

import { useForm } from '../../../Hooks';
import { validateEmail, validatePassword, validateUserName } from '../../../utils';
import { registerInFirebase } from '../../../actions/authActions';
import './RegisterForm.scss';





export const RegisterFrom = ({ setSelectedForm }) => {
  
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [ stateForm, handleInputChange ] = useForm({
      email: "",
      password: "",
      username: ""
  });
  const { email, password, username } = stateForm;

  const onSubmit = async () => {
    setFormError({});
    let error = {};
    let OK = true;
    
    if( !validateEmail(email) ) {error.email = true; OK = false;}
    if( !validatePassword(password) ) {error.password = true; OK = false;}
    if( !validateUserName(username) ) {error.username = true; OK = false;}
    
    setFormError(error);

    if( OK ) {
      setIsLoading( true );
      await dispatch(registerInFirebase({email, password, username}));
      setIsLoading( false );
      setSelectedForm(null);
    }   
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
                <Icon name='eye slash outline' link onClick={() => setShowPassword( !showPassword )} />
              ) : (
                <Icon name='eye' link onClick={() => setShowPassword( !showPassword )} />
              )
            }
            onChange={handleInputChange}
            error={formError.password}
          />
          { formError.password && (
              <span className='error-text'> 
                La Contraseña debe tener mas de 8 caracteres
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
      


        <Button type='submit' loading={isLoading}>
          Continuar
        </Button>

      </Form>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null) }>Volver</p>
        <p>
          Ya tienes Musicfy? 
          <span onClick={() => setSelectedForm("login") } >Iniciar Sesion</span>
        </p>
      </div>

    </div>
  )
}

