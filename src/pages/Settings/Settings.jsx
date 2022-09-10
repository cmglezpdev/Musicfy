import { UploadAvatar, BasicModal, UserName, UserPassword, UserEmail } from '../../components';

import './Settings.scss';

export const Settings = () => {

  return (
    <div className='settings'>
      <h1>Configuracion</h1>

      <div className="avatar-name">
        <UploadAvatar />
        <UserName />
      </div>
      <UserEmail  />
      <UserPassword />

      <BasicModal />
    </div>
  )
}


// TODO: error cuando da click en crear una artista se abren otros sliders