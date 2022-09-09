import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom'
import { AddArtistForm, BasicModal } from '../';
import { ChangeViewModal } from '../../actions/uiActions';
import { isUserAdmin } from '../../utils';
import './MenuLeft.scss';

export const MenuLeft = () => {

  const { currentUser : user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  
  useEffect(() => {
    setActiveMenu( location.pathname );
  },[ location ])

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  }

  const handleModal = ( type ) => {
    switch(type) {
      case "artist":
        setTitleModal("Nuevo artista");
        setContentModal(<AddArtistForm />);
        dispatch( ChangeViewModal(true) )
        break;
      case "song":
        setTitleModal("Nueva canción");
        setContentModal(<h2>Formulario nueva cancion</h2>);
        dispatch( ChangeViewModal(true) )
        break;
      default:
       setTitleModal(null);
       setContentModal(null);
       dispatch( ChangeViewModal(false) )
    }
  }


  useEffect(() => {
    isUserAdmin(user.uid)
      .then(response => setUserAdmin(response));
  }, [user]);

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

      <BasicModal title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  )
}