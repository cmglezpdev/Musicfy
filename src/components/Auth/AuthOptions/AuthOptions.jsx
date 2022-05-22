import React from 'react'

import { Button } from 'semantic-ui-react'
import './AuthOptions.scss'

export const AuthOptions = ({ setSelectedForm }) => {
  return (
    <div className='auth-options'>
      <h2>Millones de canciones gratis en Musicfy</h2>
      <Button className='register' onClick={() => setSelectedForm("register")}>Registrate Gratis</Button> 
      <Button className='login' onClick={() => setSelectedForm("login")}>Iniciar Session</Button>
    </div>
  )
}
