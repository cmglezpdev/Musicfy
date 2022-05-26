import React, { useState } from 'react';
import './LoginForm.scss';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../../utils/Validations';
import firebase from '../../../utils/Firebase';
import { useForm } from '../../../Hooks/useForm';
import 'firebase/auth';

export const LoginForm = ({ setSelectedForm }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [ { email, password }, handleInputChange ] = useForm({ 
      email: "",
      password : ""
  });

  const handleShowPassword = () => {
    setShowPassword( !showPassword );
  }

  const onSubmit = () => {
      setFormError({});
      let error = {};
      let OK = true;

      if( !validateEmail(email) ) {
        error.email = true;        
        OK = false;
      }

      if( !validatePassword(password) ) {
          error.password = true;
          OK = false;
      }

      setFormError(error);

      if( OK ) {
        setIsLoading(true);
        toast.success( "Login Correcto" );
      }
    }

  
  return (

    <div className='login-form'>
      <h1>Musica para todos</h1>
    
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input 
            type='text'
            name='email'
            value={email}
            placeholder='Correo Electronico'
            onChange={handleInputChange}
            icon='mail outline'
            error={formError.email}
          />
          { formError.email && (
              <span className='error-text'> 
              Por favor introduce un correo electronico valido
              </span> 
          ) }
        </Form.Field>

        <Form.Field>
          <Input 
            type={ showPassword ? 'text' : 'password' }
            name='password'
            value={password}
            placeholder='Contraseña'
            onChange={handleInputChange}
            error={formError.password}
            icon={
                !showPassword ? (<Icon name='eye' link onClick={handleShowPassword}/>)
                              : (<Icon name='eye slash outline' link onClick={handleShowPassword}/>)
            }
          />
          {
            formError.password && (
              <span className='error-text'> 
                La Contraseña debe tener mas de 8 caracteres
              </span> 
            )}
        </Form.Field>

        <Button>
          Iniciar Sesión
        </Button>
      </Form>

      <div className='login-form__options'>
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          No tienes cuenta? {" "} 
          <span onClick={() => setSelectedForm('register')}>Registrate</span>
        </p>
      </div>

    </div>
  );
}
