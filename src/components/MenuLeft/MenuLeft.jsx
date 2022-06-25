import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { BasicModal } from '../Modal/BasicModal/BasicModal';

import { isUserAdmin } from '../../utils/Api';
import './MenuLeft.scss';

const MenuLeft = ({ user }) => {

  const [activeMenu, setActiveMenu] = useState(window.location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  }

  const handleModal = ( type ) => {
    switch(type) {
      case "artist":
        setTitleModal("Nuevo artista");
        setContentModal(<h2>Formulario nuevo artista</h2>);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nueva cancion");
        setContentModal(<h2>Formulario nueva cancion</h2>);
        setShowModal(true);
        break;
      default:
       setTitleModal(null);
       setContentModal(null);
       setShowModal(false); 
    }
  }


  useEffect(() => {
    isUserAdmin(user.uid)
      .then(response => setUserAdmin(response));
  }, [user]);

  console.log(userAdmin);

  return (
    <>
      <Menu className='menu-left' vertical>
        <div className="top">
          <Menu.Item as={Link} to="/" name="home" active={activeMenu === '/'} onClick={handleMenu}>
            <Icon name='home' /> Inicio
          </Menu.Item>
          <Menu.Item as={Link} to="/artists" name="artists" active={activeMenu === '/artists'} onClick={handleMenu}>
            <Icon name='music' /> Artistas
          </Menu.Item>
        </div>
        { userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handleModal("artist")}>
              <Icon name='plus square outline' /> Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => handleModal("song")}>
              <Icon name='plus square outline' /> Nueva Cancion
            </Menu.Item>
          </div>
        )}
          
      </Menu>

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  )
}

export default MenuLeft;