import React, { useState } from 'react'
import { UploadAvatar } from '../../components/Settings/UploadAvatar';
import { UserName } from '../../components/Settings/UserName';
import { BasicModal } from '../../components/Modal/BasicModal/BasicModal';
import { UserEmail } from '../../components/Settings/UserEmail';
import { UserPassword } from '../../components/Settings/UserPassword';

import './Settings.scss';

export const Settings = () => {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  
  return (
    <div className='settings'>
      <h1>Configuracion</h1>

      <div className="avatar-name">
        <UploadAvatar />
        <UserName 
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
        />
      </div>

      {/* <UserEmail 
        setContentModal={setContentModal}
        setTitleModal={setTitleModal}
      />
      
      <UserPassword 
        setContentModal={setContentModal}
        setTitleModal={setTitleModal}
      />

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        { contentModal }
      </BasicModal> */}
    </div>
  )
}


// TODO: error cuando da click en crear una artista se abren otros sliders