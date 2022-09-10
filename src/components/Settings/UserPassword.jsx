import React, { useState } from 'react'
import { Input, Button, Form, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { validatePassword, alertError, firebaseApp } from '../../utils'
import { useForm, useFirebaseProfile } from '../../Hooks'
import { openModal, setModal } from '../../actions/uiActions'

export const UserPassword = () => {

    const dispatch = useDispatch();

    const onEdit = (e) => {

        dispatch(setModal({
          titleModal: "Update Password",
          contentModal: <ChangePassword /> 
        }));

        dispatch( openModal() )
    }

    return (
    <div className='user-password'>
        <h2>********</h2>
    
        <Button circular onClick={onEdit}>
            Actualizar
        </Button> 
    
    </div>
  )
}



const ChangePassword = () => {
    
    const { updateUserPassword, reauthentication } = useFirebaseProfile(firebaseApp);
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
      try {
        await reauthentication( currentPassword );
        await updateUserPassword( newPassword );
        toast.success("Successfully password updated")
      } catch (error) {
        alertError(error?.code)
      }
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
              </Form.Field>
              <Form.Field>
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
              </Form.Field>
              <Form.Field>
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

// TODO: crear componente de Input Password para refactorizar