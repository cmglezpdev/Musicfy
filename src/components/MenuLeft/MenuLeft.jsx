import React, { useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './MenuLeft.scss';

const MenuLeft = ({ user }) => {

  const [activeMenu, setActiveMenu] = useState(window.location.pathname);

  const handleMenu = (e, menu) => {
    // console.log(menu);
    setActiveMenu(menu.to);
  }

  return (
      <Menu className='menu-left' vertical>
        <div className="top">
          <Menu.Item as={Link} to="/" name="home" active={activeMenu === '/'} onClick={handleMenu}>
            <Icon name='home' /> Inicio
          </Menu.Item>
          <Menu.Item as={Link} to="/artists" name="artists" active={activeMenu === '/artists'} onClick={handleMenu}>
            <Icon name='music' /> Artistas
          </Menu.Item>
        </div>
        <div className="footer">
          <Menu.Item>
            <Icon name='plus square outline' /> Nuevo Artista
          </Menu.Item>
          <Menu.Item>
            <Icon name='plus square outline' /> Nueva Cancion
          </Menu.Item>
          
        </div>
      </Menu>
  )
}

export default MenuLeft;