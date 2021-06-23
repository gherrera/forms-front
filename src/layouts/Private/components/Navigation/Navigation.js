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
      <Menu.Item id="home-button">
        <Icon type='home' />{ t('messages.aml.homePageTitle') }
        <Link to={ '/' } />
      </Menu.Item>
      { currentUser.modules.includes('FORMS') && currentUser.type === 'ADMIN' &&
        <Menu.Item id="design">
          <Icon type='file-search' />Diseño
          <Link to={ '/design' } />
        </Menu.Item>
      }

    </Menu>
  )
}
