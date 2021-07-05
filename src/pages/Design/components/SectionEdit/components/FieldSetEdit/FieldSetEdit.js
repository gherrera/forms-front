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
  Modal,
  Icon
} from "antd";

import { useTranslation } from "react-i18next";
import { Datasources } from "../";

const FieldSetEdit = ({ hasHeader=true, section, component, fieldset, refreshSection }) => {
	const { t } = useTranslation()
  const [ isVisibleModalDS, setIsVisibleModalDS ] = useState(false)
  const [ indexFieldDS, setIndexFieldDS ] = useState(-1)
  const [ fieldDS, setFieldDS ] = useState(null)

  useEffect(() => {

  }, [])

  const handlerChangeAttr = (attr, value) => {
    let comp = []
    section.components.map((c) => {
      if(c.type === 'FIELDSET' && c.id === fieldset.id) {
        comp.push({ ...c, [attr]: value })
      }else if(c.fieldSet && c.fieldSet.id === fieldset.id) {
        comp.push({ ...c, fieldSet: { ...c.fieldSet, [attr]: value }})
      }else {
        comp.push(c)
      }
    })
    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  const getComponentsUpdated = (fields) => {
    let comp = []
    section.components.map((c) => {
      if(c.type === 'FIELDSET' && c.id === fieldset.id) {
        comp.push({ ...c, fields })
      }else if(c.fieldSet && c.fieldSet.id === fieldset.id) {
        comp.push({ ...c, fieldSet: { ...c.fieldSet, fields }})
      }else {
        comp.push(c)
      }
    })
    return comp
  }

  const getRandomId = () => {
    return 'R' + Math.floor(Math.random() * 1000000);
  }

  const addField = () => {
    let fields = []
    fieldset.fields.map(f => {
      fields.push(f)
    })
    fields.push({id: getRandomId(), type: 'FIELD', typeField: 'INPUT', required: true, tableVisible: true, key: 'field'+(fields.length+1)})

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
            { section.type === 'CONTACT' &&
            <>
              <Col md={1} sm={2}>Título</Col>
              <Col span={7}><Input value={fieldset.title} onChange={(e) => handlerChangeAttr('title', e.target.value)} size="small" /></Col>
            </>
            }
            <Col span={3} offset={1}>
              <Tooltip title="Seleccione el número de columna en las cuales desea ordenar los datos a solicitar">
                <Icon size="small" type="info-circle"/>
              </Tooltip> Nro de Columnas
            </Col>
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
              <Col span={3} offset={1}>Datos seleccionados</Col>
              <Col span={1}>{fieldset.fields ? fieldset.fields.length : 'NA'}</Col>
              </>
            }
          </Row>
        }
        { section.type !== 'HEADER' && section.type !== 'CONTACT' && fieldset.fields &&
          <>
          <Row className="titles-section">
            { component.type === 'PARAGRAPH' ? 
              <>
                <Col span={1} offset={1}>&lt;#&gt;</Col>
                <Col span={8}>Nombre del dato</Col>
              </>
              :
              <>
                <Col span={9} offset={1}>Nombre del dato</Col>
              </>
            }
            <Col span={4}>Tipo</Col>
            <Col span={component.type === 'PARAGRAPH' ? 6 : 3} className="center">Requerido</Col>
            { component.type !== 'PARAGRAPH' && <Col span={3} className="center">Tabla Visible</Col> }
            <Col span={4} className="center">Acciones</Col>
          </Row>
          { fieldset.fields.map((field, index) =>
            <Row className="rows-section">
              <Col span={1}>
                { section.type !== 'HEADER' && section.type !== 'CONTACT' && index === fieldset.fields.length -1 && 
                  <Button icon="plus" size="small" onClick={addField}/> 
                }
              </Col>
              { component.type === 'PARAGRAPH' && 
                <Col span={1}>&lt;{index+1}&gt;</Col>
              }
              <Col span={component.type === 'PARAGRAPH' ? 8 : 9}><Input value={field.title} placeholder="Ingrese nombre del dato" size="small" onChange={(e) => handleChangeAttribute(index, 'title', e.target.value)}/></Col>
              <Col span={4}>
                <Select value={field.typeField} onChange={(value) => handleChangeAttribute(index, 'typeField', value)} size="small">
                  <Select.Option value="INPUT">Texto</Select.Option>
                  <Select.Option value="DATE">Fecha</Select.Option>
                  <Select.Option value="SELECT">Desplegable</Select.Option>
                </Select>
              </Col>
              <Col span={component.type === 'PARAGRAPH' ? 6 : 3} className="center">
                  <Checkbox checked={field.required === true} onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} size="small"/>
              </Col>
              { component.type !== 'PARAGRAPH' &&
                <Col span={3} className="center">
                    <Checkbox checked={field.tableVisible === true} onChange={(e) => handleChangeAttribute(index, 'tableVisible', e.target.checked)} size="small"/>
                </Col>
              }
              <Col span={4} className="tools-fieldset">
                { field.typeField === 'SELECT' && 
                  <Tooltip title="Fuente de Datos">
                    <Button icon="unordered-list" size="small" onClick={() => showDataSource(field, index)}/>
                  </Tooltip>
                }
                <Tooltip title="Eliminar">
                    <Button icon="delete" size="small" disabled={fieldset.fields.length === 1} onClick={() => deleteField(index)}/>
                </Tooltip>
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
