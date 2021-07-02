import "./SectionEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Modal
} from "antd";

import { useTranslation } from "react-i18next";
import { TableEdit, FieldSetEdit, Catalogo, ParagraphEdit } from './components'
import { Preview } from '../'

const { TextArea } = Input;

const SectionEdit = ({ s, refreshThisSection, exitSection }) => {
  const { t } = useTranslation()
  const [section, setSection] = useState(s)
  const [catalogo, setCatalogo ] = useState([])
  const [changes, setChanges] = useState(false)
  const [isVisiblePreview, setIsVisiblePreview] = useState(false)

  useEffect(() => {
    if(section.type === 'HEADER' || section.type === 'CONTACT') {
      let catHeader = []
      let catContacto = []

      let catH1 = {key: 'header', title: 'Encabezado', cols: 2, fields: [], active: false}
      catH1.fields.push({ type: 'INPUT', title: 'Nombre', key: 'nombre', active: false, required: false, prefilled: false})
      catH1.fields.push({ type: 'INPUT', title: 'Ap Paterno', key: 'apPaterno', active: false, required: false, prefilled: false})
      catH1.fields.push({ type: 'INPUT', title: 'Ap Materno', key: 'apMaterno', active: false, required: false, prefilled: false})
      catH1.fields.push({ type: 'SELECT', title: 'Tipo de Documento', key: 'tipDoc', active: false, required: false, prefilled: false, source:'CAT:TIPO_DOC'})
      catH1.fields.push({ type: 'INPUT', title: 'Documento', key: 'documento', active: false, required: false, prefilled: false})
      catHeader.push(catH1)

      let cat1 = {key: 'lugarOrigen', title: 'Lugar de origen', cols: 2, fields: [], active: false}
      cat1.fields.push({ type: 'SELECT', title: 'Nacionalidad', key: 'nacionalidad', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
      cat1.fields.push({ type: 'SELECT', title: 'Estado civil', key: 'estadoCivil', active: false, required: false, prefilled: false, source:'CAT:ESTADO_CIVIL'})
      cat1.fields.push({ type: 'DATE', title: 'Fecha de nacimiento', key: 'fecNac', active: false, required: false, prefilled: false})
      cat1.fields.push({ type: 'SELECT', title: 'Pais de residencia', key: 'paisResidencia', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
      cat1.fields.push({ type: 'SELECT', title: 'Pais de nacimiento', key: 'paisNacimiento', active: false, required: false, prefilled: false, source:'CAT:PAISES'})
      cat1.fields.push({ type: 'SELECT', title: 'Parentesco', key: 'parentesco', active: false, required: false, prefilled: false, source:'CAT:PARENTESCO'})
      catContacto.push(cat1)

      let cat2 = {key: 'contactoPersonal', title: 'Contacto personal', cols: 2, fields: [], active: false}
      cat2.fields.push({ type: 'INPUT', title: 'Correo electronico', key: 'email', active: false, required: false, prefilled: false})
      cat2.fields.push({ type: 'INPUT', title: 'Telefono Fijo', key: 'telefono', active: false, required: false, prefilled: false})
      cat2.fields.push({ type: 'INPUT', title: 'Telefono Celular', key: 'celular', active: false, required: false, prefilled: false})
      catContacto.push(cat2)

      let cat3 = {key: 'direccionPersonal', title: 'Direccion personal', cols: 2, fields: [], active: false}
      cat3.fields.push({ type: 'SELECT', title: 'Region', key: 'region', active: false, required: false, prefilled: false, source:'CAT:REGIONES'})
      cat3.fields.push({ type: 'SELECT', title: 'Comuna', key: 'comuna', active: false, required: false, prefilled: false, source:'CAT:COMUNAS'})
      cat3.fields.push({ type: 'INPUT', title: 'Dirección', key: 'direccion', active: false, required: false, prefilled: false})
      cat3.fields.push({ type: 'INPUT', title: 'Numero de calle', key: 'numCalle', active: false, required: false, prefilled: false})
      cat3.fields.push({ type: 'INPUT', title: 'Numero de puerta', key: 'numPuerta', active: false, required: false, prefilled: false})
      cat3.fields.push({ type: 'INPUT', title: 'Codigo postal', key: 'codPostal', active: false, required: false, prefilled: false})
      cat3.fields.push({ type: 'SELECT', title: 'Tipo de vivienda', key: 'tipVivienda', active: false, required: false, prefilled: false, source:'CAT:TIPO_VIVIENDA'})
      catContacto.push(cat3)

      let cat = catHeader
      if(section.type === 'CONTACT') cat = catContacto

      cat.map((seccion) => {
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
      setCatalogo(cat)
    }
  }, [])

  const getTypeSection = (type) => {
    if(type === 'INTRO') return "Introducción"
    else if(type === 'HEADER') return "Encabezado"
    else if(type === 'CONTACT') return "Datos Personales"
    else if(type === 'TABLE') return "Tabla"
    else if(type === 'DECL') return "Pregunta Tipo Declaración"
    else if(type === 'TABLE') return "Tabla"
    else if(type === 'TEXT') return "Cuadro de Texto"
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
        let _comp = { ...c, type: 'FIELDSET'}
        _comp.fields = _comp.fields.filter(f => f.active)
        if(_comp.fields.length > 0) {
          comp.push(_comp)
        }
      }
    })
    let _s = { ...section, components: comp }
    refreshSection(_s)
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
          let _f = { ...f, typeField: f.type, type: 'FIELD'}
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
          let _fs = {key: c.key, cols: 2, type: 'FIELDSET', title: c.title, fields: _fields}
          _fieldset.push(_fs)
        }
      }
    })
    let _s = { ...section, components: _fieldset}
    setCatalogo(_c)
    refreshSection(_s)
  }

  const saveThisSection = () => {
    refreshThisSection(section)
    exitSection()
  }

  const handlePreviewSection = () => {
    setIsVisiblePreview(true)
  }

  const closeModalHandler = () => {
    setIsVisiblePreview(false)
  }

  return (
    <div className="section-edit">
      <Row>
        <Col span={16}>
          <h2>{ getTypeSection(section.type) }</h2>
        </Col>
        <Col span={8} className="tools">
          <Button disabled={!changes} onClick={saveThisSection}>Guardar Cambios</Button>
          <Button onClick={exitSection}>Salir sin Guardar</Button>
          <Button onClick={handlePreviewSection}>Previsualizar</Button>
        </Col>
      </Row>
      { (section.type === 'HEADER' || section.type === 'CONTACT') &&
        <div className="catalogos">
          <h4>Catalogo de datos</h4>
          { catalogo.map((cat, index) =>
              <Catalogo catalogo={cat}  handleChangeCatalogoActive={handleChangeCatalogoActive} handlerChangeCatalogo={handlerChangeCatalogo} />
          )}
        </div>
      }

      <div className="section-components">
        { section.components && (section.type === 'HEADER' || section.type === 'CONTACT') &&
          <Row><h4>Atributos seleccionados</h4></Row>
        }
        { section.components && section.components.map((component, index) =>
          <Row className={'row-' + component.type}>
            { component.type === 'PARAGRAPH' &&
              <ParagraphEdit section={section} component={component} index={index} fieldset={component.fieldSet} refreshSection={refreshSection}/>
            }
            { component.type === 'FIELDSET' &&
              <FieldSetEdit section={section} fieldset={component} refreshSection={refreshSection} />
            }
            { (component.type === 'TABLE' || component.type === 'DECL') &&
              <TableEdit section={section} component={component} index={index} fieldset={component.fieldSet} refreshSection={refreshSection} />
            }
            { component.type === 'FIELD' &&
              <TextArea rows={4} disabled/>
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
export default SectionEdit;
