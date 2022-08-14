import React, { useState } from 'react'
import { Button, Form, Icon, Input,  } from 'semantic-ui-react'

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


    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario Enviado");
        setShowModal(false);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    type='text'
                    defaultValue={email}
                />
                <Input 
                    type={ showPassword ? 'text' : 'password' }
                    placeholder='Contraseña'
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
                >
                    Actualizar Email
                </Button>

            </Form.Field>
        </Form>
    )
}