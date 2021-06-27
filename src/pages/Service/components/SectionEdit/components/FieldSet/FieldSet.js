import "./FieldSet.scss";
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
  Form
} from "antd";

import { camelizerHelper } from "../../../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";

const FieldSet = ({ section, fieldset, refreshSection }) => {
	const { t } = useTranslation()

  useEffect(() => {

  }, [])

  const getFieldSet = (fieldset) => {
      return <div className="comp-fieldSet">
      { fieldset.fields.map((field, index) =>
        <Col span={24/fieldset.cols}>
          <Form.Item label={field.title}>
            { field.typeField === 'INPUT' ?
              <Input disabled/>
            :
              <Input />
            }
          </Form.Item>
        </Col>
      )}
      </div>
  }

  const handlerChangeAttr = (attr, value) => {
    let comp = []
    section.components.map((component) => {
      if(component.type === 'FIELDSET' && component.id === fieldset.id) {
        comp.push({ ...component, [attr]: value })
      }else if(component.fieldSet && component.fieldSet.id === fieldset.id) {
        comp.push({ ...component, fieldSet: { ...component.fieldSet, [attr]: value }})
      }else {
        comp.push(component)
      }
    })
    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  const getComponentsUpdated = (fields) => {
    let comp = []
    section.components.map((component) => {
      if(component.type === 'FIELDSET' && component.id === fieldset.id) {
        comp.push({ ...component, fields })
      }else if(component.fieldSet && component.fieldSet.id === fieldset.id) {
        comp.push({ ...component, fieldSet: { ...component.fieldSet, fields }})
      }else {
        comp.push(component)
      }
    })
    return comp
  }

  const addField = () => {
    let fields = []
    fieldset.fields.map(f => {
      fields.push(f)
    })
    fields.push({typeField: 'INPUT'})

    let comp = getComponentsUpdated(fields)    
    let _s = { ...section, components:  comp}
    
    refreshSection(_s)
  }

  const deleteField = (index) => {
    let fields = fieldset.fields.filter((f,i) => i !== index)

    let comp = getComponentsUpdated(fields)    
    let _s = { ...section, components:  comp}

    refreshSection(_s)
  }
 
  const handleChangeAttribute = (index, attr, value) => {
    let fields = []
    fieldset.fields.map((f,i) => {
      if(i === index) {
        fields.push({ ...f, [attr]: value})
      }else {
        fields.push(f)
      }
    })

    let comp = getComponentsUpdated(fields)    
    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  return (
    <div className="fieldset">
    { /*fieldset && fieldset.fields && getFieldSet(fieldset)*/}
    { /*<div className="leyend">{fieldset.title}</div>*/}
      <div className="comp-fieldSet">
        <Row>
          <Col span={1}>Título</Col>
          <Col span={7}><Input value={fieldset.title} onChange={(e) => handlerChangeAttr('title', e.target.value)} size="small" /></Col>
          <Col span={2} offset={1}>Columnas</Col>
          <Col span={1}>
            <Select value={fieldset.cols} onChange={(value) => handlerChangeAttr('cols', value)} size="small">
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
            </Select>
           </Col>
           { (section.type === 'HEADER' || section.type === 'CONTACT') &&
            <>
             <Col span={1} offset={1}>Atributos</Col>
             <Col span={1}>{fieldset.fields.length}</Col>
            </>
           }
        </Row>
        { section.type !== 'HEADER' && section.type !== 'CONTACT' && fieldset.fields &&
          <>
          <Row className="titles-section">
            <Col span={8} offset={1}>Título</Col>
            <Col span={5}>Clave</Col>
            <Col span={5}>Tipo</Col>
            <Col span={4} className="center">Requerido</Col>
            <Col span={1} className="center"></Col>
          </Row>
          { fieldset.fields.map((field, index) =>
            <Row className="rows-section">
              <Col span={1}>
                { section.type !== 'HEADER' && section.type !== 'CONTACT' && index === fieldset.fields.length -1 && 
                  <Button icon="plus" size="small" onClick={addField}/> 
                }
              </Col>
              <Col span={8}><Input value={field.title} placeholder="Ingrese nombre del atributo" size="small" onChange={(e) => handleChangeAttribute(index, 'title', e.target.value)}/></Col>
              <Col span={5}><Input value={field.key} placeholder="Ingrese clave del atributo para JSON" size="small" onChange={(e) => handleChangeAttribute(index, 'key', e.target.value)}/></Col>
              <Col span={5}>
                <Select value={field.typeField} onChange={(value) => handleChangeAttribute(index, 'typeField', value)} size="small">
                  <Select.Option value="INPUT">Texto</Select.Option>
                  <Select.Option value="DATE">Fecha</Select.Option>
                  <Select.Option value="SELECT">Desplegable</Select.Option>
                </Select>
              </Col>
              <Col span={4} className="center">
                  <Checkbox checked={field.required === true} onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} size="small"/>
              </Col>
              <Col span={1} className="center">
                { fieldset.fields.length > 1 &&
                  <Button icon="delete" size="small" onClick={() => deleteField(index)}/>
                }
              </Col>
            </Row>
          )}
          </>
        }
      </div>
    </div>
  )
}
export default FieldSet;
