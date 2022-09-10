import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Input,  } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { useForm, useFirebaseProfile } from '../../Hooks';
import { openModal, setModal } from '../../actions/uiActions'
import { LogoutInFirebase } from '../../actions/authActions';
import { firebaseApp, alertError } from '../../utils';

export const UserEmail = () => {
   
    const dispatch = useDispatch();
    const { currentUser : user } = useSelector(state => state.auth);
    
    const onEdit = (e) => {
        dispatch(setModal({
            titleModal: "Update Email",
            contentModal: <ChangeEmailForm />
        }))

        dispatch( openModal() );
    }
   
    return (
        <div className='user-email' >
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}


const ChangeEmailForm = () => {

    const dispatch = useDispatch();
    const { email } = useSelector(state => state.auth.currentUser);
    const { reauthentication, updateUserEmail, sendEmailForVerification } = useFirebaseProfile(firebaseApp);
    const [showPassword, setShowPassword] = useState(false);
    const[ inputForm, handleInputChange ] = useForm({ email, password: '' })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if( FormData.email === email ) {
            toast.warning('El email es el mismo');
            return;
        }
        
        setIsLoading(true);
        try {
            await reauthentication( inputForm.password );
            await updateUserEmail(email);
            toast.success('Email Actualizado Correctamente');
            sendEmailForVerification(); // Send Email for Verification
            toast.success("Se ha enviado el email de verificación");
            dispatch( LogoutInFirebase() ) // Logout for the login again
        } catch (error) {
            alertError(error?.code);
        }
        setIsLoading(false);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    type='email'
                    name='email'
                    value={inputForm.email}
                    onChange={handleInputChange}
                />
                <Input 
                    type={ showPassword ? 'text' : 'password' }
                    placeholder='Contraseña'
                    name='password'
                    value={inputForm.password}
                    onChange={handleInputChange}
                    icon={
                        <Icon 
                            name={ showPassword ? 'eye slash outline' : 'eye' } 
                            link 
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
                
                <Button
                    type='submit'
                    loading={isLoading}
                >
                    Actualizar Email
                </Button>

            </Form.Field>
        </Form>
    )
}