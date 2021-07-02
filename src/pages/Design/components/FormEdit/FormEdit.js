import "./FormEdit.scss";
import React, { useEffect, useState, useContext} from "react";
import {
  Col,
  Row,
  Modal,
  Select,
  Checkbox,
  Button,
  Input,
  Spin,
  notification
} from "antd";
import { SectionEdit, Preview } from '../'
import { datasourcesContext } from '../../../../contexts'

import { useTranslation } from "react-i18next";
import { getFormByIdPromise, saveFormPromise } from "./promises";

const FormEdit = ({ formId, refreshBreadCrumbs, exitSection }) => {
	const { t } = useTranslation()
  const [form, setForm] = useState(null)
  const [sections, setSections] = useState([])
  const [section, setSection] = useState(null)
  const [changes, setChanges] = useState(false)
  const [isVisiblePreview, setIsVisiblePreview] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const { loadFormDatasource } = useContext(datasourcesContext)

  useEffect(() => {
		loadFormdById(formId)
    loadFormDatasource(formId)
	}, [])

  const loadFormdById = (formId) => {
    setForm(null)
		getFormByIdPromise(formId).then(f=>{
      setForm(f)
      setSections(f.sections)
		})
  }

  const addSection = () => {
    let section = {id: getRandomId(), status: 'ACTIVE', isNew: true}
    let joined = sections.concat(section);
    setSections(joined)
    setChanges(true)
  }

  const handleChangeTitle = (index, value) => {
    setSections(
      sections.map((section, i) => {
        if (index == i) {
          return { ...section, title: value };
        } else {
          return section;
        }
      }
    ))
    setChanges(true)
  }

  const deleteSection = (index) => {
    setSections(sections.filter((item, i) => i !== index));
    setChanges(true)
  }

  const editSection = (s) => {
    s.formId = formId
    setSection(s)
    refreshBreadCrumbs(form.name + ' - ' + s.title, s.title)
  }

  const changeActiveSection = (index, checked) => {
    setSections(
      sections.map((section, i) => {
        if (index == i) {
          return { ...section, status: checked ? 'ACTIVE' : 'INACTIVE' };
        } else {
          return section;
        }
      }
    ))
    setChanges(true)
  }

  const changePrefillSection = (index, checked) => {
    setSections(
      sections.map((section, i) => {
        if (index == i) {
          return { ...section, prefilled: checked };
        } else {
          return section;
        }
      }
    ))
    setChanges(true)
  }

  const getRandomId = () => {
    return 'R' + Math.floor(Math.random() * 1000000);
  }

  const changeTypeSection = (index, value) => {
    let sec = sections.map((section, i) => {
      if (index == i) {
        if(section.isNew && (value === 'TABLE' || value === 'DECL')) {
          return { ...section, type: value, components: [{ id: getRandomId(), type: value, records:[], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, fields: [{id: getRandomId(), type: 'FIELD', typeField: 'INPUT', required: true, tableVisible: true}] }}]};
        }else if(section.isNew && (value === 'HEADER' || value === 'CONTACT')) {
          return { ...section, type: value, components: []};
        }else if(section.isNew && (value === 'INTRO')) {
          return { ...section, type: value, components: [{ id: getRandomId(), type: 'PARAGRAPH', fieldSet: {id: getRandomId(), type: 'FIELDSET', fields: [{id: getRandomId(), type: 'FIELD', typeField: 'INPUT', required: true}]} }]};
        }else if(section.isNew && (value === 'TEXT')) {
          return { ...section, type: value, components: [{id: getRandomId(), type: 'FIELD', required: true}] };
        }else {
          return { ...section, type: value };
        }
      } else {
        return section;
      }
    })

    setSections(sec)
    let f = { ...form, sections: sec }
    setForm(f)
    setChanges(true)
  }

  const refreshSection = (s) => {
    setSections(
      sections.map((section, i) => {
        if (section.id === s.id) {
          return s;
        } else {
          return section;
        }
      }
    ))
    setSection(s)
    setChanges(true)
  }

  const exitSectionFn = () => {
    setSection(null)
    exitSection()
  }

  const saveForm = () => {
    saveFormPromise({ ...form, sections}).then(response => {
      if(response === 'success') {
        notification.success({
          message: 'Formulario guardado exitosamente'
        })
        setChanges(false)
        loadFormdById(formId)
      }else {
        notification.error({
          message: 'Se ha producido un error al grabar los datos'
        })
      }
    })
  }

  const handlePreviewSection = () => {
    setIsVisiblePreview(true)
  }

  const closeModalHandler = () => {
    setIsVisiblePreview(false)
  }

  return (
    <div className="form-edit">
      { form === null ? <Spin/>
        :
        <>
          { section ? <SectionEdit s={section} refreshThisSection={refreshSection} exitSection={exitSectionFn} />
          :
          <div className="form">
            <Row className="tools-btn">
              <Col span={6} offset={18}>
                <Button disabled={!changes} onClick={saveForm}>Guardar cambios</Button>
                <Button onClick={handlePreviewSection}>Previsualizar</Button>
              </Col>
            </Row>
            { sections.length > 0 ?
            <>
              <Row className="titles-section">
                <Col span={8} offset={1}>Nombre de la Sección</Col>
                <Col span={6}>Tipo de Sección</Col>
                <Col span={3} className="center">Activar</Col>
                <Col span={3} className="center">Prellenado</Col>
                <Col span={3}>Edición</Col>
              </Row>

              { sections.map((section, index) =>
                <Row className="rows-section">
                  <Col span={1}>
                    { index === sections.length -1 && <Button icon="plus" size="small" onClick={addSection}/> }
                  </Col>
                  <Col span={8}><Input value={section.title} placeholder="Titulo de la sección" onChange={(e) => handleChangeTitle(index, e.target.value)}/></Col>
                  <Col span={6}>
                    <Select value={section.type} onChange={(value) => changeTypeSection(index, value)} disabled={section.isNew === undefined}>
                      <Select.Option value="INTRO">Introducción</Select.Option>
                      <Select.Option value="HEADER">Encabezado</Select.Option>
                      <Select.Option value="CONTACT">Datos Personales</Select.Option>
                      <Select.Option value="DECL">Pregunta Tipo Declaración</Select.Option>
                      <Select.Option value="TABLE">Tipo Tabla</Select.Option>
                      <Select.Option value="TEXT">Cuadro de Texto</Select.Option>
                    </Select>
                  </Col>
                  <Col span={3} className="center"><Checkbox checked={section.status === 'ACTIVE'} onChange={(e) => changeActiveSection(index, e.target.checked)}/></Col>
                  <Col span={3} className="center"><Checkbox checked={section.prefilled === true} onChange={(e) => changePrefillSection(index, e.target.checked)}/></Col>
                  <Col span={3} className="tools">
                    <Button icon="edit" size="small" disabled={section.type === null || section.type === undefined} onClick={(e) => editSection(section)}/>
                    { sections.length > 1 && <Button icon="delete" size="small" onClick={(e) => deleteSection(index)}/> }
                  </Col>
                </Row>
              )}
            </>
            :
            <>
                <p>Agregar primera sección</p>
                <Button icon="plus" size="small" onClick={addSection} />
            </>
            }
            { isVisiblePreview &&
              <Modal
                className="preview-modal"
                footer={ null }
                visible={ true }
                onOk={ closeModalHandler  }
                onCancel={ closeModalHandler }
                style={{ top: 20 }}
              >
                <div>
                  <div className="top-bar">
                    Vista Previa
                  </div>
                  <Preview form={form} closeModalHandler={closeModalHandler} />
                </div>
              </Modal>
            }
          </div>
          }
        </>
      }
    </div>
  )
}
export default FormEdit;
