import './Home.scss'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Col, Row, Spin, Card, Statistic, Table, Tooltip } from 'antd'
import { Column } from '@ant-design/charts';
import { Page, PageContent } from '../../layouts/Private/components'
import { statsPromise } from '../../promises'
import { getFormByClienteIdPromise } from '../Manage/promises'
import moment from "moment";

class Home extends Component {
  state = {
    stats: {},
    loading: true,
    forms: null
  }

  async componentDidMount() {
    const { currentUser } = this.props
    statsPromise().then(r => {
      this.setState({
        stats: r,
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
          width: '50%',
          render: (text, record) => <Tooltip title={text}>{text}</Tooltip>
      },
      {
        title: 'Destinatario',
        dataIndex: 'name',
        width: '20%',
        render: (text, record) => record.dest.name
    },
    {
          title: 'Folio',
          dataIndex: 'folio',
          width: '15%'
      },
      {   
          title: 'Fecha Recepción',
          dataIndex: 'sendDate',
          width: '15%',
          render: (text, record) => moment(text).format('DD.MM.YYYY HH:mm')
      }
  ]

  getConfigChart() {
    return {
      data: this.state.stats.formsGroupDay,
      height: 180,
      xField: 'fecha',
      yField: 'cant',
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
      meta: {
        fecha: { alias: 'Fecha' },
        cant: { alias: 'Formularios' }
      }
    }
  };

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
              <Col span={24}>
                <Card title="Actividad en los últimos 30 días" className="stats-forms" loading={loading}>
                  { stats.formsGroupDay &&
                      <Column {...this.getConfigChart()} 
                      />
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
