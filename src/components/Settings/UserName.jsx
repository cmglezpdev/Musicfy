import React, { useState } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useForm, useFirebaseProfile } from '../../Hooks'
import { setModal, ReloadApp, openModal, closeModal } from '../../actions/uiActions'
import { firebaseApp } from '../../utils';

export const UserName = () => {

    const dispatch = useDispatch();
    const { currentUser: user } = useSelector(state => state.auth);
    
    const onEdit = () => {

        dispatch( setModal({
            titleModal: "Update Name",
            contentModal: <ChangeDisplayName /> 
        }) );

        dispatch(openModal())
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



const ChangeDisplayName = () => {
    
    const dispatch = useDispatch();
    const { displayName:name } = useSelector(state => state.auth.currentUser);
    const { updateUserName } = useFirebaseProfile(firebaseApp);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, handleInputChange] = useForm({
        displayName: name,
    })

    const onSubmit = async () => {    
        if( !formData.displayName || formData.displayName === name ) {
            dispatch( closeModal() );
        } else {

            setIsLoading( true );
            try {
                await updateUserName(formData.displayName);
                toast.success( "Nombre de usuario actualizado correctamente!" );
                dispatch( closeModal() );
                dispatch( ReloadApp() );
                
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
                    defaultValue={name}
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