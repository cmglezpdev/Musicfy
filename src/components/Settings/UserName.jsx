import React, { useState } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../Hooks/useForm'
import { ChangeViewModal, ReloadApp } from '../../actions/uiActions'
import { toast } from 'react-toastify'
import { useFirebaseProfile } from '../../Hooks/useFirebaseProfile'
import firebaseApp from '../../utils/Firebase';

export const UserName = ({ setTitleModal, setContentModal }) => {

    const dispatch = useDispatch();
    const { currentUser: user } = useSelector(state => state.auth);

    const onEdit = (e) => {
        setTitleModal( "Actualizar Nombre" );
        setContentModal( 
            <ChangeDisplayName 
                user = { user }
            /> 
        )

        dispatch( ChangeViewModal(true) )
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



const ChangeDisplayName = ({ user }) => {
    
    const dispatch = useDispatch();
    const { updateUserName } = useFirebaseProfile(firebaseApp);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, handleInputChange] = useForm({
        displayName: user.displayName,
    })

    const onSubmit = async () => {    
        if( !formData.displayName || formData.displayName === user.displayName ) {
            dispatch( ChangeViewModal(false) );
        } else {

            setIsLoading( true );
            try {
                await updateUserName(formData.displayName);
                toast.success( "Nombre de usuario actualizado correctamente!" );
                dispatch( ReloadApp() );
                dispatch( ChangeViewModal(false) );
                
            } catch (error) {
                toast.error( "Error al actualizar el nombre de usuario!" );   
            }
            setIsLoading( false );
        }
    }
    
    return (
        
        <Form onSubmit = { onSubmit }>
            <Form.Field>
                <Input 
                    defaultValue={user.displayName}
                    name="displayName"
                    onChange={ handleInputChange }
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