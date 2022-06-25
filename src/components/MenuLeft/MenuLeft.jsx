import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import './MenuLeft.scss';

export const MenuLeft = ({ user }) => {
  return (
      <Menu className='menu-left' vertical>
        <div className="top">
          <Menu.Item>
            <Icon name='home' /> Inicio
          </Menu.Item>
          <Menu.Item>
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