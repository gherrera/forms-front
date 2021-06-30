import "./Section.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Row,
  Input,
  Form
} from "antd";
import { Paragraph, FieldSet, Table } from '../'
import { saveSectionValuesPromise } from "../../promises";

import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Section = ({ form, decl, section, mode, refreshForm }) => {
  const { t } = useTranslation()
  const { getFieldDecorator } = form;
  const [ sSection, setSSection ] = useState(section)

  const refreshSection = (s, updateValues=true) => {
    setSSection(s)

    if(refreshForm) {
      let _d = { ...decl }
      let _sec = []
      _d.sections.map((sec, i) => {
        if(sec.id === s.id) {
          _sec.push(s)
        }else {
          _sec.push(sec)
        }
      })
      _d.sections = _sec
      refreshForm(_d)

      if(mode === 'html' && updateValues) {
      //if(mode === 'preview') {
        saveSectionValuesPromise(decl.id, s)
      }
     }
  }

  const handleChangeValues = (fieldSet) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(c.type === 'FIELDSET' && c.id === fieldSet.id) {
        comp.push(fieldSet)
      }else if(c.fieldSet && c.fieldSet.id === fieldSet.id) {
        comp.push({ ...c, fieldSet: fieldSet })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)
  }
  
  const handleChangeFieldValue = (component, value) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(c.id === component.id) {
        comp.push({ ...c, value: value })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)
  }

  return (
    <div className={'section-content mode-'+mode}>
        <h4 className="section-title">{sSection.title}</h4>
        <div className="section-body">
        { sSection.components && sSection.components.map((component, index) =>
            <Row className="preview-component">
                { component.type === 'PARAGRAPH' &&
                    <Paragraph component={component} mode={mode} handleChangeValues={handleChangeValues} />
                }
                { component.type === 'FIELDSET' &&
                    <FieldSet section={sSection} parent={sSection} component={component} mode={mode} handleChangeValues={handleChangeValues} getFieldDecorator={getFieldDecorator} />
                }
                { (component.type === 'TABLE' || component.type === 'DECL') &&
                    <Table section={sSection} component={component} mode={mode} refreshSection={refreshSection} />
                }
                { component.type === 'FIELD' &&
                    <TextArea rows={4} value={component.value} disabled={mode==='pdf'} onChange={(e) => handleChangeFieldValue(component, e.target.value)}/>
                }
            </Row>
        )}
        </div>
    </div>
  )
}

export default Form.create()(Section);
