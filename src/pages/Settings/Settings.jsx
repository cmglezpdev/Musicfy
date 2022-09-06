import React, { useState } from 'react'
import { UploadAvatar } from '../../components/Settings/UploadAvatar';
import { UserName } from '../../components/Settings/UserName';
import { BasicModal } from '../../components/Modal/BasicModal/BasicModal';

import './Settings.scss';
import { UserEmail } from '../../components/Settings/UserEmail';

export const Settings = ({ setReloadApp }) => {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  
  return (
    <div className='settings'>
      <h1>Configuracion</h1>

      <div className="avatar-name">
        <UploadAvatar 
          setReloadApp={setReloadApp} 
        />
        <UserName 
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp} 
        />
      </div>

      <UserEmail 
        setShowModal={setShowModal}
        setContentModal={setContentModal}
        setTitleModal={setTitleModal}
      />
      
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        { contentModal }
      </BasicModal>
    </div>
  )
}
