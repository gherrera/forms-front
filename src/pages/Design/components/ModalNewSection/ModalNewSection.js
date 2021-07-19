import "./ModalNewSection.scss";
import React, { useEffect, useState, useContext} from "react";
import {
  Col,
  Row,
  Modal,
  Icon,
  Button,
  Input,
  Radio,
  Form,
  notification,
  Popover
} from "antd";

import { Paragraph, FieldSet, Table, Text } from "../../../FormDeclaration/components";

import personIcon from './img/person.png'
import entityIcon from './img/entity.png'

const { confirm } = Modal;

const ModalNewSection = ({ form, handlerAddSection }) => {
    const { getFieldDecorator, validateFields } = form;
    const [title, setTitle] = useState(null)
    const [type, setType] = useState(null)
    const [sectionType, setSectionType] = useState(null)

    const onChangeRadio = (value) => {
        setType(value)
        if(value === 2) setSectionType('CUSTOM')
        else setSectionType(null)
    }

    const handleChangeTitle = (value) => {
        setTitle(value)
    }

    const handlerBtnAdd = () => {
        validateFields(['title', 'type']).then(() => {
            if((type === 1 || type === 3) && sectionType === null) {
                notification.error({
                    message: 'Debe seleccionar un tipo de Sección'
                })
            }else {
                confirm({
                    title: 'Nueva sección',
                    content: 'Confirma la creación de la nueva sección?',
                    onOk() {
                        handlerAddSection(title, sectionType)
                    },
                    onCancel() {},
                  });
            }
        })
    }

    const selectTypeFields = (tf) => {
        setSectionType(tf)
    }

    const getContentPopOver = (comp) => {
        return <Row className="overlayExample">
          <Col className="explain-component" span={24}>{getTextComponent(comp)}</Col>
          <Col className="component-example"span={24}>
          { (comp === 'PARAGRAPH' || comp === 'INTRO') && 
            <Paragraph component={getComponentByType(comp)} mode="preview" />
          }
          { (comp === 'FIELDSET' || comp === 'CONTACTPERSON' || comp === 'CONTACTENTITY') && 
            <FieldSet section={{}} parent={{}} component={getComponentByType(comp)} mode="preview" />
          }
          { comp === 'DATA' && 
            <>
            <Paragraph component={getComponentByType('PARAGRAPH')} mode="preview" />
            <FieldSet section={{}} parent={{}} component={getComponentByType('FIELDSET')} mode="preview" />
            </>
          }
          { (comp === 'TABLE' || comp === 'DECL') && 
            <Table section={{}} component={getComponentByType(comp)} mode="preview" />
          }
          { comp === 'TEXT' && 
            <Text component={getComponentByType(comp)} mode="preview" />
          }
          { comp === 'COMMENTS' && 
            <>
                <Paragraph component={getComponentByType('PARAGRAPH')} mode="preview" />
                <Text component={getComponentByType('TEXT')} mode="preview" />
            </>
          }
          </Col>
        </Row>
    }

    const getTooltipComponent = (c) => {
        if(c === 'PARAGRAPH') return 'Párrafo'
        else if(c === 'INTRO') return 'Datos con Datos'
        else if(c === 'CONTACTPERSON') return 'Catálogo de Datos de persona Natural'
        else if(c === 'CONTACTENTITY') return 'Catálogo de Datos de persona Jurídica'
        else if(c === 'DATA') return 'Datos personalizados'
        else if(c === 'FIELDSET') return 'Datos'
        else if(c === 'TABLE') return 'Tabla'
        else if(c === 'DECL') return 'Pregunta tipo Declaración'
        else if(c === 'TEXT') return 'Campo de Texto'
        else if(c === 'COMMENTS') return 'Comentarios'
        else if(c === 'SUBSECTION') return 'Sub Seccion'
    }

    const getTextComponent = (comp) => {
        if(comp === 'PARAGRAPH' || comp === 'INTRO') return 'Se incluye una caja de texto que permite agregar texto personalizado con campos incrustados opcionales'
        else if(comp === 'FIELDSET' || comp === "CONTACTPERSON" || comp === "CONTACTENTITY" || comp === "DATA") return 'Se incluye grupo de datos personalizados'
        else if(comp === 'TABLE') return 'Se incluye grupo de datos personalizados para agregar en registros a una Tabla'
        else if(comp === 'DECL') return 'Se incluye una deción inicial y grupo de datos personalizados para agregar en registros a una Tabla'
        else if(comp === 'TEXT') return 'Se incluye un campo de texto para ser completado por el usuario'
        else if(comp === 'COMMENTS') return 'Se incluye un párrafo y un campo de texto para ser completado por el usuario'
        else if(comp === 'SUBSECTION') return 'Se incluye una Subsección que permite agregar otros elementos'
    }

    const getComponentByType = (type) => {
        if(type === "PARAGRAPH" || type === "INTRO") return { id: getRandomId(), type, text: 'Aqui va el texto de ejemplo', fieldSet: { id: getRandomId(), type: 'FIELDSET', hasTitle: false, fields: []} }
        else if(type === "FIELDSET" || type === "CONTACTPERSON"  || type === "CONTACTENTITY" )  {
          return {id: getRandomId(), type, cols: 2, hasTitle: true, title: 'Titulo de los datos', fields: [{ id: getRandomId(), type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true}, {id: getRandomId(), type: 'FIELD', typeField: 'INPUT', title: 'Dato2', required: true}]}
        }else if(type === "TABLE") {
          return { id: getRandomId(), type, text: 'Instrucciones para el llenado de los datos', records:[{fields: {}}], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los campos', fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true, tableVisible: true}, { id: getRandomId(), key: 'field2', type: 'FIELD', title: 'Dato2', typeField: 'INPUT', required: true, tableVisible: true}] }}
        }else if(type === "DECL") {
          return { id: getRandomId(), type, decision: true, text: 'Instrucciones para el llenado de los datos', records:[{fields: {}}], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los campos', fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true, tableVisible: true}, { id: getRandomId(), key: 'field2', type: 'FIELD', title: 'Dato2', typeField: 'INPUT', required: true, tableVisible: true}] }}
        }else if(type === "TEXT") {
          return {id: getRandomId(), type, required: false, hasTitle: false}
        }else if(type === 'COMMENTS') {
          return { id: getRandomId(), type, components: [{id: getRandomId(), type: 'PARAGRAPH'}, {id: getRandomId(), type: 'TEXT', required: true, hasTitle: false}] };
        }else if(type === "SUBSECTION") {
          return { id: getRandomId(), type, title: 'Titulo de la subsección', components: []}
        }
    
    }

    const getRandomId = () => {
        return 'R' + Math.floor(Math.random() * 1000000);
    }
    
    return (
        <div className="modal-new-section-body">
            <h2>Diseño de una Sección</h2>
            <Col className="col-input-name">
                <Form.Item>
                    {getFieldDecorator('title', {
                        initialValue: title,
                        validateTrigger: "onChange",
                        rules:
                        [
                            { required: true, message: 'Campo requerido' }
                        ]
                    })(
                    <Input placeholder="Escriba el nombre de la nueva sección" onChange={(e) => handleChangeTitle(e.target.value)}/>
                    )}
                </Form.Item>
            </Col>
            <Col><h3>Seleccione el tipo de Sección que requiere</h3></Col>
            <Form.Item className="item-radio-type">
                {getFieldDecorator('type', {
                    initialValue: title,
                    validateTrigger: "onChange",
                    rules:
                    [
                        { required: true, message: 'Campo requerido' }
                    ]
                })(
                <Radio.Group onChange={(e) => onChangeRadio(e.target.value)} value={type}>
                    <Row>
                        <Col span={8}><Radio value={1}>Agrega Campos</Radio></Col>
                        <Col span={8}><Radio value={2}>Seccion Personalizada</Radio></Col>
                        <Col span={8}><Radio value={3}>Plantillas prediseñadas</Radio></Col>
                    </Row>
                </Radio.Group>
                )}
            </Form.Item>
            { type &&
                <Row className="box-section-type">
                    { type === 1 &&
                        <div>
                            <span className="title">Puedes elegir los campos que necesites agregar a tu sección, selecciona el catalogo de datos de:</span>
                            
                            <Col span={8} offset={4}>
                                <div className={'section-type-box'+(sectionType==='CONTACTPERSON'?' selected':'')} onClick={() => selectTypeFields('CONTACTPERSON')}>
                                    <Col>
                                        <img src={personIcon} />
                                    </Col>
                                    <Col>Personas Naturales</Col>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={'section-type-box'+(sectionType==='CONTACTENTITY'?' selected':'')} onClick={() => selectTypeFields('CONTACTENTITY')}>
                                    <Col>
                                        <img src={entityIcon} />
                                    </Col>
                                    <Col>Personas Jurídicas</Col>
                                </div>
                            </Col>
                        </div>
                    }
                    { type === 2 &&
                        <div>
                            <span className="title">Con la sección personaliza podrás diseñar la sección libremente o agregar subsecciones</span>

                            <Row className="custom-tools">
                                <ul className="custom-tools-group-menu">
                                {["SUBSECTION", "PARAGRAPH", "FIELDSET", "TABLE", "DECL", "TEXT"].map(c =>
                                    <Popover content={getContentPopOver(c)} title={getTooltipComponent(c)} trigger="hover" placement="bottom">
                                    <li>
                                        <a href="#0">
                                            <span>
                                            { c === "PARAGRAPH" && <><Icon type="align-center" />&nbsp;Párrafo</>}
                                            { c === "FIELDSET" && <><Icon type="form" />&nbsp;Datos</>}
                                            { c === "TABLE" && <><Icon type="table" />&nbsp;Tabla</>}
                                            { c === "DECL" && <><Icon type="table" />&nbsp;Declaración</>}
                                            { c === "TEXT" && <><Icon type="edit" />&nbsp;Texto</>}
                                            { c === "SUBSECTION" && <><Icon type="profile" />&nbsp;Sub Seccion</>}
                                            </span>
                                        </a>
                                    </li>
                                    </Popover>
                                    )}
                                </ul>
                            </Row>
                        </div>
                    }
                    { type === 3 &&
                        <div>
                            <span className="title">Escoja una de las siguientes plantillas:</span>

                            <Row className="row-plant-section">
                                {["INTRO", "DATA", "DECL", "TABLE", "TEXT", "COMMENTS"].map(c =>
                                    <Popover content={getContentPopOver(c)} title={getTooltipComponent(c)} trigger="hover" placement="bottom">
                                    <Col span={4} onClick={() => selectTypeFields(c)} className={'section-type-box' + (sectionType === c ? ' selected':'')}>
                                        <Col>
                                            { c === "INTRO" && <Icon type="align-center" /> }
                                            { c === "DATA" && <Icon type="form" /> }
                                            { (c === "DECL" || c === 'TABLE') && <Icon type="table" /> }
                                            { c === "TEXT" && <Icon type="edit" /> }
                                            { c === "COMMENTS" && <Icon type="edit" /> }
                                        </Col>
                                        <Col>
                                            { c === "INTRO" && 'Párrafo con Datos' }
                                            { c === "DATA" && 'Datos personalizados' }
                                            { c === "DECL" && 'Pregunta tipo Declaración' }
                                            { c === "TABLE" && 'Tipo Tabla' }
                                            { c === "TEXT" && 'Cuadro de Texto' }
                                            { c === "COMMENTS" && 'Comentarios' }
                                        </Col>
                                    </Col>
                                    </Popover>
                                )}
                            </Row>
                        </div>
                    }
                </Row>
            }
            <Row className="btn-tools-add-section">
                <Col><Button type="primary" icon="plus" onClick={handlerBtnAdd} disabled={sectionType===null}>Agregar</Button></Col>
            </Row>
        </div>
    )
}

export default Form.create()(ModalNewSection)