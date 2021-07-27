import './Home.scss'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Col, Row, Timeline, Tooltip, Icon, Button, Badge, Spin } from 'antd'
import { Page, PageBottomBar, PageContent, PageFooter, PageHeader, PageTopBar } from '../../layouts/Private/components'


class Home extends Component {
  state = {

  }

  async componentDidMount() {
    const { currentUser } = this.props



  }



  render() {
    const { t } = this.props


    return (
      <div className="home">
        <Page>
          <PageHeader title="Inicio" description="Controle la información más importantes desde aquí." />
          <PageContent>

          </PageContent>
        </Page>
      </div>
    )
  }
}

export default withTranslation()(withRouter(Home))
