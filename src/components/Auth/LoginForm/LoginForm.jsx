import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Form, Input } from 'semantic-ui-react';

import { useForm } from '../../../Hooks/useForm';
import { validateEmail, validatePassword } from '../../../utils/Validations';
import { loginInFirebase, resendEmailForVerification, resetAuthStore } from '../../../actions/authActions';
import './LoginForm.scss';

export const LoginForm = ({ setSelectedForm }) => {
  
  const dispatch = useDispatch();
  const { userActive } = useSelector(state => state.auth);


  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [ { email, password }, handleInputChange ] = useForm({ 
      email: "cmglezpdev@gmail.com",
      password : "4ever.togeTher"
  });

  const handleShowPassword = () => {
    setShowPassword( !showPassword );
  }

  const onSubmit = async () => {
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
        await dispatch(loginInFirebase({email, password}));
        setIsLoading(false);
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
              Por favor introduce un correo electrónico válido
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

        <Button loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>

      { (userActive !== undefined && !userActive) && (
        <ButtonResendEmailVerification 
          setIsLoading={setIsLoading}
        />
      )}

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

const ButtonResendEmailVerification = ({ setIsLoading }) => {
  
  const dispatch = useDispatch();

  const resendVerificationEmail = async () => {
      
      await dispatch(resendEmailForVerification());
      dispatch( resetAuthStore() );
      setIsLoading(false);
  }

  return (
    <div className='resend-verification-email'>
      <p>
        Si no has recibido el email puedes vovler a enviarlo haciendo click {" "}
        <span onClick={resendVerificationEmail}>aqui</span>
      </p>
    </div>
  )
}
