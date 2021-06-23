import React from 'react'
import { withTranslation } from 'react-i18next'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Col, Divider, Form, Icon, Input, notification, Row, Select, Switch, Tabs, Tooltip } from 'antd'
import { InfoIcon } from '../../../layouts/Private/components'
import { resetPasswordPromise } from '../../Login/promises'

class ModalContentCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      email: '',
      type: '',
      tipoServicio: [],
      login: '',
      password: null,
      token: null,
      status: 'ACTIVE',
      modules: [],
      empresas: null,
    }
  }

  async componentDidMount() {
    if (this.props.modalType === 'edit' || this.props.modalType === 'view') {
      const { form } = this.props
      this.setState({
        id: this.props.user.id,
        name: this.props.user.name,
        email: this.props.user.email,
        tipoServicio: this.props.user.tipoServicio !== null ? this.props.user.tipoServicio : [],
        type: this.props.user.type,
        login: this.props.user.login,
        status: this.props.user.status,
        token: this.props.user.ticket,
        modules: this.props.user.modules !== null ? this.props.user.modules : [],
        empresas: this.props.user.empresas !== null ? this.props.user.empresas : []
      })

      form.setFieldsValue({
        name: this.props.user.name,
        email: this.props.user.email,
        tipoServicio: this.props.user.tipoServicio !== null ? this.props.user.tipoServicio : [],
        type: this.props.user.type,
        status: this.props.user.status,
        login: this.props.user.login,
        token: this.props.user.ticket,
        empresas: this.props.user.empresas !== null ? this.props.user.empresas : []
      })
    }
  }

  handleOnChange = async (key, value) => {
    await this.setState({ [key]: value })
  }

  handleOnChangeType = (value) => {
    this.setState({ type: value })
  }

  handleOnChangeTipoServicio = (value) => {
    this.setState({ tipoServicio: value })
  }

  handleOnChangeStatus = (value) => {
    this.setState({ status: value })
  }

  handleOnChangeEmpresas = (empresas) => {
    let _emp = []
    if (empresas !== null) {
      for (let i = 0; i < empresas.length; i++) {
        _emp.push({ id: empresas[i] })
      }
    }
    this.setState({ empresas: _emp })
  }

  handleUsernameOnKeyDown = (e) => {
    const char = String.fromCharCode(e.which)

    if (e.which === 16) {
      e.preventDefault()
    } else {
      if (e.which !== 190 && e.which !== 8 && e.which !== 189) {
        if (!(/^[A-Za-z0-9_.]+$/.test(char))) {
          e.preventDefault()
        }
      }
    }
  }

  getOptionsUsers = () => {
    const { t, currentUser } = this.props
    let options = []

    options.push( <Select.Option value="ADMIN">{t('messages.aml.admin')}</Select.Option>)
    options.push( <Select.Option value="AUDIT">{t('messages.aml.audit')}</Select.Option>)
    options.push( <Select.Option value="SOPORTE">Soporte</Select.Option>)
    options.push( <Select.Option value="SUPERVISOR">Supervisor</Select.Option>)
    options.push( <Select.Option value="ANALISTA">Analista</Select.Option>)
    options.push( <Select.Option value="MOP">Mop</Select.Option>)
    if (this.state.tipoServicio === 'SERVICIO2'){
      options.push( <Select.Option value="APOYO">{"Apoyo a Campaña"}</Select.Option>)
      options.push( <Select.Option value="APROBADOR">{"Aprovador de Campaña"}</Select.Option>)
    }

    return options

  }

  handleCopyToClipboard = (id) => {
    const { t } = this.props

    let description = 'Copiado'

    if (id === 'username') {
      description = t('messages.aml.usernameCopiedToClipboard')
    }

    if (id === 'password') {
      description = t('messages.aml.passwordCopiedToClipboard')
    }

    notification['success']({
      message: t('messages.aml.notifications.succesfulOperation'),
      description
    })
  }

  handlePasswordReset = async () => {
    const { t } = this.props
    let login = this.props.user.fullUser
    const reset = await resetPasswordPromise(login)

    if (reset.success) {
      notification.success({
        message: t('messages.aml.successfulOperation'),
        description: t('messages.aml.checkYourEmail')
      })
    }
  }

  getEmpresas = (empresas) => {
    let _emp = []
    if (empresas != null) {
      for (let i = 0; i < empresas.length; i++) {
        if (empresas[i] !== null && empresas[i].id !== null && empresas[i].id !== undefined) {
          _emp.push(empresas[i].id)
        }
      }
    }
    return _emp
  }

  async handleSubmit(e) {
    e.preventDefault()

    const { form } = this.props

    form.validateFields(['name', 'email', 'type', 'tipoServicio', 'login'], { force: true });

    if (!this.state.name.length || !this.state.email.length || !this.state.type.length || !this.state.tipoServicio.length || !this.state.login.length) {
      notification['error']({
        message: 'Ha ocurrido un error',
        description: 'Uno o mas campos requeridos no han sido completados.'
      })
    } else {
      if (this.props.modalType === 'create') {
        await this.setState({
          password: this.props.password
        })
      }

      this.props.onOk(this.props.modalType, this.state)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { modalType } = this.props
    const { t } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Tabs type="card">
            <Tabs.TabPane tab={[<Icon type="info-circle" />, t('messages.aml.information')]} key="1">
              <Form className="modal-content-create" onSubmit={this.handleSubmit.bind(this)}>
                <Row gutter={[8]}>
                  <Col span={12}>
                    <Form.Item label={t('messages.aml.name')}>
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: t('messages.aml.nameMandatory'),
                          },
                        ],
                      })(<Input value={this.state.name} onChange={(e) => this.handleOnChange('name', e.target.value)} disabled={this.props.modalType === 'view'} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="E-mail">
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: t('messages.aml.emailNotValid'),
                          },
                          {
                            required: true,
                            message: t('messages.aml.emailMandatory'),
                          },
                        ],
                      })(
                        <Input
                          onChange={(e) => this.handleOnChange('email', e.target.value)}
                          value={this.state.email}
                          disabled={this.props.modalType === 'view'}
                        />
                      )
                      }
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[8]}>
                  <Col span={12}>
                    <Form.Item label={[t('messages.aml.serviceType')]}>
                      {getFieldDecorator('tipoServicio', {
                        rules: [
                          {
                            required: true,
                            message: t('messages.aml.serviceTypePlaceholder'),
                          },
                        ],
                      })(
                        <Select
                          className="type"
                          showSearch
                          placeholder={t('messages.aml.serviceTypePlaceholder')}
                          optionFilterProp="children"
                          mode="multiple"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(value) => this.handleOnChangeTipoServicio(value)}
                          value={this.state.tipoServicio}
                          disabled={this.props.modalType === 'view' || this.state.type === 'SADMIN'}
                        >
                              <Select.Option value="SERVICIO1">{t('messages.aml.service1')}</Select.Option>
                              <Select.Option value="SERVICIO2">{t('messages.aml.service2')}</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label={[t('messages.aml.userType')]}>
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            required: true,
                            message: t('messages.aml.typeMandatory'),
                          },
                        ],
                      })(
                        <Select
                          className="type"
                          showSearch
                          placeholder={t('messages.aml.typePlaceholder')}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(value) => this.handleOnChangeType(value)}
                          value={this.state.type}
                          disabled={this.props.modalType === 'view' || this.state.type === 'SADMIN'}
                        >
                            {
                              this.getOptionsUsers()
                            }
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  { this.props.modalType !== 'create' &&
                    <Col span={ 12 }>
                      <Form.Item label={ t('messages.aml.status') }>
                      { getFieldDecorator('status', {
                        rules: [
                          {
                            required: true,
                            message: t('messages.aml.status'),
                          },
                        ],
                      })(
                        <Select
                            placeholder={ t('messages.aml.status') }
                            onChange={ (value) => this.handleOnChangeStatus(value) }
                            value={ this.state.status }
                            disabled={ this.props.modalType === 'view' }
                          >
                            <Select.Option value="ACTIVE">{ t('messages.aml.rule.status.ACTIVE') }</Select.Option>
                            <Select.Option value="INACTIVE">{ t('messages.aml.rule.status.INACTIVE') }</Select.Option>
                          </Select>
                      )}
                        </Form.Item>
                    </Col>
                  }
                  {(this.props.currentUser.cliente.clientes.length > 0 && this.props.currentUser.cliente.outsourcer) &&
                    <Col span={this.props.modalType === 'create' ? 12 : 24}>
                      <Form.Item label={t('messages.aml.subclient')}>
                        <Select
                          className="subclient"
                          placeholder={t('messages.aml.selectSubclient')}
                          onChange={(value) => this.handleOnChangeEmpresas(value)}
                          value={this.getEmpresas(this.state.empresas)}
                          disabled={this.props.modalType === 'view'}
                          mode="multiple"
                        >
                          {this.props.currentUser.cliente.clientes.map((value, index) => {
                            return <Select.Option value={value.id}>{value.name}</Select.Option>
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  }
                </Row>
                {this.props.modalType === 'view' && this.props.user.type === 'SERVICIO' &&
                  <Row>
                    <Col span={24}>
                      <Form.Item label={t('messages.aml.token')}>
                        {getFieldDecorator('token', {
                          rules: [
                            {
                              message: t('messages.aml.token')
                            },
                          ],
                        })(
                          <div className="token-wrapper">
                            <Input value={this.state.token} className="token-input" disabled={true} />
                            <Tooltip placement="top" title={t('messages.aml.copyTokenToClipboard')}>
                              <CopyToClipboard text={this.state.token} onCopy={() => this.handleCopyToClipboard('token')}>
                                <Button type="primary">
                                  <Icon type="copy" />
                                </Button>
                              </CopyToClipboard>
                            </Tooltip>
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                }
                <Row className="login-username">
                  <Col xs={24}>
                    <h3>{t('messages.aml.loginCredentials')}</h3>
                    <p><strong className="ant-form-item-required"><span style={{ textDecoration: 'underline' }}>{t('messages.aml.username')}</span>:</strong> {t('messages.aml.usernameDescriptionP1')} <strong>{t('messages.aml.usernameDescriptionP2')}</strong>.</p>
                    <Form.Item className="username">
                      {getFieldDecorator('login', {
                        rules: [
                          {
                            required: true,
                            message: t('messages.aml.loginMandatory'),
                          }
                        ],
                      })(
                        <div className="username-wrapper">
                          <Input
                            id="username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            className="username-input"
                            maxlength="20"
                            onKeyDown={this.handleUsernameOnKeyDown}
                            onChange={(e) => this.handleOnChange('login', e.target.value.toLowerCase())}
                            value={this.state.login}
                            disabled={this.props.modalType === 'view'}
                          />
                          <span className="username-suffix">@{this.props.currentUser.cliente.abreviado}</span>
                          <Tooltip placement="top" title={t('messages.aml.copyUserToClipboard')}>
                            <CopyToClipboard text={this.state.login + '@' + this.props.currentUser.cliente.abreviado} onCopy={() => this.handleCopyToClipboard('username')}>
                              <Button type="primary">
                                <Icon type="copy" />
                              </Button>
                            </CopyToClipboard>
                          </Tooltip>
                        </div>
                      )
                      }
                    </Form.Item>
                    {modalType === 'create' &&
                      <div>
                        <Divider />
                        <p><strong><span style={{ textDecoration: 'underline' }}>{t('messages.aml.password')}</span>:</strong> {t('messages.aml.passwordDescriptionP1')}.</p>
                        <Form.Item className="password">
                          {getFieldDecorator('password')(
                            <div className="password-wrapper">
                              <div className="password-inner">
                                <Tooltip placement="top" title={t('messages.aml.copyPasswordToClipboard')}>
                                  <CopyToClipboard text={this.props.password} onCopy={() => this.handleCopyToClipboard('password')}>
                                    <Button type="primary">
                                      <Icon type="copy" />
                                    </Button>
                                  </CopyToClipboard>
                                </Tooltip>
                                <Input
                                  id="password"
                                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  className="password-input"
                                  value={this.props.password}
                                  disabled
                                />
                              </div>
                            </div>
                          )
                          }
                        </Form.Item>
                      </div>
                    }

                    {modalType === 'edit' &&
                      <div>
                        <Divider />
                        <p><strong><span style={{ textDecoration: 'underline' }}>{t('messages.aml.password')}</span> :</strong> {t('messages.aml.passwordEditDescriptionP1')}. <strong>{t('messages.aml.passwordDescriptionP2')}</strong>.</p>
                        <Form.Item className="password">
                          {getFieldDecorator('password')(
                            <div className="password-wrapper">
                              <div className="password-inner">
                                <Button type="primary" className="password-reset" onClick={this.handlePasswordReset.bind(this)}><Icon type="lock" /> {t('messages.aml.resetPassword')}</Button>
                              </div>
                            </div>
                          )
                          }
                        </Form.Item>
                      </div>
                    }
                  </Col>
                </Row>
              </Form>
            </Tabs.TabPane>
          </Tabs>
          <div className="ant-modal-footer">
            {this.props.modalType !== 'view' && <Button onClick={this.props.onCancel}>{t('messages.aml.cancel')}</Button>}
            {this.props.modalType !== 'view' ? <Button type="primary" htmlType="submit" className="login-form-button">{t('messages.aml.save')}</Button> : <Button onClick={() => this.props.onOk('view')} type="primary">Ok</Button>}
          </div>
        </Form>
      </div>
    )
  }
}

const WrappedTimeRelatedForm = Form.create({ name: 'create_new_user' })(ModalContentCreate)

export default withTranslation()(WrappedTimeRelatedForm)
