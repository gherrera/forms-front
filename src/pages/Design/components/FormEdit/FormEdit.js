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
  Popconfirm,
  Tooltip
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
  const [isVisiblePreview, setIsVisiblePreview] = useState(false)
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
  }

  const deleteSection = (index) => {
    let sec = sections.filter((item, i) => i !== index)
    setSections(sec);

    saveForm(sec)
  }

  const handleChangeAttrSection = (index, key, value) => {
    let sec = sections.map((section, i) => {
      if (index == i) {
        return { ...section, [key]: value };
      } else {
        return section;
      }
    })
    setSections(sec)

    if(sec[index].type !== null && sec[index].type !== undefined) saveForm(sec)
  }

  const handleChangeTitle = (index, value) => {
    handleChangeAttrSection(index, 'title', value)
  }

  const changeActiveSection = (index, checked) => {
    handleChangeAttrSection(index, 'status', checked ? 'ACTIVE' : 'INACTIVE')
  }

  const changePrefillSection = (index, checked) => {
    handleChangeAttrSection(index, 'prefilled', checked)
  }

  const editSection = (s) => {
    s.formId = formId
    setSection(s)
    refreshBreadCrumbs(form.name + ' - ' + s.title, s.title)
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

    saveForm(sec)
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
  }

  const exitSectionFn = () => {
    setSection(null)
    exitSection()
  }

  const saveForm = (s) => {
    saveFormPromise({ ...form, sections: s}).then(f => {
      setForm(f)
      setSections(f.sections)
    })
  }

  const handlePreviewSection = () => {
    setIsVisiblePreview(true)
  }

  const closeModalHandler = () => {
    setIsVisiblePreview(false)
  }

  const handleMoveSection = (index, moveTo) => {
    let sec = sections
    let tmp = sec[moveTo]
    sec[moveTo] = sec[index]
    sec[index] = tmp
    saveForm(sec)
  }

  return (
    <div className="form-edit">
      { form === null ? <Spin/>
        :
        <>
          { section ? <SectionEdit s={section} refreshThisSection={refreshSection} exitSection={exitSectionFn} />
          :
          <div className="form">
            { sections.length > 0 ?
            <>
              <Row className="tools-btn">
                <Col span={6} offset={18}>
                  <Button onClick={handlePreviewSection}>Previsualizar</Button>
                </Col>
              </Row>
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
                    { index === sections.length -1 && 
                      <Tooltip title="Nueva Sección">
                        <Button icon="plus" size="small" onClick={addSection}/>
                      </Tooltip>
                    }
                  </Col>
                  <Col span={8}><Input value={section.title} placeholder="Titulo de la sección" onChange={(e) => handleChangeTitle(index, e.target.value)}/></Col>
                  <Col span={6}>
                    <Select value={section.type} onChange={(value) => changeTypeSection(index, value)} disabled={!section.isNew}>
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
                    <Tooltip title="Modificar">
                      <Button icon="edit" size="small" disabled={section.type === null || section.type === undefined} onClick={(e) => editSection(section)}/>
                    </Tooltip>
                    <Popconfirm title="Confirma eliminar la Sección?" onConfirm={(e) => deleteSection(index)}>
                      <Button icon="delete" size="small" />
                    </Popconfirm>
                    <Tooltip title="Mover hacia abajo">
                      <Button icon="arrow-down" size="small" disabled={index === sections.length-1} onClick={() => handleMoveSection(index, index+1)} />
                    </Tooltip>
                    <Tooltip title="Mover hacia arriba">
                      <Button icon="arrow-up" size="small" disabled={index === 0} onClick={() => handleMoveSection(index, index-1)} />
                    </Tooltip>
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
