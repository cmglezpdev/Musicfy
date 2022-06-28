import React from 'react'
import { UploadAvatar } from '../../components/Settings/UploadAvatar';

import './Settings.scss';

export const Settings = ({ user }) => {
  return (
    <div className='settings'>
      <h1>Configuracion</h1>
      <div className="avatar-name">
        <UploadAvatar user={user}/>
        <h2>User Name</h2>
      </div>
    </div>
  )
}
