import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input,  } from 'semantic-ui-react'
import { useForm } from '../../Hooks/useForm';
import { alertError } from '../../utils/alert-errors';
import { reauthentication } from '../../utils/Api';

export const UserEmail = ({ user, setShowModal, setTitleModal, setContentModal }) => {
   
    const onEdit = (e) => {
        setTitleModal( "Actualizar Email" );
        setContentModal( 
            <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
        )

        setShowModal(true);
    }
   
    return (
        <div className='user-email' >
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}


const ChangeEmailForm = ({ email, setShowModal }) => {

    const [showPassword, setShowPassword] = useState(false);
    const[ inputForm, handleInputChange ] = useForm({ email, password: '' })
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if( FormData.email === email ) {
            toast.warning('El email es el mismo');
            return;
        }
        
        setIsLoading(true);
        reauthentication(inputForm.password)
            .then(response => {
                console.log("auth Corrento")
            })
            .catch(error => {
                alertError(error?.code);
            })

        setIsLoading(false);
        // setShowModal(false);
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