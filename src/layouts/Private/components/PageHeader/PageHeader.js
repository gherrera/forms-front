import './PageHeader.scss'
import React from 'react'
import { Icon, Row, Col } from 'antd'
import { Breadcrumbs } from '../'

export default ({ children, description, title, icon, breadcrumbs }) => (
  <Row className="page-header">
    <Col xs={24} sm={24} md={16} lg={14} xl={10} xxl={8}>
      { breadcrumbs &&
          <Breadcrumbs items={ breadcrumbs } />
      }
    </Col>
    <Col xs={24} sm={24} md={8} lg={10} xl={6} className="center">
      { icon &&
        <figure className="page-icon">
          <Icon type={ icon } />
        </figure>
      }
      <h1 className="page-title">{ title }</h1>
    </Col>
  </Row>
)
