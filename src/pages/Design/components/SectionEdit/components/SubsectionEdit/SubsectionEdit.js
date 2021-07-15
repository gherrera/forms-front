import "./SubsectionEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Tooltip,
  Checkbox,
  Icon,
  Input,
  Popconfirm,
} from "antd";
import { TableEdit, FieldSetEdit, ParagraphEdit, TextEdit } from '../'


const SubsectionEdit = ({ indexSection, section, subsection, getComponentByType, getTooltipComponent, handleChangeValuesSection }) => {

  const handleClickComponent = (c) => {
    let subcomp = []
    subsection.components.map(c => {
      subcomp.push(c)
    })
    subcomp.push(getComponentByType(c, true))
    handlerChangeAttr('components', subcomp)
  }

  const deleteComponent = (index) => {
    let subcomp = subsection.components.filter((c,i) => index !== i)
    handlerChangeAttr('components', subcomp)
  }

  const handlerChangeAttr = (attr, value) => {
    subsection[attr] = value
    handleChangeValuesSection(section)
  }

  const handleChangeAttribute = (c, attr, value) => {
    c[attr] = value
    handleChangeValuesSection(section)
  }

    return (
      <div className="subsection-edit">
        <Row>
            <Col md={3} sm={4}>Título de la Subsección</Col>
            <Col span={8}>
              <Input value={subsection.title} onChange={(e) => handlerChangeAttr('title', e.target.value)} size="small" />
            </Col>
        </Row>
        <Row className="custom-tools">
          <ul className="custom-tools-group-menu">
          {["PARAGRAPH", "FIELDSET", "TABLE", "DECL", "TEXT"].map(c =>
            <li>
                <a href="#0" onClick={() => handleClickComponent(c)}>
                  <span>
                    { c === "PARAGRAPH" && <><Icon type="align-center" />&nbsp;Párrafo</>}
                    { c === "FIELDSET" && <><Icon type="form" />&nbsp;Datos</>}
                    { c === "TABLE" && <><Icon type="table" />&nbsp;Tabla</>}
                    { c === "DECL" && <><Icon type="table" />&nbsp;Declaración</>}
                    { c === "TEXT" && <><Icon type="edit" />&nbsp;Texto</>}
                  </span>
                  <span>
                    <Tooltip title="Agregar">
                      <Icon type="plus"/>
                    </Tooltip>
                  </span>
                </a>
            </li>
            )}
          </ul>
        </Row>

        <div className={'section-components section-type-'+section.type}>
          { subsection.components && subsection.components.map((component, index) =>
            <Row className={'row-component-section row-' + component.type}>
              <Row className="header-section-component-custom">
                <Col span={20}><strong>{indexSection+1}.{index+1}. {getTooltipComponent(component.type)}</strong></Col>
                <Col span={4} className="tools-section-component-custom">
                  <Tooltip title="Eliminar Componente" placement="bottom">
                    <Popconfirm title="Confirma eliminar el Componente?" onConfirm={(e) => deleteComponent(index)}>
                      <Button size="small" icon="delete" />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>

              { component.type === 'PARAGRAPH' &&
                <ParagraphEdit section={section} component={component} fieldset={component.fieldSet} handleChangeValuesSection={handleChangeValuesSection}/>
              }
              { component.type === 'FIELDSET' &&
                <FieldSetEdit section={section} component={component} fieldset={component} handleChangeValuesSection={handleChangeValuesSection} />
              }
              { (component.type === 'TABLE' || component.type === 'DECL') &&
                <TableEdit section={section} component={component} fieldset={component.fieldSet} handleChangeValuesSection={handleChangeValuesSection} />
              }
              { component.type === 'TEXT' &&
                <TextEdit section={section} component={component} handleChangeValuesSection={handleChangeValuesSection}/>
            }
            </Row>
          )}
        </div>
      </div>
    )
}

export default SubsectionEdit;
