import './Navigation.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'antd'

export default ({ currentUser }) => {
  const { t } = useTranslation()

  return (
    <Menu
      className="navigation"
      theme="light"
      mode="horizontal"
      >
      <Menu.Item id="home">
          Inicio
          <Link to={ '/' } />
      </Menu.Item>
      { currentUser.modules.includes('DESIGN') &&
        <Menu.Item id="design">
          Diseño
          <Link to={ '/design' } />
        </Menu.Item>
      }
      { currentUser.modules.includes('DEST') &&
        <Menu.Item id="recipíents">
          Destinatarios
        </Menu.Item>
      }
      { currentUser.modules.includes('FORMS') &&
        <Menu.Item id="manage">
          Gestión
          <Link to={ '/manage' } />
        </Menu.Item>
      }
      <Menu.Item id="report">
        Informes
      </Menu.Item>

    </Menu>
  )
}
