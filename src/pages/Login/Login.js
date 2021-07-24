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
      <div id="DIV_1">
        <div id="DIV_2">
          <header id="HEADER_3">
            <div id="DIV_4">
              <div id="DIV_5">
                <wix id="WIX-DROPDOWN-MENU_6">
                  <nav id="NAV_7">
                    <ul id="UL_8">
                      <li id="LI_9">
                        <a href="https://guillermomz13.wixsite.com/formularia" id="A_10"></a>
                        <div id="DIV_11">
                          <div id="DIV_12">
                            <p id="P_13">
                              Inicio
                            </p>
                          </div>
                        </div>
                      </li>
                      <li id="LI_14">
                        <a href="https://guillermomz13.wixsite.com/formularia" id="A_15"></a>
                        <div id="DIV_16">
                          <div id="DIV_17">
                            <p id="P_18">
                              ¿Como funciona?
                            </p>
                          </div>
                        </div>
                      </li>
                      <li id="LI_19">
                        <a href="https://guillermomz13.wixsite.com/formularia" id="A_20"></a>
                        <div id="DIV_21">
                          <div id="DIV_22">
                            <p id="P_23">
                              Inicia sesión
                            </p>
                          </div>
                        </div>
                      </li>
                      <li id="LI_24">
                        <a href="https://guillermomz13.wixsite.com/formularia" id="A_25"></a>
                        <div id="DIV_26">
                          <div id="DIV_27">
                            <p id="P_28">
                              Servicio al Cliente
                            </p>
                          </div>
                        </div>
                      </li>
                      <li id="LI_29">
                        <div id="DIV_30">
                          <div id="DIV_31">
                            <div id="DIV_32">
                              <p id="P_33">
                                More
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div id="DIV_34">
                      <ul id="UL_35">
                      </ul>
                    </div>
                  </nav>
                </wix>
              </div>
            </div>
            <div id="DIV_36">
              <div id="DIV_37">
                <div id="DIV_38">
                </div>
              </div>
              <div id="DIV_39">
                <div id="DIV_40">
                  <div id="DIV_41">
                  </div>
                </div>
                <div id="DIV_42">
                  <div id="DIV_43">
                    <div id="DIV_44">
                      <div id="DIV_45">
                        <div id="DIV_46">
                          <div id="DIV_47">
                            <div id="DIV_48">
                              <div id="DIV_49">
                                <wix id="WIX-IMAGE_50">
                                  <img src="https://static.wixstatic.com/media/49febd_9d9255a449f74179a534028d70cc186f~mv2.png/v1/fill/w_57,h_58,al_c,q_85,usm_0.66_1.00_0.01/Icono%20Formulario%20Naranjo%20versi%C3%B3n%205.webp" alt="Icono Formulario Naranjo versión 5.png" id="IMG_51" />
                                </wix>
                              </div>
                            </div>
                            <div id="DIV_52">
                              <h2 id="H2_53">
                                <span id="SPAN_54"><span id="SPAN_55"><span id="SPAN_56">f</span></span></span><span id="SPAN_57"><span id="SPAN_58"><span id="SPAN_59">ormu</span><span id="SPAN_60">laria</span></span></span>
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div id="DIV_61">
          </div>
          <main id="MAIN_62">
            <div id="DIV_63">
              <div id="DIV_64">
                <div id="DIV_65">
                </div>
                <div id="DIV_66">
                  <div id="DIV_67">
                    <div id="DIV_68">
                      <div id="DIV_69">
                        <section id="SECTION_70">
                          <div id="DIV_71">
                            <div id="DIV_72">
                            </div>
                            <div id="DIV_73">
                            </div>
                          </div>
                          <div id="DIV_74">
                            <div id="DIV_75">
                              <div id="DIV_76">
                                <div id="DIV_77">
                                </div>
                                <wix id="WIX-BG-MEDIA_78">
                                  <wix id="WIX-IMAGE_79">
                                    <img src="https://static.wixstatic.com/media/49febd_edcfa7edb1574786b1ac3ed2155bc0af~mv2.jpg/v1/fill/w_1200,h_663,al_c,q_85/49febd_edcfa7edb1574786b1ac3ed2155bc0af~mv2.webp" alt="Imagen 1.jpg" id="IMG_80" />
                                  </wix>
                                </wix>
                              </div>
                              <div id="DIV_81">
                                <div id="DIV_82">
                                  <div id="DIV_83">
                                    <h1 id="H1_84">
                                      <span id="SPAN_85">La forma mas fácil de diseñar</span> <span id="SPAN_86">cualquier tipo</span> <span id="SPAN_87">de FORMULARIO</span>
                                    </h1>
                                  </div>
                                  <div id="DIV_88">
                                    <div id="DIV_89">
                                      <div id="DIV_90">
                                        <div id="DIV_91">
                                          <h6 id="H6_92">
                                            <span id="SPAN_93">Administra la información</span>
                                          </h6>
                                        </div>
                                        <div id="DIV_94">
                                          <h6 id="H6_95">
                                            <span id="SPAN_96">Gestiona el envío</span>
                                          </h6>
                                        </div>
                                        <div id="DIV_97">
                                          <div id="DIV_98">
                                            <svg id="svg_99">
                                              <g id="g_100">
                                                <path id="path_101">
                                                </path>
                                              </g>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_102">
                                    <div id="DIV_103">
                                      <svg id="svg_104">
                                        <g id="g_105">
                                          <path id="path_106">
                                          </path>
                                          <path id="path_107">
                                          </path>
                                          <path id="path_108">
                                          </path>
                                          <path id="path_109">
                                          </path>
                                        </g>
                                      </svg>
                                    </div>
                                  </div>
                                  <div id="DIV_110">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section id="SECTION_111">
                          <div id="DIV_112">
                            <div id="DIV_113">
                            </div>
                            <div id="DIV_114">
                            </div>
                          </div>
                          <div id="DIV_115">
                            <div id="DIV_116">
                              <div id="DIV_117">
                                <div id="DIV_118">
                                </div>
                                <div id="DIV_119">
                                </div>
                              </div>
                              <div id="DIV_120">
                                <div id="DIV_121">
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section id="SECTION_122">
                          <div id="DIV_123">
                            <div id="DIV_124">
                            </div>
                            <div id="DIV_125">
                            </div>
                          </div>
                          <div id="DIV_126">
                            <div id="DIV_127">
                              <div id="DIV_128">
                                <div id="DIV_129">
                                </div>
                                <div id="DIV_130">
                                </div>
                              </div>
                              <div id="DIV_131">
                                <div id="DIV_132">
                                  <div id="DIV_133">
                                    <div id="DIV_134">
                                      <div id="DIV_135">
                                        <div id="DIV_136">
                                          <div id="DIV_137">
                                            <wix id="WIX-IMAGE_138">
                                              <img src="https://static.wixstatic.com/media/49febd_9d9255a449f74179a534028d70cc186f~mv2.png/v1/fill/w_57,h_58,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Formulario%20Naranjo%20versi%C3%B3n%205.png" alt="Icono Formulario Naranjo versión 5.png" id="IMG_139" />
                                            </wix>
                                          </div>
                                        </div>
                                        <div id="DIV_140">
                                          <h2 id="H2_141">
                                            <span id="SPAN_142"><span id="SPAN_143"><span id="SPAN_144">c</span></span></span><span id="SPAN_145"><span id="SPAN_146"><span id="SPAN_147">REA</span></span></span>
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_148">
                                    <p id="P_149">
                                      Diseña tus formularios a medida sin restricciones, accede a una galería de tipos de secciones y campos precargados. Visualiza tu formulario en cualquier momento y modifícalo cuando lo necesites.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="DIV_150">
                              <div id="DIV_151">
                                <div id="DIV_152">
                                </div>
                                <div id="DIV_153">
                                </div>
                              </div>
                              <div id="DIV_154">
                                <div id="DIV_155">
                                  <div id="DIV_156">
                                    <div id="DIV_157">
                                      <div id="DIV_158">
                                        <div id="DIV_159">
                                          <div id="DIV_160">
                                            <wix id="WIX-IMAGE_161">
                                              <img src="https://static.wixstatic.com/media/49febd_9d9255a449f74179a534028d70cc186f~mv2.png/v1/fill/w_57,h_58,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Formulario%20Naranjo%20versi%C3%B3n%205.png" alt="Icono Formulario Naranjo versión 5.png" id="IMG_162" />
                                            </wix>
                                          </div>
                                        </div>
                                        <div id="DIV_163">
                                          <h2 id="H2_164">
                                            <span id="SPAN_165"><span id="SPAN_166"><span id="SPAN_167">E</span></span></span><span id="SPAN_168"><span id="SPAN_169"><span id="SPAN_170">nvía</span></span></span>
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_171">
                                    <p id="P_172">
                                      Solicita formularios a distintas categorías. Integra tus necesidades con nuestra plataforma vía APIs. Envía recordatorios a solicitud o define un parámetro de tiempo. Haz seguimiento en línea al avance.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="DIV_173">
                              <div id="DIV_174">
                                <div id="DIV_175">
                                </div>
                                <div id="DIV_176">
                                </div>
                              </div>
                              <div id="DIV_177">
                                <div id="DIV_178">
                                  <div id="DIV_179">
                                    <div id="DIV_180">
                                      <div id="DIV_181">
                                        <div id="DIV_182">
                                          <div id="DIV_183">
                                            <wix id="WIX-IMAGE_184">
                                              <img src="https://static.wixstatic.com/media/49febd_9d9255a449f74179a534028d70cc186f~mv2.png/v1/fill/w_57,h_58,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Formulario%20Naranjo%20versi%C3%B3n%205.png" alt="Icono Formulario Naranjo versión 5.png" id="IMG_185" />
                                            </wix>
                                          </div>
                                        </div>
                                        <div id="DIV_186">
                                          <h2 id="H2_187">
                                            <span id="SPAN_188"><span id="SPAN_189"><span id="SPAN_190">G</span></span></span><span id="SPAN_191"><span id="SPAN_192"><span id="SPAN_193">estiona</span></span></span>
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_194">
                                    <p id="P_195">
                                      Administra los formularios desde el envío hasta que son completados. Descarga los comprobantes o la información contenida si la necesitas. Visualiza la información en la plataforma o intégrala con tus sistemas.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div id="DIV_196">
                          <div id="DIV_197">
                            <wix id="WIX-IMAGE_198">
                              <img src="https://static.wixstatic.com/media/49febd_05b04cb3e7c1418faec4bc8056a594bf~mv2.jpg/v1/fill/w_235,h_157,al_c,q_80,usm_0.66_1.00_0.01,blur_2/Imagen%208.jpg" alt="Imagen 8.jpg" id="IMG_199" />
                            </wix>
                          </div>
                        </div>
                        <div id="DIV_200">
                        </div>
                        <section id="SECTION_201">
                          <div id="DIV_202">
                            <div id="DIV_203">
                            </div>
                            <div id="DIV_204">
                            </div>
                          </div>
                          <div id="DIV_205">
                            <div id="DIV_206">
                              <div id="DIV_207">
                                <div id="DIV_208">
                                </div>
                                <wix id="WIX-BG-MEDIA_209">
                                  <wix id="WIX-IMAGE_210">
                                    <img src="https://static.wixstatic.com/media/49febd_1850fcc2c0dd4f49b9c9e4ec84891469~mv2.jpg/v1/fill/w_530,h_420,al_c,lg_1,q_80/49febd_1850fcc2c0dd4f49b9c9e4ec84891469~mv2.webp" alt="Imagen 7.jpg" id="IMG_211" />
                                  </wix>
                                </wix>
                              </div>
                              <div id="DIV_212">
                                <div id="DIV_213">
                                  <div id="DIV_214">
                                    <h4 id="H4_215">
                                      <span id="SPAN_216"><span id="SPAN_217">¿CÓMO FUNCIONA?</span></span>
                                    </h4>
                                  </div>
                                  <div id="DIV_218">
                                    <div id="DIV_219">
                                      <div id="DIV_220">
                                        <div id="DIV_221">
                                          <div id="DIV_222">
                                          </div>
                                          <div id="DIV_223">
                                            <div id="DIV_224">
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_225">
                                          <div id="DIV_226">
                                          </div>
                                          <div id="DIV_227">
                                            <div id="DIV_228">
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_229">
                                          <h4 id="H4_230">
                                            <span id="SPAN_231"><span id="SPAN_232">Desarrolla tus propios formularios</span></span>
                                          </h4>
                                        </div>
                                        <div id="DIV_233">
                                          <p id="P_234">
                                            <span id="SPAN_235">Utiliza nuestro módulo de diseño para digitalizar cualquier tipo de formulario.</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_236">
                                    <div id="DIV_237">
                                      <div id="DIV_238">
                                        <div id="DIV_239">
                                          <h4 id="H4_240">
                                            <span id="SPAN_241"><span id="SPAN_242">Galería de campos y secciones a tu disposición</span></span>
                                          </h4>
                                        </div>
                                        <div id="DIV_243">
                                          <p id="P_244">
                                            <span id="SPAN_245">Cuentas con una diversidad de campos listos para utilizar. Secciones prediseñadas para ahorrar tiempo. Sólo requieres incorporar el texto que necesites y definir los campos que lo componen.</span>
                                          </p>
                                        </div>
                                        <div id="DIV_246">
                                          <div id="DIV_247">
                                          </div>
                                          <div id="DIV_248">
                                            <div id="DIV_249">
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_250">
                                          <div id="DIV_251">
                                          </div>
                                          <div id="DIV_252">
                                            <div id="DIV_253">
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_254">
                                    <div id="DIV_255">
                                      <div id="DIV_256">
                                        <div id="DIV_257">
                                          <div id="DIV_258">
                                          </div>
                                          <div id="DIV_259">
                                            <div id="DIV_260">
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_261">
                                          <h4 id="H4_262">
                                            <span id="SPAN_263"><span id="SPAN_264">Envía las solicitudes a quien necesites</span></span>
                                          </h4>
                                        </div>
                                        <div id="DIV_265">
                                          <p id="P_266">
                                            <span id="SPAN_267">Haz seguimiento a los formularios que enviaste o manda recordatorios.</span>
                                          </p>
                                          <p id="P_268">
                                            <span id="SPAN_269">Mantén trazabilidad de cada actividad realizada.</span>
                                          </p>
                                        </div>
                                        <div id="DIV_270">
                                          <div id="DIV_271">
                                          </div>
                                          <div id="DIV_272">
                                            <div id="DIV_273">
                                            </div>
                                          </div>
                                        </div>
                                        <div id="DIV_274">
                                          <h4 id="H4_275">
                                            <span id="SPAN_276"><span id="SPAN_277">Comprobantes y datos a tu disposición</span></span>
                                          </h4>
                                        </div>
                                        <div id="DIV_278">
                                          <p id="P_279">
                                            <span id="SPAN_280">Lo declarado se registra en un comprobante en formato pdf. Así mismo tienes acceso inmediato a la datos registrados.</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_281">
                                    <h4 id="H4_282">
                                      <span id="SPAN_283"><span id="SPAN_284">Automatiza la entrada y salida de datos</span></span>
                                    </h4>
                                  </div>
                                  <div id="DIV_285">
                                    <p id="P_286">
                                      <span id="SPAN_287">Integra tus plataformas con Formu</span><span id="SPAN_288">laria</span><span id="SPAN_289">, registra tus destinatarios enviado la información vía API, así mismo la totalidad de la información completada en los formularios la cual puede ser envíada por esta misma vía directamente a tus sistemas.</span>
                                    </p>
                                  </div>
                                  <div id="DIV_290">
                                  </div>
                                  <div id="DIV_291">
                                  </div>
                                  <div id="DIV_292">
                                  </div>
                                  <div id="DIV_293">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div id="DIV_294">
                        </div>
                        <section id="SECTION_295">
                          <div id="DIV_296">
                            <div id="DIV_297">
                            </div>
                            <wix id="WIX-BG-MEDIA_298">
                              <wix id="WIX-IMAGE_299">
                                <img src="https://static.wixstatic.com/media/49febd_e903e8c635f047d3aa116bcdf5429551~mv2.png/v1/fill/w_980,h_716,al_c,q_90,usm_0.66_1.00_0.01/49febd_e903e8c635f047d3aa116bcdf5429551~mv2.webp" alt="Imagen 11.png" id="IMG_300" />
                              </wix>
                            </wix>
                          </div>
                          <div id="DIV_301">
                            <div id="DIV_302">
                              <div id="DIV_303">
                                <div id="DIV_304">
                                </div>
                                <div id="DIV_305">
                                </div>
                              </div>
                              <div id="DIV_306">
                                <div id="DIV_307">
                                  <div id="DIV_308">
                                    <h2 id="H2_309">
                                      <span id="SPAN_310"><span id="SPAN_311"><span id="SPAN_312"><span id="SPAN_313">Correo electrónico</span></span></span></span>
                                    </h2>
                                  </div>
                                  <div id="DIV_314">
                                    <div id="DIV_315">
                                      <input type="email" name="correo@email.com" id="INPUT_316" placeholder="correo@email.com" />
                                    </div>
                                  </div>
                                  <div id="DIV_317">
                                    <h2 id="H2_318">
                                      <span id="SPAN_319"><span id="SPAN_320"><span id="SPAN_321"><span id="SPAN_322">Contraseña</span></span></span></span>
                                    </h2>
                                  </div>
                                  <div id="DIV_323">
                                    <div id="DIV_324">
                                      <input type="password" name="*************" id="INPUT_325" placeholder="*************" />
                                    </div>
                                  </div>
                                  <div id="DIV_326">
                                    <button type="button" id="BUTTON_327">
                                    </button>
                                    <div id="DIV_328">
                                      <span id="SPAN_329">Olvide mi contraseña</span><span id="SPAN_330"></span>
                                      <div id="DIV_331">
                                        <svg id="svg_332">
                                          <g id="g_333">
                                            <path id="path_334">
                                            </path>
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <div id="DIV_335">
                                    <button type="button" id="BUTTON_336">
                                    </button>
                                    <div id="DIV_337">
                                      <span id="SPAN_338">Ingresar</span><span id="SPAN_339"></span>
                                      <div id="DIV_340">
                                        <svg id="svg_341">
                                          <g id="g_342">
                                            <path id="path_343">
                                            </path>
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="DIV_344">
                              <div id="DIV_345">
                                <div id="DIV_346">
                                </div>
                                <div id="DIV_347">
                                  <wix id="WIX-IMAGE_348">
                                    <img src="https://static.wixstatic.com/media/49febd_3f159159dcce426ba60eb825823bdddc~mv2.jpg/v1/fill/w_157,h_149,al_c,q_80,usm_0.66_1.00_0.01,blur_2/49febd_3f159159dcce426ba60eb825823bdddc~mv2.jpg" alt="Imagen 10.jpg" id="IMG_349" />
                                  </wix>
                                </div>
                              </div>
                              <div id="DIV_350">
                                <div id="DIV_351">
                                  <div id="DIV_352">
                                    <h2 id="H2_353">
                                      <span id="SPAN_354"><span id="SPAN_355"><span id="SPAN_356"><span id="SPAN_357">Inicia sesión</span></span></span></span>
                                    </h2>
                                  </div>
                                  <div id="DIV_358">
                                    <p id="P_359">
                                      <span id="SPAN_360"><span id="SPAN_361"><span id="SPAN_362"><span id="SPAN_363">Bienvenido a</span></span></span></span> <span id="SPAN_364"><span id="SPAN_365"><span id="SPAN_366"><span id="SPAN_367">Formu</span></span><span id="SPAN_368"><span id="SPAN_369">laria</span></span></span></span><span id="SPAN_370"><span id="SPAN_371"><span id="SPAN_372"><span id="SPAN_373">, a continuación ingrese su correo electrónico y contraseña</span></span></span></span>
                                    </p>
                                  </div>
                                  <div id="DIV_374">
                                    <div id="DIV_375">
                                      <wix id="WIX-IMAGE_376">
                                        <img src="https://static.wixstatic.com/media/49febd_8f08bb3818f941cb98c1fa6910ab4fe0~mv2.png/v1/fill/w_93,h_39,al_c,usm_0.66_1.00_0.01,blur_3/logo-white.png" alt="logo-white.png" id="IMG_377" />
                                      </wix>
                                    </div>
                                  </div>
                                  <div id="DIV_378">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div id="DIV_379">
                        </div>
                        <div id="DIV_380">
                          <div id="DIV_381">
                          </div>
                          <div id="DIV_382">
                            <div id="DIV_383">
                              <div id="DIV_384">
                                <div id="DIV_385">
                                  <div id="DIV_386">
                                    <div id="DIV_387">
                                      <div id="DIV_388">
                                        <wix id="WIX-IMAGE_389">
                                          <img src="https://static.wixstatic.com/media/49febd_9d9255a449f74179a534028d70cc186f~mv2.png/v1/fill/w_57,h_58,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Formulario%20Naranjo%20versi%C3%B3n%205.png" alt="Icono Formulario Naranjo versión 5.png" id="IMG_390" />
                                        </wix>
                                      </div>
                                    </div>
                                    <div id="DIV_391">
                                      <h2 id="H2_392">
                                        <span id="SPAN_393"><span id="SPAN_394"><span id="SPAN_395">f</span></span></span><span id="SPAN_396"><span id="SPAN_397"><span id="SPAN_398">ormu</span><span id="SPAN_399">laria</span></span></span>
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_400">
                        </div>
                        <section id="SECTION_401">
                          <div id="DIV_402">
                            <div id="DIV_403">
                            </div>
                            <div id="DIV_404">
                            </div>
                          </div>
                          <div id="DIV_405">
                            <div id="DIV_406">
                              <div id="DIV_407">
                                <div id="DIV_408">
                                </div>
                                <wix id="WIX-BG-MEDIA_409">
                                  <wix id="WIX-IMAGE_410">
                                    <img src="https://static.wixstatic.com/media/49febd_05b04cb3e7c1418faec4bc8056a594bf~mv2.jpg/v1/fill/w_860,h_421,al_c,q_85/49febd_05b04cb3e7c1418faec4bc8056a594bf~mv2.webp" alt="Imagen 8.jpg" id="IMG_411" />
                                  </wix>
                                </wix>
                              </div>
                              <div id="DIV_412">
                                <div id="DIV_413">
                                  <div id="DIV_414">
                                    <h2 id="H2_415">
                                      <span id="SPAN_416"><span id="SPAN_417"><span id="SPAN_418"><span id="SPAN_419"><span id="SPAN_420">¿Tienes una pregunta?</span></span></span><br id="BR_421" /> <span id="SPAN_422"><span id="SPAN_423">Contáctanos</span></span></span></span>
                                    </h2>
                                  </div>
                                  <div id="DIV_424">
                                    <p id="P_425">
                                      <span id="SPAN_426"><span id="SPAN_427"><span id="SPAN_428"></span></span></span>
                                      <object id="OBJECT_429">
                                        <a href="mailto:soporte@htgsoluciones.com" id="A_430">soporte@htgsoluciones.com</a>
                                      </object>
                                    </p>
                                  </div>
                                  <div id="DIV_431">
                                    <div id="DIV_432">
                                      <div id="DIV_433">
                                        <form id="FORM_434">
                                          <div id="DIV_435">
                                            <div id="DIV_436">
                                              <div id="DIV_437">
                                                <div id="DIV_438">
                                                  <input type="text" name="nombre" id="INPUT_439" placeholder="Nombre" maxlength="100" />
                                                </div>
                                              </div>
                                              <div id="DIV_440">
                                                <div id="DIV_441">
                                                  <input type="email" name="email" id="INPUT_442" placeholder="Email" maxlength="250" />
                                                </div>
                                              </div>
                                              <div id="DIV_443">
                                                <div id="DIV_444">
                                                  <input type="tel" name="teléfono" id="INPUT_445" placeholder="Teléfono" maxlength="50" />
                                                </div>
                                              </div>
                                              <div id="DIV_446">
                                                <label for="textarea_comp-kqiqltno" id="LABEL_447">
                                                </label>
                                                <textarea id="TEXTAREA_448" placeholder="Escribe tu mensaje aquí...">
                                                </textarea>
                                              </div>
                                              <div id="DIV_449">
                                                <button id="BUTTON_450">
                                                  <span id="SPAN_451">Enviar</span>
                                                </button>
                                              </div>
                                              <div id="DIV_452">
                                                <p id="P_453">
                                                  <span id="SPAN_454"><span id="SPAN_455">¡Gracias por tu mensaje!</span></span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
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
            </div>
          </main>
          <footer id="FOOTER_456">
            <div id="DIV_457">
              <div id="DIV_458">
                <div id="DIV_459">
                </div>
              </div>
              <div id="DIV_460">
                <div id="DIV_461">
                  <div id="DIV_462">
                  </div>
                </div>
                <div id="DIV_463">
                  <div id="DIV_464">
                    <div id="DIV_465">
                      <div id="DIV_466">
                        <div id="DIV_467">
                          <div id="DIV_468">
                            <div id="DIV_469">
                              <div id="DIV_470">
                                <wix id="WIX-IMAGE_471">
                                  <img src="https://static.wixstatic.com/media/49febd_8f08bb3818f941cb98c1fa6910ab4fe0~mv2.png/v1/fill/w_80,h_33,al_c,usm_0.66_1.00_0.01,blur_2/logo-white.png" alt="logo-white.png" id="IMG_472" />
                                </wix>
                              </div>
                            </div>
                            <div id="DIV_473">
                              <p id="P_474">
                                <span id="SPAN_475"><span id="SPAN_476"><span id="SPAN_477"><span id="SPAN_478">Formu</span></span></span><span id="SPAN_479"><span id="SPAN_480"><span id="SPAN_481">laria</span></span></span> <span id="SPAN_482"><span id="SPAN_483"><span id="SPAN_484"></span> <span id="SPAN_485">es una plataforma creada por HTG Soluciones, empresa que busca proponer iniciativas de transformación digital enfocadaa en optimizar los de procesos de tu negocio.</span></span></span></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_486">
                        <div id="DIV_487">
                          <div id="DIV_488">
                            <div id="DIV_489">
                              <div id="DIV_490">
                              </div>
                              <div id="DIV_491">
                                <div id="DIV_492">
                                  <div id="DIV_493">
                                    <div id="DIV_494">
                                      <wix id="WIX-IMAGE_495">
                                        <img src="https://static.wixstatic.com/media/49febd_9f57d15e6d194803a41972b0ccbafcd1~mv2.png/v1/fill/w_39,h_39,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Demostraci%C3%B3n.png" alt="Icono Demostración.png" id="IMG_496" />
                                      </wix>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="DIV_497">
                              <h2 id="H2_498">
                                <span id="SPAN_499"><span id="SPAN_500"><span id="SPAN_501"><span id="SPAN_502">Solicite una demostración</span></span></span></span>
                              </h2>
                            </div>
                            <div id="DIV_503">
                              <p id="P_504">
                                <span id="SPAN_505">Comuníquese</span> <span id="SPAN_506"><span id="SPAN_507"><span id="SPAN_508"><span id="SPAN_509">con nosotros:</span></span></span></span>
                              </p>
                            </div>
                            <div id="DIV_510">
                              <div id="DIV_511">
                                <wix id="WIX-IMAGE_512">
                                  <img src="https://static.wixstatic.com/media/49febd_cca28d9b72d74bc2aa54a66840d4a08a~mv2.png/v1/fill/w_20,h_20,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Correo.png" alt="Icono Correo.png" id="IMG_513" />
                                </wix>
                              </div>
                            </div>
                            <div id="DIV_514">
                              <div id="DIV_515">
                                <wix id="WIX-IMAGE_516">
                                  <img src="https://static.wixstatic.com/media/49febd_32fed9fadf274e63b96956aec45ed7ef~mv2.png/v1/fill/w_16,h_16,al_c,usm_0.66_1.00_0.01,blur_3/Icono%20Telefono.png" alt="Icono Telefono.png" id="IMG_517" />
                                </wix>
                              </div>
                            </div>
                            <div id="DIV_518">
                              <p id="P_519">
                                <span id="SPAN_520"><span id="SPAN_521"><span id="SPAN_522"></span></span></span>
                                <object id="OBJECT_523">
                                  <a href="mailto:contacto@htgsoluciones.com" id="A_524">contacto@htgsoluciones.com</a>
                                </object>
                              </p>
                              <p id="P_525">
                                <span id="SPAN_526"><span id="SPAN_527"><span id="SPAN_528">123-456-7890</span></span></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_529">
                        <h2 id="H2_530">
                          <span id="SPAN_531"><span id="SPAN_532"><span id="SPAN_533"><span id="SPAN_534">Solector de idioma</span></span></span></span>
                        </h2>
                      </div>
                      <div id="DIV_535">
                        <button type="button" id="BUTTON_536">
                        </button>
                        <div id="DIV_537">
                          <span id="SPAN_538">Español</span><span id="SPAN_539"></span>
                          <div id="DIV_540">
                            <svg id="svg_541">
                              <g id="g_542">
                                <path id="path_543">
                                </path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_544">
                        <button type="button" id="BUTTON_545">
                        </button>
                        <div id="DIV_546">
                          <span id="SPAN_547">English</span><span id="SPAN_548"></span>
                          <div id="DIV_549">
                            <svg id="svg_550">
                              <g id="g_551">
                                <path id="path_552">
                                </path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_553">
                        <p id="P_554">
                          <span id="SPAN_555">© Copyright - HTG Soluciones - Todos los derechos reservados</span>
                        </p>
                      </div>
                      <div id="DIV_556">
                        <div id="DIV_557">
                        </div>
                        <div id="DIV_558">
                          <div id="DIV_559">
                            <div id="DIV_560">
                              <p id="P_561">
                                <a href="https://guillermomz13.wixsite.com/formularia/pol%C3%ADtica" id="A_562"><span id="SPAN_563"><span id="SPAN_564">Política</span></span> <span id="SPAN_565"><span id="SPAN_566"><span id="SPAN_567"><span id="SPAN_568"><span id="SPAN_569">de privacidad</span></span></span></span></span></a>
                              </p>
                            </div>
                            <div id="DIV_570">
                              <p id="P_571">
                                <a href="https://guillermomz13.wixsite.com/formularia/terminos-y-condiciones" id="A_572"><span id="SPAN_573"><span id="SPAN_574">Terminos y condiciones generales</span></span></a>
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
          </footer>
        </div>
      </div>
    )
  }
}

const LoginForm = Form.create({ name: 'login_form' })(Login)


export default withTranslation()(withRouter(LoginForm))
