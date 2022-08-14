import React, { useState } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'

export const UserName = ({ user, setShowModal, setTitleModal, setContentModal, setReloadApp }) => {

    const onEdit = (e) => {
        setTitleModal( "Actualizar Nombre" );
        setContentModal( 
            <ChangeDisplayName 
                setShowModal={setShowModal}
                user={user}
                setReloadApp={setReloadApp} 
            /> 
        )

        setShowModal(true);
    }

    return (
    <div className='user-name'>
        <h2>{ user.displayName }</h2>
    
        <Button circular onClick={onEdit}>
            Actualizar
        </Button> 
    
    </div>
  )
}



const ChangeDisplayName = ({ user, setShowModal, setReloadApp}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState({
        displayName: user.displayName,
    })

    const onSubmit = () => {    
        if( !formData.displayName || formData.displayName === user.displayName ) {
            setShowModal(false);
        } else {
            setIsLoading( true );
            updateProfile( user, { displayName: formData.displayName } )
                .then(() => {
                    setReloadApp(e => !e);
                    setIsLoading( false );
                    toast.success( "Nombre de usuario actualizado correctamente!" );
                    setShowModal(false);
                })
                .catch(error => {
                    console.error(error);
                    toast.error( "Error al actualizar el nombre de usuario!" );
                })
        }
    }
    
    return (
        
        <Form onSubmit = { onSubmit }>
            <Form.Field>
                <Input 
                    defaultValue={user.displayName}
                    onChange={ e => setformData({displayName: e.target.value}) }
                />
            </Form.Field>
            <Button 
                type='submit'
                loading={isLoading}
            >
                Actualizar Nombre
            </Button>
        </Form>

    )
}