import React, { useState } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateName } from '../../actions/personalActions'
import { useForm } from '../../Hooks/useForm'
import { ChangeViewModal } from '../../actions/uiActions'

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
    const [isLoading, setIsLoading] = useState(false);
    const [formData, handleInputChange] = useForm({
        displayName: user.displayName,
    })

    const onSubmit = async () => {    
        if( !formData.displayName || formData.displayName === user.displayName ) {
            dispatch( ChangeViewModal(false) );
        } else {
            setIsLoading( true );
            await dispatch( updateName(user, formData.displayName) );
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