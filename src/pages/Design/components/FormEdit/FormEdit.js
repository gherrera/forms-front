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
  Tooltip,
  Icon
} from "antd";
import { SectionEdit, Preview } from '../'
import { datasourcesContext } from '../../../../contexts'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useTranslation } from "react-i18next";
import { getFormByIdPromise, saveFormPromise, generateFormPromise } from "./promises";


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  cursor: 'auto',

  // styles we need to apply on draggables
  ...draggableStyle
});

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
    let section = {id: getRandomId(), status: 'ACTIVE', type: null}
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

    if(key !== 'title' && sec[index].type !== null && sec[index].type !== undefined) saveForm(sec)
  }

  const handleBlurTitle = () => {
    saveForm(sections)
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

  const getTypeSection = (type) => {
    if(type === 'INTRO') return "Introducción"
    else if(type === 'CONTACTPERSON') return "Catálogo de Datos de Persona Natural"
    else if(type === 'CONTACTENTIY') return "Catálogo de Datos de Persona Jurídica"
    else if(type === 'DATA') return "Datos Personalizados"
    else if(type === 'TABLE') return "Tabla"
    else if(type === 'DECL') return "Pregunta Tipo Declaración"
    else if(type === 'TABLE') return "Tabla"
    else if(type === 'TEXT') return "Cuadro de Texto"
    else if(type === 'COMMENTS') return "Comentarios"
    else if(type === 'CUSTOM') return "Seccion Personalizada"
  }

  const editSection = (s) => {
    s.formId = formId
    setSection(s)
    refreshBreadCrumbs(getTypeSection(s.type), null)
  }

  const getRandomId = () => {
    return 'R' + Math.floor(Math.random() * 1000000);
  }

  const changeTypeSection = (index, value) => {
    let sec = sections.map((section, i) => {
      if (index == i && section.type === null) {
        if(value === 'TABLE' || value === 'DECL') {
          return { ...section, type: value, components: [{ id: getRandomId(), type: value, records:[], fieldSet: { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: false, fields: [] }}]};
        }else if(value === 'CONTACTPERSON' || value === 'CONTACTENTITY') {
          return { ...section, type: value, components: []};
        }else if(value === 'DATA') {
          return { ...section, type: value, components: [{id: getRandomId(), type: 'PARAGRAPH'}, { id: getRandomId(), type: 'FIELDSET', cols: 2, hasTitle: false, fields: [] }]};
        }else if(value === 'INTRO') {
          return { ...section, type: value, components: [{ id: getRandomId(), type: 'PARAGRAPH', fieldSet: {id: getRandomId(), type: 'FIELDSET', hasTitle: false, fields: []} }]};
        }else if(value === 'TEXT') {
          return { ...section, type: value, components: [{id: getRandomId(), type: 'PARAGRAPH'}] };
        }else if(value === 'COMMENTS') {
          return { ...section, type: value, components: [{id: getRandomId(), type: 'PARAGRAPH'}, {id: getRandomId(), type: 'FIELD', required: true}] };
        }else if(value === 'CUSTOM') {
          return { ...section, type: value, components: [] };
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

  const handleGenerateForm = async () => {
    let fId = await generateFormPromise(formId)
    window.open("forms/"+fId)
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newIndex = result.source.index
    const oldIndex = result.destination.index
    let sec = sections
    let tmp = sec[newIndex]
    sec[newIndex] = sec[oldIndex]
    sec[oldIndex] = tmp
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
                  <Button onClick={handleGenerateForm}>Generar Formulario</Button>
                  <Button onClick={handlePreviewSection} type="primary">Previsualizar</Button>
                </Col>
              </Row>
              <Row className="titles-section">
                <Col span={8} offset={1}>Nombre de la Sección</Col>
                <Col span={6}>Tipo de Sección</Col>
                <Col span={3} className="center">Activar</Col>
                <Col span={3} className="center">Prellenado</Col>
                <Col span={2}>Edición</Col>
                <Col span={1}>Orden</Col>
              </Row>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      { sections.map((section, index) =>
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided, snapshot) =>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Row className="rows-section">
                                <Col span={1}>
                                  { index === sections.length -1 && 
                                    <Tooltip title="Nueva Sección">
                                      <Button icon="plus" size="small" onClick={addSection}/>
                                    </Tooltip>
                                  }
                                </Col>
                                <Col span={8}><Input value={section.title} placeholder="Titulo de la sección" onChange={(e) => handleChangeTitle(index, e.target.value)} onBlur={handleBlurTitle}/></Col>
                                <Col span={6}>
                                  <Select value={section.type} onChange={(value) => changeTypeSection(index, value)} disabled={section.type !== null}>
                                    <Select.Option value="INTRO">Párrafo con Datos</Select.Option>
                                    <Select.Option value="CONTACTPERSON">Catálogo de Datos de Persona Natural</Select.Option>
                                    <Select.Option value="CONTACTENTIY">Catálogo de Datos de Persona Jurídica</Select.Option>
                                    <Select.Option value="DATA">Datos Personalizados</Select.Option>
                                    <Select.Option value="DECL">Pregunta Tipo Declaración</Select.Option>
                                    <Select.Option value="TABLE">Tipo Tabla</Select.Option>
                                    <Select.Option value="TEXT">Párrafo</Select.Option>
                                    <Select.Option value="COMMENTS">Comentarios</Select.Option>
                                    <Select.Option value="CUSTOM">Seccion Personalizada</Select.Option>
                                  </Select>
                                </Col>
                                <Col span={3} className="center"><Checkbox checked={section.status === 'ACTIVE'} onChange={(e) => changeActiveSection(index, e.target.checked)}/></Col>
                                <Col span={3} className="center"><Checkbox checked={section.prefilled === true} onChange={(e) => changePrefillSection(index, e.target.checked)}/></Col>
                                <Col span={2} className="tools">
                                  <Tooltip title="Modificar">
                                    <Button icon="edit" size="small" disabled={section.type === null || section.type === undefined} onClick={(e) => editSection(section)}/>
                                  </Tooltip>
                                  <Popconfirm title="Confirma eliminar la Sección?" onConfirm={(e) => deleteSection(index)}>
                                    <Button icon="delete" size="small" />
                                  </Popconfirm>
                                </Col>
                                <Col span={1} className="drag-area"><Icon type="drag"/></Col>
                              </Row>
                            </div>
                          }
                        </Draggable>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
