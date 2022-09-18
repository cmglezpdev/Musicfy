import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom'
import { AddArtistForm, AddAlbumForm ,BasicModal, AddSongForm } from '../';
import { closeModal, openModal, setModal } from '../../actions/uiActions';
import { isUserAdmin } from '../../utils';
import './MenuLeft.scss';

export const MenuLeft = () => {

  const { currentUser : user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  
  useEffect(() => {
    setActiveMenu( location.pathname );
  },[ location ])

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  }

  const handleModal = ( type ) => {
    switch(type) {
      case "artist":
        dispatch(setModal({
          titleModal: "New Artist",
          contentModal: <AddArtistForm />
        }))
        dispatch( openModal() )
        break;
      
      case "album":
        dispatch(setModal({
          titleModal: "New Album",
          contentModal: <AddAlbumForm />
        }))
        dispatch(openModal());
        break;

      case "song":
        dispatch(setModal({
          titleModal: "New Song",
          contentModal: <AddSongForm />
        }))
        dispatch( openModal() )
        break;

      default:
       dispatch( closeModal() )
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
            <Icon name='home' /> Home
          </Menu.Item>
          <Menu.Item as={Link} to="/artists" name="artists" active={activeMenu === '/artists'} onClick={handleMenu}>
            <Icon name='music' /> Artists
          </Menu.Item>
          <Menu.Item as={Link} to="/albums" name="albums" active={activeMenu === '/albums'} onClick={handleMenu}>
            <Icon name='window maximize outline' /> Albums
          </Menu.Item>
        </div>



        { userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handleModal("artist")}>
              <Icon name='plus square outline' /> New Artist
            </Menu.Item>
            <Menu.Item onClick={() => handleModal("album")}>
              <Icon name='plus square outline' /> New Album
            </Menu.Item>
            <Menu.Item onClick={() => handleModal("song")}>
              <Icon name='plus square outline' /> New Song
            </Menu.Item>
          </div>
        )}
          
      </Menu>

      <BasicModal />
    </>
  )
}