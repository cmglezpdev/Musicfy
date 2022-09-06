import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input,  } from 'semantic-ui-react'
import { useForm } from '../../Hooks/useForm';
import { updateEmailUser } from '../../actions/personalActions';
import { ChangeViewModal } from '../../actions/uiActions'

export const UserEmail = ({ setTitleModal, setContentModal }) => {
   
    const dispatch = useDispatch();
    const { currentUser : user } = useSelector(state => state.auth);
    
    const onEdit = (e) => {
        setTitleModal( "Actualizar Email" );
        setContentModal( 
            <ChangeEmailForm email={user.email} />
        )

        dispatch( ChangeViewModal(true) );
    }
   
    return (
        <div className='user-email' >
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}


const ChangeEmailForm = ({ email }) => {

    const dispatch = useDispatch();
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
        await dispatch( updateEmailUser({ email:inputForm.email, password: inputForm.password }) )
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