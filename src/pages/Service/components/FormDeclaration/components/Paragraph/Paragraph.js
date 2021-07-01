import "./Paragraph.scss";
import React, { useEffect, useState } from "react";
import {
  Row,
  Input
} from "antd";

import { useTranslation } from "react-i18next";

const Paragraph = ({ component, mode, handleChangeValues }) => {
  const { t } = useTranslation()
  const [fields, setFields] = useState({})
  const [ hasErrors, setHasErrors ] = useState(false)

  useEffect(() => {
    if(component.fieldSet && component.fieldSet.fields) {
      let _fields = {}
      component.fieldSet.fields.map(field => {
        _fields[field.key] = field
      })
      setFields(_fields)

      let errores = component.fieldSet.fields.filter(f => f.required && (f.value === null || f.value === ''));
      setHasErrors(errores.length > 0)
    }
  }, [])

  const handleChangeFieldValue = (field, value) => {
    field.value = value
    handleChangeValues(component.fieldSet)
    let errores = component.fieldSet.fields.filter(f => f.required && (f.value === null || f.value === ''));
    setHasErrors(errores.length > 0)
  }

  const getField = (field) => {
    if(field.typeField === 'INPUT') {
      return <Input size="small" className="field-paragraph" disabled={mode === 'pdf'} placeholder={field.title} value={field.value} onChange={(e) => handleChangeFieldValue(field, e.target.value)} />
    }
  }

  const  getText = (text) => {
    let elems = []
    let data = text.split('<')
    data.map((el, index) => {
      if(el.indexOf('>') > 0) {
        let key = el.substring(0, el.indexOf('>'))
        let i = parseInt(key)
        if(!isNaN(i) && component.fieldSet && component.fieldSet.fields && component.fieldSet.fields[i-1]) {
          elems.push(getField(component.fieldSet.fields[i-1]))
          elems.push(<span>{el.substring(el.indexOf('>')+1)}</span>)
        }else {
          elems.push(<span>&lt;{el}</span>)
        }
      }else {
        elems.push(<span>{el}</span>)
      }
    })
    return elems
  }

  return (
    <div className="paragraph-form">
      { mode !== 'pdf' && hasErrors && <Row className="has-errors-fieldset">Faltan campos requeridos</Row>}
      <Row>
        { component.text && getText(component.text) }
      </Row>
    </div>
  )
}

export default Paragraph;
