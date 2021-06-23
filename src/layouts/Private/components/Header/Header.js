import './Header.scss'
import React from 'react'
import { Layout, Col } from 'antd'
import { CurrentUser, Logo, Navigation } from '../'

const { Header } = Layout

export default ({ currentUser, logoutHandler  }) => (
  <Header id="header" theme="dark">
    <Col span={3}>
      <Logo currentUserId={ currentUser.id } />
    </Col>
    <Col span={3}>
      <CurrentUser
        currentUser={ currentUser }
        logoutHandler={ logoutHandler }
        />
    </Col>
    <Col span={18}>
      <Navigation currentUser={ currentUser } />
    </Col>
  </Header>
)
