import './Home.scss'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Col, Row, Timeline, Tooltip, Icon, Button, Badge, Spin, Card, Statistic, Table } from 'antd'
import { Page, PageBottomBar, PageContent, PageFooter, PageHeader, PageTopBar } from '../../layouts/Private/components'
import { statsPromise } from '../../promises'
import { getFormByClienteIdPromise } from '../Manage/promises'
import moment from "moment";

class Home extends Component {
  state = {
    stats: {},
    loading: true
  }

  async componentDidMount() {
    const { currentUser } = this.props
    statsPromise().then(r => {
      this.setState({
        stats: r,
        forms: null,
        loading: false
      })
    })
    getFormByClienteIdPromise(0, 5, {}).then(response => {
      this.setState({
        forms: response.records
      })
    })

  }

  columnsForms = [
      {
          title: 'Formulario',
          dataIndex: 'name',
          width: '30%'
      },
      {
        title: 'Destinatario',
        dataIndex: 'name',
        width: '30%',
        render: (text, record) => record.dest.name
    },
    {
          title: 'Folio',
          dataIndex: 'folio',
          width: '25%'
      },
      {   
          title: 'Fecha Recepción',
          dataIndex: 'sendDate',
          width: '25%',
          render: (text, record) => moment(text).format('DD.MM.YYYY HH:mm')
      }
  ]

  render() {
    const { t } = this.props
    const { stats, loading, forms } = this.state

    return (
      <div className="home">
        <Page>
          <PageContent>
            <Row gutter={26}>
              <Col span={5}>
                  <Card>
                    <Statistic title="Formularios creados" value={stats.formsCreated} loading={loading} />
                  </Card>
              </Col>
              <Col span={5}>
                <Card>
                  <Statistic title="Formularios recibidos" value={stats.formsReceived} loading={loading} />
                </Card>
              </Col>
              <Col span={14}>
                <Card title="Últimas 5 declaraciones recibidas" className="stats-forms">
                    { forms === null ? <Spin/>
                    :
                    <Table size="small" dataSource={forms} columns={this.columnsForms} pagination={false} />
                    }
                </Card>
              </Col>
            </Row>
          </PageContent>
        </Page>
      </div>
    )
  }
}

export default withTranslation()(withRouter(Home))
