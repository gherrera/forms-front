import "./SectionEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Tooltip,
  Modal,
  Checkbox,
  notification,
  Icon,
  Form,
  Input,
  Popconfirm,
  Popover
} from "antd";

import { useTranslation } from "react-i18next";
import { TableEdit, FieldSetEdit, Catalogo, ParagraphEdit } from './components'
import { Paragraph, Table, FieldSet } from "../../../FormDeclaration/components";
import { saveSectionPromise } from "../FormEdit/promises";
import { Preview } from '../'

const { TextArea } = Input;

const SectionEdit = ({ form, s, refreshThisSection, exitSection }) => {
  const { getFieldDecorator, getFieldsError } = form;
  const { t } = useTranslation()
  const [section, setSection] = useState(s)
  const [catalogo, setCatalogo ] = useState([])
  const [changes, setChanges] = useState(false)
  const [isVisiblePreview, setIsVisiblePreview] = useState(false)

  useEffect(() => {
    if(section.type === 'CONTACTPERSON' || section.type === 'CONTACTENTITY') {
      let catContacto = []
      if(section.type === 'CONTACTPERSON') {
        let cat0 = {key: 'header', hasTitle: true, title: 'Encabezado', cols: 2, fields: [], active: false}
        cat0.fields.push({ type: 'INPUT', title: 'Nombre', key: 'nombre', active: false, required: false, prefilled: false})
        cat0.fields.push({ type: 'INPUT', title: 'Ap Paterno', key: 'apPaterno', active: false, required: false, prefilled: false})
        cat0.fields.push({ type: 'INPUT', title: 'Ap Materno', key: 'apMaterno', active: false, required: false, prefilled: false})
        cat0.fields.push({ type: 'SELECT', title: 'Tipo de Documento', key: 'tipDoc', active: false, required: false, prefilled: false, source:'CAT:TIPO_DOC'})
        cat0.fields.push({ type: 'INPUT', title: 'Documento', key: 'documento', active: false, required: false, prefilled: false})
        catContacto.push(cat0)

        let cat1 = {key: 'lugarOrigen', hasTitle: true, title: 'Lugar de origen', cols: 2, fields: [], active: false}
        cat1.fields.push({ type: 'SELECT', title: 'Nacionalidad', key: 'nacionalidad', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
        cat1.fields.push({ type: 'SELECT', title: 'Estado civil', key: 'estadoCivil', active: false, required: false, prefilled: false, source:'CAT:ESTADO_CIVIL'})
        cat1.fields.push({ type: 'DATE', title: 'Fecha de nacimiento', key: 'fecNac', active: false, required: false, prefilled: false})
        cat1.fields.push({ type: 'SELECT', title: 'Pais de residencia', key: 'paisResidencia', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
        cat1.fields.push({ type: 'SELECT', title: 'Pais de nacimiento', key: 'paisNacimiento', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
        cat1.fields.push({ type: 'SELECT', title: 'Parentesco', key: 'parentesco', active: false, required: false, prefilled: false, source:'CAT:PARENTESCO'})
        catContacto.push(cat1)

        let cat2 = {key: 'contactoPersonal', hasTitle: true, title: 'Contacto personal', cols: 2, fields: [], active: false}
        cat2.fields.push({ type: 'INPUT', title: 'Correo electronico', key: 'email', active: false, required: false, prefilled: false, validation: {type: 'email'}})
        cat2.fields.push({ type: 'INPUT', title: 'Telefono Fijo', key: 'telefono', active: false, required: false, prefilled: false, validation: {maxLength: 12}})
        cat2.fields.push({ type: 'INPUT', title: 'Telefono Celular', key: 'celular', active: false, required: false, prefilled: false, validation: {maxLength: 12}})
        catContacto.push(cat2)

        let cat3 = {key: 'direccionPersonal', hasTitle: true, title: 'Direccion personal', cols: 2, fields: [], active: false}
        cat3.fields.push({ type: 'SELECT', title: 'Region', key: 'region', active: false, required: false, prefilled: false, source:'CAT:REGIONES'})
        cat3.fields.push({ type: 'SELECT', title: 'Comuna', key: 'comuna', active: false, required: false, prefilled: false, source:'CAT:COMUNAS'})
        cat3.fields.push({ type: 'INPUT', title: 'Dirección', key: 'direccion', active: false, required: false, prefilled: false, validation: {maxLength: 200}})
        cat3.fields.push({ type: 'INPUT', title: 'Numero de calle', key: 'numCalle', active: false, required: false, prefilled: false, validation: {maxLength: 20}})
        cat3.fields.push({ type: 'INPUT', title: 'Numero de puerta', key: 'numPuerta', active: false, required: false, prefilled: false})
        cat3.fields.push({ type: 'INPUT', title: 'Codigo postal', key: 'codPostal', active: false, required: false, prefilled: false, validation: {maxLength: 10}})
        cat3.fields.push({ type: 'SELECT', title: 'Tipo de vivienda', key: 'tipVivienda', active: false, required: false, prefilled: false, source:'CAT:TIPO_VIVIENDA'})
        catContacto.push(cat3)

        let cat4 = {key: 'ocupacion', hasTitle: true, title: 'Ocupación', cols: 2, fields: [], active: false}
        cat4.fields.push({ type: 'SELECT', title: 'Profesión', key: 'profesion', active: false, required: false, prefilled: false, source:'CAT:PROFESIONES'})
        cat4.fields.push({ type: 'SELECT', title: 'Condición de Trabajo', key: 'condTrabajo', active: false, required: false, prefilled: false, source:'CAT:COND_TRABAJO'})
        cat4.fields.push({ type: 'INPUT', title: 'Ocupación Actual', key: 'ocupacion', active: false, required: false, prefilled: false})
        cat4.fields.push({ type: 'SELECT', title: 'Actividad Economica', key: 'actEconomica', active: false, required: false, prefilled: false, source: 'CAT:ACTECO'})
        cat4.fields.push({ type: 'INPUT', title: 'Cargo que desempeña', key: 'cargo', active: false, required: false, prefilled: false})
        catContacto.push(cat4)

        let cat5 = {key: 'infoEmpleador', hasTitle: true, title: 'Información Empleador', cols: 2, fields: [], active: false}
        cat5.fields.push({ type: 'INPUT', title: 'Nombre de la Empresa', key: 'empresa', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'INPUT', title: 'Antigüedad', key: 'antiguedad', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'SELECT', title: 'Región', key: 'region', active: false, required: false, prefilled: false, source: 'CAT:REGIONES'})
        cat5.fields.push({ type: 'SELECT', title: 'Comuna', key: 'comuna', active: false, required: false, prefilled: false, source:'CAT:COMUNAS'})
        cat5.fields.push({ type: 'INPUT', title: 'Dirección', key: 'direccion', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'INPUT', title: 'Numero de calle', key: 'numCalle', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'INPUT', title: 'Numero de puerta', key: 'numPuerta', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'INPUT', title: 'Codigo postal', key: 'codPostal', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'DATE', title: 'Fecha de inicio', key: 'fecInicio', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'DATE', title: 'Fecha de término', key: 'fecTermino', active: false, required: false, prefilled: false})
        cat5.fields.push({ type: 'INPUT', title: 'Rut de la empresa', key: 'rutEmpresa', active: false, required: false, prefilled: false, validation: {type: 'rutEmp'}})
        catContacto.push(cat5)

        let cat6 = {key: 'infoRemuneraciones', hasTitle: true, title: 'Información de Remuneraciones', cols: 2, fields: [], active: false}
        cat6.fields.push({ type: 'INPUT', title: 'Remuneración Mensual', key: 'remMensual', active: false, required: false, prefilled: false, validation: {type: 'number', decimals: 0}})
        cat6.fields.push({ type: 'INPUT', title: 'Otros ingresos mensuales', key: 'otrosIngresosMensuales', active: false, required: false, prefilled: false, validation: {type: 'number', decimals: 0}})
        catContacto.push(cat6)

        let cat7 = {key: 'infoPropiedades', hasTitle: true, title: 'Información de Propiedades', cols: 2, fields: [], active: false}
        cat7.fields.push({ type: 'INPUT', title: 'Nombre de Sociedad', key: 'nombreSociedad', active: false, required: false, prefilled: false})
        cat7.fields.push({ type: 'SELECT', title: 'Tipo de Documento de Identidad', key: 'tipoDocumento', active: false, required: false, prefilled: false, source: 'CAT:TIPO_DOC'})
        cat7.fields.push({ type: 'INPUT', title: 'Documento Identidad', key: 'documento', active: false, required: false, prefilled: false})
        cat7.fields.push({ type: 'INPUT', title: 'Cargo Ejercido', key: 'cargo', active: false, required: false, prefilled: false})
        cat7.fields.push({ type: 'INPUT', title: 'Porcentaje de Participación', key: 'porcentaje', active: false, required: false, prefilled: false, validation: {type: 'number', decimals: 2}})
        catContacto.push(cat7)
      }

      catContacto.map((seccion) => {
        section.components.map(comp => {
          if(comp.key === seccion.key) {
            seccion.active = true
            seccion.fields.map(fcat => {
              comp.fields.map(f => {
                if(fcat.key === f.key) {
                  fcat.active = true
                  fcat.required = f.required
                  fcat.prefilled = f.prefilled
                }
              })
            })
          }
        })
      })
      setCatalogo(catContacto)
    }
  }, [])

  const getComponentByType = (type, add) => {
    if(type === "PARAGRAPH") return { id: getRandomId(), type: 'PARAGRAPH', text: add ? null:'Aqui va el texto de ejemplo', fieldSet: { id: getRandomId(), type: 'FIELDSET', hasTitle: false, fields: [{id: getRandomId(), type: 'FIELD', typeField: 'INPUT', required: false}]} }
    else if(type === "FIELDSET")  {
      if(add) return {id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los datos', fields: [{ id: getRandomId(), type: 'FIELD', typeField: 'INPUT', title: '', required: true}]}
      else return {id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los datos', fields: [{ id: getRandomId(), type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true}, {id: getRandomId(), type: 'FIELD', typeField: 'INPUT', title: 'Dato2', required: true}]}
    }else if(type === "TABLE") {
      if(add) return { id: getRandomId(), type: 'TABLE', records:[], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: false, fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', required: true, tableVisible: true}] }}
      else return { id: getRandomId(), type: 'TABLE', text: 'Instrucciones para el llenado de los datos', records:[{fields: {}}], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los campos', fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true, tableVisible: true}, { id: getRandomId(), key: 'field2', type: 'FIELD', title: 'Dato2', typeField: 'INPUT', required: true, tableVisible: true}] }}
    }else if(type === "DECL") {
      if(add) return { id: getRandomId(), type: 'DECL', records:[], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: false, fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', required: true, tableVisible: true}] }}
      else return { id: getRandomId(), type: 'DECL', decision: true, text: 'Instrucciones para el llenado de los datos', records:[{fields: {}}], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: true, title: 'Titulo de los campos', fields: [{id: getRandomId(), key: 'field1', type: 'FIELD', typeField: 'INPUT', title: 'Dato1', required: true, tableVisible: true}, { id: getRandomId(), key: 'field2', type: 'FIELD', title: 'Dato2', typeField: 'INPUT', required: true, tableVisible: true}] }}
    }else if(type === "FIELD") return {id: getRandomId(), type: 'FIELD', required: false}
  }

  const refreshSection = (s) => {
    setSection(s)
    setChanges(true)
  }

  const handleChangeCatalogoActive = (cat) => {
    let cats = []
    catalogo.map((c, i) => {
      if(c.key === cat.key) {
        cats.push(cat);
      }else {
        cats.push(c);
      }
    })

    setCatalogo(cats)

    let comp = []
    cats.map(c => {
      if(c.active) {
        let _comp = { ...c, type: 'FIELDSET', id: getRandomId()}
        _comp.fields = _comp.fields.filter(f => f.active).map(f => {
          return { ...f, typeField: f.type, type: 'FIELD', id: getRandomId()}
        })
        if(_comp.fields.length > 0) {
          comp.push(_comp)
        }
      }
    })
    let _s = { ...section, components: comp }
    refreshSection(_s)
  }

  const getRandomId = () => {
    return 'R' + Math.floor(Math.random() * 1000000);
  }

  const handlerChangeCatalogo = (cat, field) => {
    let _c = []
    catalogo.map(c => {
      if(c.key === cat.key) {
        let _f = []
        c.fields.map(f => {
          if(f.key === field.key) {
            _f.push(field)
          }else {
            _f.push(f)
          }
        })
        c.fields = _f
      }
      _c.push(c)
    })

    let _fieldset = []
    _c.map(c => {
      let fields = c.fields.filter(f => f.active)
      let _fields = []
      if(fields.length > 0) {
        fields.map(f => {
          let _f = { ...f, typeField: f.type, type: 'FIELD', id: getRandomId() }
          _fields.push(_f)
        })
        let exists = false
        section.components && section.components.map((fs, index) => {
          if(fs.type === 'FIELDSET') {
            if(fs.key === c.key) {
              exists = true
              let _fs = { ...fs, fields: _fields }              
              _fieldset.push(_fs)
            }
          }
        })
        if(!exists) {
          let _fs = { ...c, type: 'FIELDSET', fields: _fields}
          _fieldset.push(_fs)
        }
      }
    })
    let _s = { ...section, components: _fieldset}
    setCatalogo(_c)
    refreshSection(_s)
  }

  const saveThisSection = () => {
    saveSectionPromise(section).then(response => {
      notification.success({
        message: 'Datos guardados',
        description: 'Se guardaron los datos exitosamente'
      })
      refreshThisSection(response)
      setChanges(false)
    })

    //exitSection()
  }

  const handlePreviewSection = () => {
    setIsVisiblePreview(true)
  }

  const closeModalHandler = () => {
    setIsVisiblePreview(false)
  }

  const handleChangeAttribute = (index, attr, value) => {
    let comp = []
    section.components.map((c,i) => {
      if(i === index) {
        comp.push({ ...c, [attr]: value})
      }else {
        comp.push(c)
      }
    })

    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  const getTooltipComponent = (c) => {
    if(c === 'PARAGRAPH') return 'Párrafo'
    else if(c === 'FIELDSET') return 'Datos'
    else if(c === 'TABLE') return 'Tabla'
    else if(c === 'DECL') return 'Pregunta tipo Declaración'
    else if(c === 'FIELD') return 'Campo de Texto'
  }

  const handleClickComponent = (c) => {
    let comp = []
    section.components.map(c => {
      comp.push(c)
    })
    comp.push(getComponentByType(c, true))

    let _s = { ...section, components:  comp }
    refreshSection(_s)
  }

  const deleteComponent = (index) => {
    let comp = section.components.filter((c,i) => index !== i)
    let _s = { ...section, components:  comp }
    refreshSection(_s)
  }

  const getTextComponent = (comp) => {
    if(comp === 'PARAGRAPH') return 'Se incluye una caja de texto que permite agregar texto personalizado con campos incrustados opcionales'
    else if(comp === 'FIELDSET') return 'Se incluye grupo de datos personalizados'
    else if(comp === 'TABLE') return 'Se incluye grupo de datos personalizados para agregar en registros a una Tabla'
    else if(comp === 'DECL') return 'Se incluye una deción inicial y grupo de datos personalizados para agregar en registros a una Tabla'
    else if(comp === 'FIELD') return 'Se incluye un campo de texto para ser completado por el usuario'
  }

  const getContentPopOver = (comp) => {
    return <Row className="overlayExample">
      <Col className="explain-component" span={24}>{getTextComponent(comp)}</Col>
      <Col className="component-example"span={24}>
      { comp === 'PARAGRAPH' && 
        <Paragraph component={getComponentByType(comp)} mode="preview" />
      }
      { comp === 'FIELDSET' && 
        <FieldSet section={section} parent={section} component={getComponentByType(comp)} mode="preview" getFieldDecorator={getFieldDecorator}  />
      }
      { (comp === 'TABLE' || comp === 'DECL') && 
        <Table section={section} component={getComponentByType(comp)} mode="preview" />
      }
      { comp === 'FIELD' && 
        <TextArea rows={4} value='' disabled={true} />
      }
      </Col>
    </Row>
  }

  return (
    <div className="section-edit">
      <Row>
        <Col span={12} md={12} sm={24} xs={24}>
          <h2>{ section.title }</h2>
        </Col>
        <Col span={12} md={12} sm={24} xs={24} className="tools">
          <Button disabled={!changes} onClick={saveThisSection} type="primary">Guardar Cambios</Button>
          {/*<Button onClick={exitSection}>Salir sin Guardar</Button>*/}
          <Button onClick={handlePreviewSection} type="primary">Previsualizar</Button>
        </Col>
      </Row>
      { section.type === 'CONTACTPERSON' &&
        <div className="catalogos">
          <h4>Catalogo de datos</h4>
          { catalogo.map((cat, index) =>
              <Catalogo catalogo={cat}  handleChangeCatalogoActive={handleChangeCatalogoActive} handlerChangeCatalogo={handlerChangeCatalogo} />
          )}
        </div>
      }
      { section.type === 'CUSTOM' &&
        <Row className="custom-tools">
          <ul className="custom-tools-group-menu">
          {["PARAGRAPH", "FIELDSET", "TABLE", "DECL", "FIELD"].map(c =>
            <Popover content={getContentPopOver(c)} title={getTooltipComponent(c)} trigger="hover" placement="bottom">
              <li>
                  <a href="#0" onClick={() => handleClickComponent(c)}>
                    <span>
                      { c === "PARAGRAPH" && <><Icon type="align-center" />&nbsp;Párrafo</>}
                      { c === "FIELDSET" && <><Icon type="form" />&nbsp;Datos</>}
                      { c === "TABLE" && <><Icon type="table" />&nbsp;Tabla</>}
                      { c === "DECL" && <><Icon type="table" />&nbsp;Declaración</>}
                      { c === "FIELD" && <><Icon type="edit" />&nbsp;Texto</>}
                    </span>
                    <span>
                      <Tooltip title="Agregar">
                        <Icon type="plus"/>
                      </Tooltip>
                    </span>
                  </a>
              </li>
            </Popover>
            )}
          </ul>
        </Row>
      }

      <div className="section-components">
        { section.components && (section.type === 'CONTACTPERSON') &&
          <Row><h4>Datos seleccionados</h4></Row>
        }
        { section.components && section.components.map((component, index) =>
          <Row className={'row-component-section row-' + component.type}>
            { section.type === 'CUSTOM' &&
              <Row className="header-section-component-custom">
                <Col span={20}><strong>{index+1}. {getTooltipComponent(component.type)}</strong></Col>
                <Col span={4} className="tools-section-component-custom">
                  <Tooltip title="Eliminar Componente" placement="bottom">
                    <Popconfirm title="Confirma eliminar el Componente?" onConfirm={(e) => deleteComponent(index)}>
                      <Button size="small" icon="delete" />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            }

            { component.type === 'PARAGRAPH' &&
              <ParagraphEdit section={section} component={component} index={index} fieldset={component.fieldSet} refreshSection={refreshSection}/>
            }
            { component.type === 'FIELDSET' &&
              <FieldSetEdit section={section} component={component} fieldset={component} refreshSection={refreshSection} />
            }
            { (component.type === 'TABLE' || component.type === 'DECL') &&
              <TableEdit section={section} component={component} index={index} fieldset={component.fieldSet} refreshSection={refreshSection} />
            }
            { component.type === 'FIELD' &&
              <Row>
                <Col span={3}>Texto requerido</Col>
                <Col>
                  <Checkbox size="small" checked={component.required} onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} />
                </Col>
              </Row>
            }
          </Row>
        )}
      </div>
      { isVisiblePreview &&
        <Modal
          className="preview-modal"
          footer={ null }
          visible={ true }
          onOk={ closeModalHandler  }
          onCancel={ closeModalHandler }
        >
          <div>
            <div className="top-bar">
              Vista Previa
            </div>
            <Preview section={section} closeModalHandler={closeModalHandler} />
          </div>
        </Modal>
      }
    </div>
  )
}
export default Form.create()(SectionEdit);
