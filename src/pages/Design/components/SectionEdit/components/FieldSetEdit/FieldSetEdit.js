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
  Icon,
  Drawer
} from "antd";
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { useTranslation } from "react-i18next";
import { Datasources, Validation } from "../";
import Catalogos from "../Catalogos/Catalogos";

const FieldSetEdit = ({ hasHeader=true, section, component, fieldset, refreshSection }) => {
	const { t } = useTranslation()
  const [ isVisibleModalDS, setIsVisibleModalDS ] = useState(false)
  const [ isVisibleModalValidations, setIsVisibleModalValidations ] = useState(false)
  const [ indexField, setIndexField ] = useState(-1)
  const [ showCatalogo, setShowCatalogo ] = useState(false)

  const DragHandle = SortableHandle(() => <Col span={1} className="drag-area"><Icon type="drag"/></Col>);

  const SortableItem = SortableElement(({value}) => <Row className="rows-section">{value}<DragHandle /></Row>);

  const SortableList = SortableContainer(({items}) => {
    return (
      <div className="fields-body">
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </div>
    );
  });

  useEffect(() => {

  }, [])

  const handlerChangeAttr = (attr, value) => {
    let comp = []
    section.components.map((c) => {
      if(c.type === 'FIELDSET' && c.id === fieldset.id) {
        if(attr === 'orientation' && value === 'horizontal') {
          c.cols = 2
        }
        comp.push({ ...c, [attr]: value })
      }else if(c.fieldSet && c.fieldSet.id === fieldset.id) {
        if(attr === 'orientation' && value === 'horizontal') {
          c.fieldSet.cols = 2
        }
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

    if(attr === 'typeField') {
      fields[index].validation = null
      if(value === 'CHECKBOX') {
        fields[index].required = false
      }
    }
    let comp = getComponentsUpdated(fields)    
    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  const showDataSource = (index) => {
    setIndexField(index)
    //if(fieldset.fields[index].source) handleChangeDatasource(fieldset.fields[index].source)
    setIsVisibleModalDS(true)
  }

  const showValidations = (index) => {
    setIndexField(index)
    setIsVisibleModalValidations(true)
  }

  const closeModalHandlerDS = () => {
    setIndexField(-1)
    setIsVisibleModalDS(false)
  }

  const handleClickSelectDS = (valueDS) => {
    handleChangeAttribute(indexField, 'source', valueDS)
    closeModalHandlerDS()
  }

  const closeModalHandlerValidations = () => {
    setIndexField(-1)
    setIsVisibleModalValidations(false)
  }

  const handleClickSelectValidation = (validation) => {
    handleChangeAttribute(indexField, 'validation', validation)
    closeModalHandlerValidations()
  }

  const getValidationTitle = (validation) => {
    if(validation) {
      let text = 'Validaciones: '
      if(validation.type === 'email') {
        text += 'Email'
      }else if(validation.type === 'rut') {
        text += 'Rut'
      }else if(validation.type === 'rutEmp') {
        text += 'Rut Persona Jurídica'
      }else if(validation.type === 'rutNat') {
        text += 'Rut Persona Naturla'
      }else if(validation.type === 'number') {
        text += 'Número'
      }
      return text
    }else {
      return 'Validaciones'
    }
  }

  const onCloseCatalogo = () => {
    setShowCatalogo(false)
  }

  const handleApplyFields = (fields) => {
    let fs = []
    fieldset.fields.map(f => {
      fs.push(f)
    })
    fields.map(f => {
      fs.push({id: getRandomId(), title: f.title, type: 'FIELD', typeField: f.type, required: f.type !== 'CHECKBOX' && f.required, tableVisible: true, key: 'field'+(fs.length+1), source: f.source, validation: f.validation})
    })

    let comp = getComponentsUpdated(fs)    
    let _s = { ...section, components:  comp}
    
    refreshSection(_s)
    onCloseCatalogo()
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    let fs = { ...fieldset }
    let fields = fs.fields

    let newItem = fields[newIndex]
    fields[newIndex] = fields[oldIndex]
    fields[oldIndex] = newItem

    let comp = getComponentsUpdated(fields) 
    let _s = { ...section, components:  comp}
    refreshSection(_s)
  }

  return (
    <div className="fieldset-edit">
      <div className="comp-fieldSet-edit">
        { hasHeader &&
          <Row>
            <Col md={3} sm={4}>Título de los Datos</Col>
            <Col span={7}>
              <Input value={fieldset.hasTitle ? fieldset.title : ''} onChange={(e) => handlerChangeAttr('title', e.target.value)} size="small" disabled={!fieldset.hasTitle} />
            </Col>
            <Col span={1} className="chk-title">
              <Checkbox checked={fieldset.hasTitle} onChange={(e) => handlerChangeAttr('hasTitle', e.target.checked)} size="small" />
            </Col>
            <Col span={2}>
               Orientación
            </Col>
            <Col span={2}>
              <Select value={fieldset.orientation ? fieldset.orientation : "vertical"} onChange={(value) => handlerChangeAttr('orientation', value)} size="small">
                  <Select.Option value="vertical">Vertical</Select.Option>
                  <Select.Option value="horizontal">Horizontal</Select.Option>
              </Select>
            </Col>
            <Col span={3}>
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
            { (section.type === 'CONTACTPERSON') ?
              <>
              <Col span={3} offset={1}>Datos seleccionados</Col>
              <Col span={1}>{fieldset.fields ? fieldset.fields.length : 'NA'}</Col>
              </>
              :
              <>
              <Col span={3} offset={1}>
                Agregar datos del Catálogo
              </Col>
              <Col span={1}>
                <Button size="small" icon="unordered-list" onClick={(e) => setShowCatalogo(true)}/>
              </Col>
              </>
            }
          </Row>
        }
        { section.type !== 'CONTACTPERSON' && fieldset.fields &&
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
            { (component.type === 'TABLE' || component.type === 'DECL') && <Col span={3} className="center">Tabla Visible</Col> }
            <Col span={3} className="center">Acciones</Col>
            <Col span={1} className="center">Orden</Col>
          </Row>
          
          <SortableList useDragHandle items=
            { fieldset.fields.map((field, index) =>
              <>
                <Col span={1}>
                  { section.type !== 'CONTACTPERSON' && index === fieldset.fields.length -1 && 
                    <Button icon="plus" size="small" onClick={addField}/> 
                  }
                </Col>
                { component.type === 'PARAGRAPH' && 
                  <Col span={1}>&lt;{index+1}&gt;</Col>
                }
                <Col span={component.type === 'PARAGRAPH' ? 8 : 9}><Input value={field.title} placeholder="Ingrese nombre del dato" size="small" onChange={(e) => handleChangeAttribute(index, 'title', e.target.value)}/></Col>
                <Col span={4}>
                  <Select value={field.typeField} onChange={(value) => handleChangeAttribute(index, 'typeField', value)} size="small">
                    <Select.Option value="INPUT">
                      <Col span={2}><Icon type="edit"/></Col><Col span={21}>&nbsp;&nbsp;Editable</Col>
                    </Select.Option>
                    <Select.Option value="DATE">
                      <Col span={2}><Icon type="calendar"/></Col><Col span={21}>&nbsp;&nbsp;Fecha</Col>
                    </Select.Option>
                    <Select.Option value="SELECT">
                      <Col span={2}><Icon type="unordered-list"/></Col><Col span={21}>&nbsp;&nbsp;Desplegable</Col>
                    </Select.Option>
                    <Select.Option value="CHECKBOX">
                      <Col span={2}><Icon type="check-square"/></Col><Col span={21}>&nbsp;&nbsp;Checkbox</Col>
                    </Select.Option>
                    {component.type !== 'PARAGRAPH' &&
                      <Select.Option value="RADIO">
                        <Col span={2}><Icon type="ellipsis"/></Col><Col span={21}>&nbsp;&nbsp;Opciones</Col>
                      </Select.Option>
                    }
                  </Select>
                </Col>
                <Col span={component.type === 'PARAGRAPH' ? 6 : 3} className="center">
                    <Checkbox checked={field.required === true} disabled={field.typeField === 'CHECKBOX'} onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} size="small"/>
                </Col>
                { (component.type === 'TABLE' || component.type === 'DECL') &&
                  <Col span={3} className="center">
                      <Checkbox checked={field.tableVisible === true} onChange={(e) => handleChangeAttribute(index, 'tableVisible', e.target.checked)} size="small"/>
                  </Col>
                }
                <Col span={3} className="center">
                  <div className="tools-fieldset">
                  { (field.typeField === 'SELECT' || field.typeField === 'RADIO') ?
                    <Tooltip title="Fuente de Datos">
                      <Button icon="unordered-list" size="small" onClick={() => showDataSource(index)}/>
                    </Tooltip>
                    : field.typeField === 'INPUT' ?
                    <Tooltip title={ getValidationTitle(field.validation)}>
                      <Button icon="check" size="small" onClick={() => showValidations(index)}/>
                    </Tooltip>
                    :
                    <></>
                  }
                  <Tooltip title="Eliminar">
                      <Button icon="delete" size="small" disabled={fieldset.fields.length === 1} onClick={() => deleteField(index)}/>
                  </Tooltip>
                  </div>
                </Col>
              </>
            )}
            onSortEnd={onSortEnd}
          />
          </>
        }
      </div>
      { isVisibleModalDS &&
        <Modal
          className="modal-datasources"
          title="Fuente de datos"
          footer={ null }
          visible={ true }
          onOk={ closeModalHandlerDS  }
          onCancel={ closeModalHandlerDS }
          >
            <Datasources formId={section.formId} field={fieldset.fields[indexField]} handleClickSelect={handleClickSelectDS} closeModalHandler={closeModalHandlerDS} />
        </Modal>
      }

      { isVisibleModalValidations &&
        <Modal
          className="modal-validations"
          title="Validaciones"
          footer={ null }
          visible={ true }
          onOk={ closeModalHandlerValidations  }
          onCancel={ closeModalHandlerValidations }
          >
            <Validation field={fieldset.fields[indexField]} handleClickSelect={handleClickSelectValidation} closeModalHandler={closeModalHandlerValidations}/>
        </Modal>
      }
      {showCatalogo && 
        <Drawer 
          title="Seleccionar datos de Catálogo"
          placement="left"
          closable={true}
          visible={true}
          width={1300}
          onClose={onCloseCatalogo}
        >
          <Catalogos section={section} type="CONTACTPERSON" active={true} handleClose={onCloseCatalogo} handleApplyFields={handleApplyFields}/>
        </Drawer>
      }
    </div>
  )
}
export default FieldSetEdit;
