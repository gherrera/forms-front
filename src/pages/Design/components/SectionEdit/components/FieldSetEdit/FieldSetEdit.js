import "./FieldSetEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Select,
  Checkbox,
  Button,
  Input,
  Tooltip,
  Modal
} from "antd";

import { useTranslation } from "react-i18next";
import { Datasources } from "../";

const FieldSetEdit = ({ hasHeader=true, section, fieldset, refreshSection }) => {
	const { t } = useTranslation()
  const [ isVisibleModalDS, setIsVisibleModalDS ] = useState(false)
  const [ indexFieldDS, setIndexFieldDS ] = useState(-1)
  const [ fieldDS, setFieldDS ] = useState(null)

  useEffect(() => {

  }, [])

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
    fields.push({type: 'FIELD', typeField: 'INPUT'})

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

  const showDataSource = (field, index) => {
    setFieldDS(field)
    setIndexFieldDS(index)
    //if(fieldset.fields[index].source) handleChangeDatasource(fieldset.fields[index].source)
    setIsVisibleModalDS(true)
  }

  const closeModalHandler = () => {
    setIndexFieldDS(-1)
    setIsVisibleModalDS(false)
  }

  const handleClickSelectDS = (valueDS) => {
    handleChangeAttribute(indexFieldDS, 'source', valueDS)
    closeModalHandler()
  }

  return (
    <div className="fieldset-edit">
      <div className="comp-fieldSet-edit">
        { hasHeader &&
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
              <Col span={1}>{fieldset.fields ? fieldset.fields.length : 'NA'}</Col>
              </>
            }
          </Row>
        }
        { section.type !== 'HEADER' && section.type !== 'CONTACT' && fieldset.fields &&
          <>
          <Row className="titles-section">
            <Col span={9} offset={1}>Título</Col>
            <Col span={5}>Tipo</Col>
            <Col span={3} className="center">Requerido</Col>
            <Col span={3} className="center">Tabla Visible</Col>
            <Col span={3}></Col>
          </Row>
          { fieldset.fields.map((field, index) =>
            <Row className="rows-section">
              <Col span={1}>
                { section.type !== 'HEADER' && section.type !== 'CONTACT' && index === fieldset.fields.length -1 && 
                  <Button icon="plus" size="small" onClick={addField}/> 
                }
              </Col>
              <Col span={9}><Input value={field.title} placeholder="Ingrese nombre del atributo" size="small" onChange={(e) => handleChangeAttribute(index, 'title', e.target.value)}/></Col>
              <Col span={5}>
                <Select value={field.typeField} onChange={(value) => handleChangeAttribute(index, 'typeField', value)} size="small">
                  <Select.Option value="INPUT">Texto</Select.Option>
                  <Select.Option value="DATE">Fecha</Select.Option>
                  <Select.Option value="SELECT">Desplegable</Select.Option>
                </Select>
              </Col>
              <Col span={3} className="center">
                  <Checkbox checked={field.required === true} onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} size="small"/>
              </Col>
              <Col span={3} className="center">
                  <Checkbox checked={field.tableVisible === true} onChange={(e) => handleChangeAttribute(index, 'tableVisible', e.target.checked)} size="small"/>
              </Col>
              <Col span={3}>
                <Col span={4} offset={6}>
                  { field.typeField === 'SELECT' && 
                    <Tooltip title="Fuente de Datos">
                      <Button icon="unordered-list" size="small" onClick={() => showDataSource(field, index)}/>
                    </Tooltip>
                  }
                </Col>
                <Col span={4}>
                  { fieldset.fields.length > 1 && <Tooltip title="Eliminar"><Button icon="delete" size="small" onClick={() => deleteField(index)}/></Tooltip> }
                </Col>
              </Col>
            </Row>
          )}
          </>
        }
      </div>

      { isVisibleModalDS &&
        <Modal
          className="modal-datasources"
          title="Fuente de datos"
          footer={ null }
          visible={ true }
          onOk={ closeModalHandler  }
          onCancel={ closeModalHandler }
          >
            <Datasources formId={section.formId} field={fieldDS} handleClickSelectDS={handleClickSelectDS} closeModalHandler={closeModalHandler} />
        </Modal>
      }
    </div>
  )
}
export default FieldSetEdit;
