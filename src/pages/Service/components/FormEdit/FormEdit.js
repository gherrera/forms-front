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

const FormEdit = ({ formId, refreshBreadCrumbs }) => {
	const { t } = useTranslation()
  const [form, setForm] = useState(null)
  const [sections, setSections] = useState([])
  const [section, setSection] = useState(null)

  useEffect(() => {
		getFormByIdPromise(formId).then(f=>{
			setForm(f)
      setSections(f.sections)
		})

	}, [])

  const addSection = () => {
    var joined = sections.concat({status: 'ACTIVE'});
    setSections(joined)
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
  }

  const deleteSection = (index) => {
    setSections(sections.filter((item, i) => i !== index));
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
  }

  const changeTypeSection = (index, value) => {
    setSections(
      sections.map((section, i) => {
        if (index == i) {
          return { ...section, type: value };
        } else {
          return section;
        }
      }
    ))
  }

  return (
    <div className="form-edit">
      { form === null ? <Spin/>
        :
        <div className="form">
          { section ? <SectionEdit section={section}/>
          :
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
                  <Select defaultValue={section.type} onChange={(value) => changeTypeSection(index, value)}>
                    <Select.Option value="INTRO">Introducción</Select.Option>
                    <Select.Option value="HEADER">Encabezado</Select.Option>
                    <Select.Option value="CONTACT">Datos Personales</Select.Option>
                    <Select.Option value="DECL">Pregunta Tipo Declaración</Select.Option>
                    <Select.Option value="TABLE">Tipo Tabla</Select.Option>
                    <Select.Option value="TEXT">Cuadro de Texto</Select.Option>
                  </Select>
                </Col>
                <Col span={3} className="center"><Checkbox defaultChecked={section.status === 'ACTIVE'} onChange={(value) => changeActiveSection(index, value)}/></Col>
                <Col span={3} className="center"><Checkbox defaultChecked={section.prefilled === true} onChange={(value) => changePrefillSection(index, value)}/></Col>
                <Col span={3}>
                  <Button icon="edit" size="small" onClick={(e) => editSection(section)}/>
                  { sections.length > 1 && <Button icon="delete" size="small" onClick={(e) => deleteSection(index)}/> }
                </Col>
              </Row>
            )}
          </>
          }
        </div>
      }
    </div>
  )
}
export default FormEdit;
