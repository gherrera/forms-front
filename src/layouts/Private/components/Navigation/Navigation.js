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
      { currentUser.modules.includes('FORMS') && currentUser.type === 'ADMIN' &&
        <Menu.Item id="design">
          Diseño
          <Link to={ '/design' } />
        </Menu.Item>
      }
      <Menu.Item id="recipíents">
        Destinatarios
      </Menu.Item>
      <Menu.Item id="request">
        Solicitud
      </Menu.Item>
      { currentUser.modules.includes('FORMS') && currentUser.type === 'ADMIN' &&
        <Menu.Item id="manage">
          Gestion
          <Link to={ '/manage' } />
        </Menu.Item>
      }
      <Menu.Item id="report">
        Informes
      </Menu.Item>

    </Menu>
  )
}
