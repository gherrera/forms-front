import "./FormEdit.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Radio,
  Select,
  Menu,
  Dropdown,
  Icon,
  Checkbox,
  DatePicker,
  Button,
  Input,
  Spin,
  notification
} from "antd";
import { SectionEdit } from '../'

import { camelizerHelper } from "../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByIdPromise } from "./promises";

const FormEdit = ({ formId, refreshBreadCrumbs, exitSection }) => {
	const { t } = useTranslation()
  const [form, setForm] = useState({})
  const [sections, setSections] = useState([])
  const [section, setSection] = useState(null)
  const [changes, setChanges] = useState(false)

  useEffect(() => {
		getFormByIdPromise(formId).then(f=>{
      setForm(f)
      setSections(f.sections)
		})
	}, [])

  const addSection = () => {
    let section = {id: Math.random(), status: 'ACTIVE', isNew: true}
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

  const changeTypeSection = (index, value) => {
    setSections(
      sections.map((section, i) => {
        if (index == i) {
          if(section.isNew && (value === 'TABLE' || value === 'DECL')) {
            return { ...section, type: value, components: [{ type: value, fieldSet: { cols: 2, fields: [{typeField: 'INPUT'}] }}]};
          }else if(section.isNew && (value === 'HEADER' || value === 'CONTACT')) {
            return { ...section, type: value, components: []};
          }else if(section.isNew && (value === 'INTRO')) {
            return { ...section, type: value, components: [{ type: 'PARAGRAPH' }]};
          }else if(section.isNew && (value === 'TEXT')) {
          }else {
           return { ...section, type: value };
          }
        } else {
          return section;
        }
      }
    ))
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
    console.log(sections)
    setChanges(false)
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
              <Col span={4} offset={20}>
                <Button disabled={!changes} onClick={saveForm}>Guardar cambios</Button>
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
          </div>
          }
        </>
      }
    </div>
  )
}
export default FormEdit;
