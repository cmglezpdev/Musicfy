import React, { useState } from 'react'
import { Input, Button, Form, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePasswordUser } from '../../actions/personalActions'
import { useForm } from '../../Hooks/useForm'
import { ChangeViewModal } from '../../actions/uiActions'
import { toast } from 'react-toastify'
import { validatePassword } from '../../utils/Validations'

export const UserPassword = ({ setTitleModal, setContentModal }) => {

    const dispatch = useDispatch();
    const { currentUser: user } = useSelector(state => state.auth);

    const onEdit = (e) => {
        setTitleModal( "Actualizar Nombre" );
        setContentModal( 
            <ChangePassword 
                user = { user }
            /> 
        )

        dispatch( ChangeViewModal(true) )
    }

    return (
    <div className='user-password'>
        <h2>*******</h2>
    
        <Button circular onClick={onEdit}>
            Actualizar
        </Button> 
    
    </div>
  )
}



const ChangePassword = ({ user }) => {
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [formData, handleInputChange] = useForm({
      currentPassword: "",  
      newPassword: "",
      confirmNewPassword: ""
    })

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    const onSubmit = async () => {    

      if( newPassword !== confirmNewPassword ) {
        toast.warning("The passwords aren't equals!");
        return;
      } 
      if( newPassword.trim().length === 0 ) {
        toast.warning("Should writing a password!");
        return;
      }
      if( !validatePassword(newPassword) ) {
        toast.warning("Should writing a success password!");
        return;
      }

      setIsLoading(true);
      await dispatch( updatePasswordUser(currentPassword, newPassword) );
      setIsLoading(false);
    }
    
    return (
        
        <Form onSubmit = { onSubmit }>
            <Form.Field>
                <Input 
                    type={ !showPassword1 ? 'password' : 'text' }
                    placeholder="Current Password"
                    name="currentPassword"
                    onChange={ handleInputChange }
                    icon={
                      <Icon 
                          name={ showPassword1 ? 'eye slash outline' : 'eye' } 
                          link 
                          onClick={() => setShowPassword1(!showPassword1)}
                      />
                  }
                />
                <Input 
                    type={ !showPassword2 ? 'password' : 'text' }
                    placeholder="New Password"
                    name="newPassword"
                    onChange={ handleInputChange }
                    icon={
                      <Icon 
                          name={ showPassword2 ? 'eye slash outline' : 'eye' } 
                          link 
                          onClick={() => setShowPassword2(!showPassword2)}
                      />
                  }
                />
                <Input 
                    type={ !showPassword3 ? 'password' : 'text' }
                    placeholder="Confirm New Password"
                    name="confirmNewPassword"
                    onChange={ handleInputChange }
                    icon={
                      <Icon 
                          name={ showPassword3 ? 'eye slash outline' : 'eye' } 
                          link 
                          onClick={() => setShowPassword3(!showPassword3)}
                      />
                  }
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