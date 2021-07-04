import './PageHeader.scss'
import React from 'react'
import { Icon, Col } from 'antd'
import { Breadcrumbs } from '../'

export default ({ children, description, title, icon, breadcrumbs }) => (
  <div className="page-header">
    <Col span={7}>
      { breadcrumbs &&
          <Breadcrumbs items={ breadcrumbs } />
      }
    </Col>
    <Col span={10} className="center">
      { icon &&
        <figure className="page-icon">
          <Icon type={ icon } />
        </figure>
      }
      <h1 className="page-title">{ title }</h1>
    </Col>
  </div>
)
