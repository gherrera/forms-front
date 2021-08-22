import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Col, Menu, Button, Dropdown, Icon } from 'antd'
import { CurrentUser, Logo, Navigation } from '../'

const { Header } = Layout

const dropdownMenuEstados = (
  <Menu>
    <Menu.Item>
      <Link to={ '/manage/RECIBIDO' }>
        Recibido
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ '/manage/PENDIENTE' }>
        Pendiente
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ '/manage/EVALUACION' }>
        En Evaluación
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ '/manage/CERRADO' }>
        Cerrado
      </Link>
    </Menu.Item>
  </Menu>
)

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
    <Col span={12}>
      <Navigation currentUser={ currentUser } />
    </Col>
    <Col span={6} className="menu-right">
      <Menu
        className="navigation"
        theme="light"
        mode="horizontal"
        >
        { currentUser.modules.includes('FORMS') &&
          <Menu.Item id="manage">
            <Dropdown overlay={ dropdownMenuEstados }>
                <Button type="link" ghost>
                  <Link to={ '/manage' }>
                  <span>Gestión</span>&nbsp;&nbsp;<Icon type="caret-down"/></Link>
                </Button>
            </Dropdown>
          </Menu.Item>
        }
        <Menu.Item id="report">
          Informes
        </Menu.Item>
      </Menu>
    </Col>
  </Header>
)
