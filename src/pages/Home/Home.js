import './Home.scss'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Col, Row, Timeline, Spin, Card, Statistic, Table } from 'antd'
//import Plot from "react-plotly.js";
import { Line, Column } from '@ant-design/charts';
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
                    <>
                      <Column {...this.getConfigChart()} 
                        
                      />
                    {/*
                    <Plot
                      data={[
                        {
                          type: "bar",
                          x: stats.formsGroupDay.map((el) => el.fecha),
                          y: stats.formsGroupDay.map((el) => el.cant),
                          text: stats.formsGroupDay.map((el) => el.cant),
                          marker: {
                            color: 'rgba(157,195,230,1)',
                            opacity: 0.6,
                            line: {
                              color: 'rgb(8,48,107)',
                              width: 1.5
                            }
                          },
                          textposition: 'auto',
                          hoverinfo: 'none',
                        }
                      ]}
                      layout={{
                        margin: {
                          l: 50,
                          r: 40,
                          b: 50,
                          t: 10,
                        },
                        paper_bgcolor: "transparent",
                        plot_bgcolor: "transparent",
                        height: 200,
                        yaxis: {
                          title: {
                            text: 'Formularios recibidos'
                          }
                        },
                        barmode: 'stack'
                      }}
                      useResizeHandler={true}
                      style={{width: '100%', height: '100%'}}
                      config={{
                        displayModeBar: false, // this is the line that hides the plotly bar.
                      }}
                    ></Plot>
                    */
                    }
                    </>
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
