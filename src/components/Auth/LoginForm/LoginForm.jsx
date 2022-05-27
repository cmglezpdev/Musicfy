import React, { useState } from 'react';
import './LoginForm.scss';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../../utils/Validations';
import firebase from '../../../utils/Firebase';
import { useForm } from '../../../Hooks/useForm';
import 'firebase/auth';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginForm = ({ setSelectedForm }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);
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
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(response => {
              setUser( response.user )
              if( !response.user.emailVerified ) {
                toast.warning("Por favor, valide su correo electronico");
                setUserActive(false);
              }
          }).catch(e => {
            handleErrors(e.code);

          }).finally(() => {
            setIsLoading(false);
          })
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

        <Button loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>

      { !userActive && (
        <ButtonResendEmailVerification 
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
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

const ButtonResendEmailVerification = ({ user, setIsLoading, setUserActive }) => {
  
  const resendVerificationEmail = () => {

    sendEmailVerification(user).then(() => {
      toast.success("Se ha enviado el email de verificacion");

    }).catch(e => {
      handleErrors(e.code);
    }).finally(() => {
      setIsLoading(false);
      setUserActive(true);
    })
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

const handleErrors = (code) => {
  switch( code ) {
    case 'auth/wron-password':
      toast.warning("El usuario o la contrasena son incorrectos");
      break;
    case "auth/too-many-requests":
      toast.warning("Haz enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo");
      break;
    case "auth/network-request-failed":
      toast.warning("Error en la conexion a internet!");
      break;
    case "auth/user-not-found":
      toast.warning("EL usuario no existe!");  
      break;
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectos!");  
      break;
  }
}
