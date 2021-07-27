import './Login.scss'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Button, Col, Form, Icon, Input, notification, Row, Spin } from 'antd'
import { getAuthTokenPromise } from '../../promises'
import { resetPasswordPromise } from './promises'
import { authTokenSessionStorageSaverHelper } from '../../helpers'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    isRestore: false
  }

  handleUsernameOnChange(username) {
    this.setState({ username })
  }

  handlePasswordOnChange(password) {
    this.setState({ password })
  }

  validateFields(fields) {
    const { form } = this.props

    return form.validateFields(fields, { force: true })
  }

  async handleSubmit(e) {
    e.preventDefault()

    await this.validateFields(['username', 'password'])

    this.setState({ isLoading: true })

    const { username, password } = this.state

    const authToken = await getAuthTokenPromise(username, password)

    this.setState({ isLoading: false })

    if (!authToken.error) {
      await authTokenSessionStorageSaverHelper(authToken)

      const { successHandler } = this.props

      await successHandler()
    }
  }

  renderFormItem = (formItem) => {
    const { getFieldDecorator } = this.props.form

    return (
      <Form.Item label={ formItem.label }>
        { getFieldDecorator(formItem.name, { rules: formItem.rules })(formItem.item) }
      </Form.Item>
    )
  }

  async handleSwitchToRestore(e) {
    e.preventDefault()

    await this.setState({ isRestore: true })
  }

  async handleSwitchToLogin(e) {
    e.preventDefault()

    await this.setState({ isRestore: false })
  }

  async handleRestorePassword(e) {
    e.preventDefault()

    const { t } = this.props

    await this.validateFields(['username'])

    await this.setState({ isLoading: true })

    const login = document.getElementById('login_form_username').value
    const reset = await resetPasswordPromise(login)

    if (reset.success) {
      notification.success({
        message: t('messages.aml.successfulOperation'),
        description: t('messages.aml.checkYourEmail')
      })

      window.setTimeout(async () => {
        await this.setState({ isRestore: false })
      }, 4500)
    } else {
      notification.error({
        message: t('messages.aml.anErrorOcurred'),
        description: t('messages.aml.usernameDoesNotExists')
      })
    }

    await this.setState({ isLoading: false })
  }

  render() {
    const { t } = this.props
    const { isLoading, isRestore } = this.state

    return (
      <div className="login-page">
        <div id="DIV_1">
          <header id="HEADER_2">
            <p id="P_3">
              <a href="https://htgsoluciones.com/" rel="home" id="A_4"></a>
            </p>
            <div id="DIV_5">
              <div id="DIV_6">
                <div id="DIV_7">
                  <header id="HEADER_8">
                    <div id="DIV_9">
                      <div id="DIV_10">
                        <div id="DIV_11">
                          <div id="DIV_12">
                            <div id="DIV_13">
                              <div id="DIV_14">
                                <div id="DIV_15">
                                  <div id="DIV_16">
                                    <img width="1573" height="306" src="https://htgsoluciones.com/wp-content/uploads/2021/07/Logo-e1627334345137.png" alt="" id="IMG_17" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_18">
                          <div id="DIV_19">
                            <div id="DIV_20">
                              <div id="DIV_21">
                                <div id="DIV_22">
                                  <div id="DIV_23">
                                    <div id="DIV_24">
                                      <div id="DIV_25">
                                        <i id="I_26"></i>
                                      </div>
                                    </div>
                                    <nav>
                                      <ul id="UL_28">
                                        <li id="LI_29">
                                          <a href="https://htgsoluciones.com/formularia/#funciona" id="A_30">¿Cómo funciona?</a>
                                        </li>
                                        <li id="LI_31">
                                          <a href="#SECTION_181" id="A_32">Inicia sesión</a>
                                        </li>
                                        <li id="LI_33">
                                          <a href="https://htgsoluciones.com/formularia/#contacto" id="A_34">Servicio al cliente</a>
                                        </li>
                                      </ul>
                                    </nav>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </div>
            </div>
          </header>
          <div id="DIV_35">
            <div id="DIV_36">
              <div id="DIV_37">
                <section id="SECTION_38">
                  <div id="DIV_39">
                  </div>
                  <div id="DIV_40">
                    <div id="DIV_41">
                      <div id="DIV_42">
                        <div id="DIV_43">
                          <div id="DIV_44">
                            <div id="DIV_45">
                              <div id="DIV_46">
                                <h2 id="H2_47">
                                  La forma mas fácil de diseñar <span id="SPAN_48">cualquier tipo</span> <span id="SPAN_49">de FORMULARIO</span>
                                </h2>
                              </div>
                            </div>
                            <section id="SECTION_50">
                              <div id="DIV_51">
                                <div id="DIV_52">
                                  <div id="DIV_53">
                                    <div id="DIV_54">
                                      <div id="DIV_55">
                                        <div id="DIV_56">
                                          <div id="DIV_57">
                                            <div id="DIV_58">
                                              <img src="https://htgsoluciones.com/wp-content/uploads/elementor/thumbs/Icono-Formulario-Naranjo-version-5-panhw7ghiho02f5gj67lmwwq85vtfjb1op0f34dg1g.png" alt="Icono Formulario Naranjo versión 5" id="IMG_59" />
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_60">
                                          <div id="DIV_61">
                                            <div id="DIV_62">
                                              <div id="DIV_63">
                                                <h3 id="H3_64">
                                                  <span id="SPAN_65">Crea</span>
                                                </h3>
                                                <p id="P_66">
                                                  Diseña tus formularios a medida sin restricciones, accede a una galería de tipos de secciones y campos precargados. Visualiza tu formulario en cualquier momento y modifícalo cuando lo necesites.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_67">
                                    <div id="DIV_68">
                                      <div id="DIV_69">
                                        <div id="DIV_70">
                                          <div id="DIV_71">
                                            <div id="DIV_72">
                                              <img src="https://htgsoluciones.com/wp-content/uploads/elementor/thumbs/Icono-Formulario-Naranjo-version-5-panhw7ghiho02f5gj67lmwwq85vtfjb1op0f34dg1g.png" alt="Icono Formulario Naranjo versión 5" id="IMG_73" />
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_74">
                                          <div id="DIV_75">
                                            <div id="DIV_76">
                                              <div id="DIV_77">
                                                <h3 id="H3_78">
                                                  <span id="SPAN_79">Envía</span>
                                                </h3>
                                                <p id="P_80">
                                                  Solicita formularios a distintas categorías. Integra tus necesidades con nuestra plataforma vía APIs. Envía recordatorios a solicitud o define un parámetro de tiempo. Haz seguimiento en línea al avance.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_81">
                                    <div id="DIV_82">
                                      <div id="DIV_83">
                                        <div id="DIV_84">
                                          <div id="DIV_85">
                                            <div id="DIV_86">
                                              <img src="https://htgsoluciones.com/wp-content/uploads/elementor/thumbs/Icono-Formulario-Naranjo-version-5-panhw7ghiho02f5gj67lmwwq85vtfjb1op0f34dg1g.png" alt="Icono Formulario Naranjo versión 5" id="IMG_87" />
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_88">
                                          <div id="DIV_89">
                                            <div id="DIV_90">
                                              <div id="DIV_91">
                                                <h3 id="H3_92">
                                                  <span id="SPAN_93">Gestiona</span>
                                                </h3>
                                                <p id="P_94">
                                                  Administra los formularios desde el envío hasta que son completados. Descarga los comprobantes o la información contenida si la necesitas. Visualiza la información en la plataforma o intégrala con tus sistemas.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="SECTION_95">
                  <div id="DIV_96">
                    <div id="DIV_97">
                      <div id="DIV_98">
                        <div id="DIV_99">
                          <div id="DIV_100">
                            <div id="DIV_101">
                              <div id="DIV_102">
                                <h4 id="H4_103">
                                  ¿Cómo Funciona?
                                </h4>
                              </div>
                            </div>
                            <section id="SECTION_104">
                              <div id="DIV_105">
                                <div id="DIV_106">
                                  <div id="DIV_107">
                                    <div id="DIV_108">
                                      <div id="DIV_109">
                                        <div id="DIV_110">
                                          <div id="DIV_111">
                                            <div id="DIV_112">
                                              <img width="300" height="225" src="https://htgsoluciones.com/wp-content/uploads/2021/07/port6-300x225.jpg" alt="" id="IMG_113" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_114">
                                    <div id="DIV_115">
                                      <div id="DIV_116">
                                        <div id="DIV_117">
                                          <div id="DIV_118">
                                            <h2 id="H2_119">
                                              Desarrolla tus propios formularios
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_120">
                                          <div id="DIV_121">
                                            <div id="DIV_122">
                                              <p id="P_123">
                                                Utiliza nuestro módulo de diseño para digitalizar cualquier tipo de formulario o crear uno nuevo en funcion de tus necesidades de información.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_124">
                                    <div id="DIV_125">
                                      <div id="DIV_126">
                                        <div id="DIV_127">
                                          <div id="DIV_128">
                                            <h2 id="H2_129">
                                              Galería de campos y secciones a tu disposición
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_130">
                                          <div id="DIV_131">
                                            <div id="DIV_132">
                                              Cuentas con una diversidad de campos listos para utilizar. Secciones prediseñadas para ahorrar tiempo. Sólo requieres incorporar el texto que necesites y definir los campos que lo componen.
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section id="SECTION_133">
                              <div id="DIV_134">
                                <div id="DIV_135">
                                  <div id="DIV_136">
                                    <div id="DIV_137">
                                      <div id="DIV_138">
                                        <div id="DIV_139">
                                          <div id="DIV_140">
                                            <h2 id="H2_141">
                                              Envía las solicitudes a quien necesites
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_142">
                                          <div id="DIV_143">
                                            <div id="DIV_144">
                                              Haz seguimiento a los formularios que enviaste o manda recordatorios. Mantén trazabilidad de cada actividad realizada.
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_145">
                                    <div id="DIV_146">
                                      <div id="DIV_147">
                                        <div id="DIV_148">
                                          <div id="DIV_149">
                                            <div id="DIV_150">
                                              <img width="300" height="250" src="https://htgsoluciones.com/wp-content/uploads/2021/07/welcome6-300x250.jpg" alt="" id="IMG_151" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_152">
                                    <div id="DIV_153">
                                      <div id="DIV_154">
                                        <div id="DIV_155">
                                          <div id="DIV_156">
                                            <h2 id="H2_157">
                                              Comprobantes y datos a tu disposición
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_158">
                                          <div id="DIV_159">
                                            <div id="DIV_160">
                                              Lo declarado se registra en un comprobante en formato pdf. Así mismo tienes acceso inmediato a la datos registrados.
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section id="SECTION_161">
                              <div id="DIV_162">
                                <div id="DIV_163">
                                  <div id="DIV_164">
                                    <div id="DIV_165">
                                      <div id="DIV_166">
                                        <div id="DIV_167">
                                          <div id="DIV_168">
                                            <h2 id="H2_169">
                                              Automatiza la entrada y salida de datos
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_170">
                                          <div id="DIV_171">
                                            <div id="DIV_172">
                                              <p id="P_173">
                                                Integra tus plataformas con Formularia, registra tus destinatarios enviado la información vía API, así mismo la totalidad de la información completada en los formularios la cual puede ser envíada por esta misma vía directamente a tus sistemas.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_174">
                                    <div id="DIV_175">
                                      <div id="DIV_176">
                                        <div id="DIV_177">
                                          <div id="DIV_178">
                                            <div id="DIV_179">
                                              <img width="300" height="250" src="https://htgsoluciones.com/wp-content/uploads/2021/07/welcome6-300x250.jpg" alt="" id="IMG_180" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="SECTION_181">
                  <Form onSubmit={ isRestore ? this.handleRestorePassword.bind(this) : this.handleSubmit.bind(this) } className="login-form">
                    <div id="DIV_182">
                    </div>
                    <div id="DIV_183">
                      <div id="DIV_184">
                        <div id="DIV_185">
                          <div id="DIV_186">
                            <div id="DIV_187">
                            </div>
                          </div>
                        </div>
                        <div id="DIV_188">
                          <div id="DIV_189">
                            <div id="DIV_190">
                              <div id="DIV_191">
                                <div id="DIV_192">
                                  <h1 id="H1_193">
                                    Inicia Sesión
                                  </h1>
                                </div>
                              </div>
                              <div id="DIV_194">
                                <div id="DIV_195">
                                  <div id="DIV_196">
                                    <span id="SPAN_197"></span>
                                  </div>
                                </div>
                              </div>
                              <div id="DIV_198">
                                <div id="DIV_199">
                                  <div id="DIV_200">
                                    Bienvenido a Formularia, a continuación ingrese su correo electrónico y contraseña
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_201">
                          <div id="DIV_202">
                            <div id="DIV_203">
                              <section id="SECTION_204">
                                <div id="DIV_205">
                                  <div id="DIV_206">
                                    <div id="DIV_207">
                                      <div id="DIV_208">
                                        <div id="DIV_209">
                                          <div id="DIV_210">
                                            <div id="DIV_211">
                                              <div id="DIV_212">
                                                <img width="704" height="88" src="https://htgsoluciones.com/wp-content/uploads/2021/07/Texto-Logo-e1627334600382-1024x128.png" alt="" id="IMG_213" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section id="SECTION_214">
                                <div id="DIV_215">
                                  <div id="DIV_216">
                                    <div id="DIV_217">
                                      <div id="DIV_218">
                                        <div id="DIV_219">
                                          <div id="DIV_220">
                                            <div id="DIV_221">
                                            {
                                              this.renderFormItem({
                                                name: 'username',
                                                rules: [{ required: true, message: t('messages.aml.dontForgetUsername') }],
                                                item: (
                                                  <Input
                                                    disabled={ false }
                                                    onChange={ (e) => this.handleUsernameOnChange.bind(this)(e.target.value) }
                                                    placeholder={ t('messages.aml.username') }
                                                    />
                                                )
                                              })
                                            }
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <div id="DIV_223">
                                <div id="DIV_224">
                                  <div id="DIV_225">
                                    <span id="SPAN_226"></span>
                                  </div>
                                </div>
                              </div>
                              { !isRestore &&
                                <>
                                <section id="SECTION_227">
                                  <div id="DIV_228">
                                    <div id="DIV_229">
                                      <div id="DIV_230">
                                        <div id="DIV_231">
                                          <div id="DIV_232">
                                            <div id="DIV_233">
                                              <div id="DIV_234">
                                              {
                                                this.renderFormItem({
                                                  name: 'password',
                                                  rules: [{ required: true, message: t('messages.aml.dontForgetPassword') }],
                                                  item: (
                                                    <Input
                                                      onChange={ (e) => this.handlePasswordOnChange.bind(this)(e.target.value) }
                                                      type="password"
                                                      autoComplete="off"
                                                      placeholder={ t('messages.aml.password') }
                                                      />
                                                  )
                                                })
                                              }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <section id="SECTION_236">
                                  <div id="DIV_237">
                                    <div id="DIV_238">
                                      <div id="DIV_239">
                                        <div id="DIV_240">
                                          <div id="DIV_241">
                                            <div id="DIV_242">
                                              <div id="DIV_243">
                                                <div id="DIV_244">
                                                  <span id="SPAN_245"></span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </>
                              }
                              
                              <div id="DIV_246">
                                <div id="DIV_247">
                                  <div id="DIV_248">
                                    <Button id="A_249" className="login-form-button" htmlType="submit">Ingresar</Button>
                                  </div>
                                </div>
                              </div>
                              <div id="DIV_252">
                                <div id="DIV_253">
                                  <div id="DIV_254">
                                    { !isRestore && <a href='#' id="A_255" onClick={ this.handleSwitchToRestore.bind(this) }>{ t('messages.aml.forgotYourPassword') }</a> }
                                    { isRestore && <a href='#' id="A_255" onClick={ this.handleSwitchToLogin.bind(this) }>{ t('messages.aml.backToLogin') }</a> }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_258">
                          <div id="DIV_259">
                            <div id="DIV_260">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </section>
                <section id="SECTION_261">
                  <div id="DIV_262">
                    <div id="DIV_263">
                      <div id="DIV_264">
                        <div id="DIV_265">
                          <div id="DIV_266">
                            <div id="DIV_267">
                              <div id="DIV_268">
                                <div id="DIV_269">
                                  <div id="DIV_270">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="SECTION_271">
                  <div id="DIV_272">
                  </div>
                  <div id="DIV_273">
                    <div id="DIV_274">
                      <div id="DIV_275">
                        <div id="DIV_276">
                          <div id="DIV_277">
                            <div id="DIV_278">
                              <div id="DIV_279">
                                <div id="DIV_280">
                                  ¿Tienes una pregunta?
                                </div>
                              </div>
                            </div>
                            <div id="DIV_281">
                              <div id="DIV_282">
                                <h1 id="H1_283">
                                  Contáctanos
                                </h1>
                              </div>
                            </div>
                            <div id="DIV_284">
                              <div id="DIV_285">
                                <div id="DIV_286">
                                  <p id="P_287">
                                    Escríbenos a:
                                  </p>
                                  <p id="P_288">
                                    soporte@htgsoluciones.com
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div id="DIV_289">
                              <div id="DIV_290">
                                <div id="DIV_291">
                                  <p id="P_292">
                                    ó envíanos un mensajes a través de nuestro formulario de contacto
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_293">
                        <div id="DIV_294">
                          <div id="DIV_295">
                          </div>
                          <div id="DIV_296">
                            <section id="SECTION_297">
                              <div id="DIV_298">
                                <div id="DIV_299">
                                  <div id="DIV_300">
                                    <div id="DIV_301">
                                      <div id="DIV_302">
                                        <div id="DIV_303">
                                          <div id="DIV_304">
                                            <h2 id="H2_305">
                                              Nombre
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_306">
                                          <div id="DIV_307">
                                            <div id="DIV_308">
                                              <span id="SPAN_309"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section id="SECTION_310">
                              <div id="DIV_311">
                                <div id="DIV_312">
                                  <div id="DIV_313">
                                    <div id="DIV_314">
                                      <div id="DIV_315">
                                        <div id="DIV_316">
                                          <div id="DIV_317">
                                            <h2 id="H2_318">
                                              Correo Electrónico
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_319">
                                          <div id="DIV_320">
                                            <div id="DIV_321">
                                              <span id="SPAN_322"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_323">
                                    <div id="DIV_324">
                                      <div id="DIV_325">
                                        <div id="DIV_326">
                                          <div id="DIV_327">
                                            <h2 id="H2_328">
                                              Teléfono
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_329">
                                          <div id="DIV_330">
                                            <div id="DIV_331">
                                              <span id="SPAN_332"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section id="SECTION_333">
                              <div id="DIV_334">
                                <div id="DIV_335">
                                  <div id="DIV_336">
                                    <div id="DIV_337">
                                      <div id="DIV_338">
                                        <div id="DIV_339">
                                          <div id="DIV_340">
                                            <h2 id="H2_341">
                                              Escribe tu mensaje a continuación
                                            </h2>
                                          </div>
                                        </div>
                                        <div id="DIV_342">
                                          <div id="DIV_343">
                                            <div id="DIV_344">
                                              <span id="SPAN_345"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <div id="DIV_346">
                              <div id="DIV_347">
                                <div id="DIV_348">
                                  <a href="https://htgsoluciones.com/formularia/#" id="A_349"> <span id="SPAN_350"> <span id="SPAN_351">Enviar</span></span></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <footer id="FOOTER_352">
            <div id="DIV_353">
              <div id="DIV_354">
                <div id="DIV_355">
                  <div id="DIV_356">
                    <section id="SECTION_357">
                      <div id="DIV_358">
                        <div id="DIV_359">
                          <div id="DIV_360">
                            <div id="DIV_361">
                              <div id="DIV_362">
                                <section id="SECTION_363">
                                  <div id="DIV_364">
                                    <div id="DIV_365">
                                      <div id="DIV_366">
                                        <div id="DIV_367">
                                          <div id="DIV_368">
                                            <div id="DIV_369">
                                              <div id="DIV_370">
                                                <div id="DIV_371">
                                                  <img width="300" height="103" src="https://htgsoluciones.com/wp-content/uploads/2021/07/logo-white-e1627335689960-300x103.png" alt="" id="IMG_372" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div id="DIV_373">
                                        <div id="DIV_374">
                                          <div id="DIV_375">
                                            <div id="DIV_376">
                                              <div id="DIV_377">
                                                <div id="DIV_378">
                                                  <img width="704" height="137" src="https://htgsoluciones.com/wp-content/uploads/2021/07/Logo-e1627334345137-1024x199.png" alt="" id="IMG_379" />
                                                </div>
                                              </div>
                                            </div>
                                            <div id="DIV_380">
                                              <div id="DIV_381">
                                                <div id="DIV_382">
                                                  <p id="P_383">
                                                    Es una plataforma creada por HTG Soluciones, empresa que busca proponer iniciativas de transformación digital enfocada en optimizar los de procesos de tu negocio.
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div id="DIV_384">
                                        <div id="DIV_385">
                                          <div id="DIV_386">
                                            <div id="DIV_387">
                                              <div id="DIV_388">
                                                <h2 id="H2_389">
                                                  Solicite una<br id="BR_390" />demostración
                                                </h2>
                                              </div>
                                            </div>
                                            <div id="DIV_391">
                                              <div id="DIV_392">
                                                <h2 id="H2_393">
                                                  Comuníquese con nosotros:
                                                </h2>
                                              </div>
                                            </div>
                                            <div id="DIV_394">
                                              <div id="DIV_395">
                                                <ul id="UL_396">
                                                  <li id="LI_397">
                                                    <span id="SPAN_398"><Icon size="small" type="mail"/></span>
                                                    <span id="SPAN_400">contacto@htgsoluciones.com</span>
                                                  </li>
                                                  <li id="LI_401">
                                                    <span id="SPAN_402"><Icon size="small" type="phone"/></span>
                                                    <span id="SPAN_404">+56-9-7910000</span>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div id="DIV_405">
                                        <div id="DIV_406">
                                          <div id="DIV_407">
                                            <div id="DIV_408">
                                              <div id="DIV_409">
                                                <h4 id="H4_410">
                                                  Copyright © - HTG Soluciones - Todos los derechos reservados
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

const LoginForm = Form.create({ name: 'login_form' })(Login)


export default withTranslation()(withRouter(LoginForm))
