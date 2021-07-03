import "./Paragraph.scss";
import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Input,
  Select,
  DatePicker
} from "antd";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { datasourcesContext } from '../../../../contexts'

const Paragraph = ({ component, mode, handleChangeValues }) => {
  const { t } = useTranslation()
  const [ hasErrors, setHasErrors ] = useState(false)
	const { datasources } = useContext(datasourcesContext)

  useEffect(() => {
    if(component.fieldSet && component.fieldSet.fields) {
      let _fields = {}
      component.fieldSet.fields.map(field => {
        _fields[field.key] = field
      })

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

  const handleReadOnly = (field,readOnly)=>{
    field.readOnly = readOnly
    handleChangeValues(component)
  }

  const getValuesFromDS = (field) => {
    if(field.source && field.source.indexOf(':') > 0) {
      let ds = field.source.split(':')
      if(datasources[ds[0]] && datasources[ds[0]][ds[1]]) {
        let allvalues = datasources[ds[0]][ds[1]].values
        let values = allvalues.filter(v => v.parent === null)
        let withparent = allvalues.filter(v => v.parent !== null)
        withparent.map(fp => {
          let d = fp.parent.split(':')
          let parent = component.fields.find(f => f.source === ds[0]+':'+d[0])
          if(parent && parent.value === d[1]) {
            values.push(fp)
          }
        })
        return values.sort((a, b) => a.value > b.value ? 1 : -1)
      }
    }
    return ["No hay datos"]
  }

  const getField = (field) => {
    if(field.typeField === 'INPUT' || mode === 'pdf') {
      return <Input size="small" className="field-paragraph" 
        disabled={mode === 'pdf'} 
        placeholder={field.title} 
        value={ field.value }
        autoComplete="off"
        onFocus= {(e)=>handleReadOnly(field,false)}
        onBlur= {(e)=>handleReadOnly(field,true)}
        readOnly = {field.readOnly !== false}
        onChange={(e) => handleChangeFieldValue(field, e.target.value)} />
    }else if(field.typeField === 'SELECT') {
      return <Select size="small" className="field-paragraph" 
          disabled={mode === 'pdf'} 
          showSearch
          placeholder={field.title} 
          value={field.value} 
          onFocus= {(e)=>handleReadOnly(field,false)}
          onBlur= {(e)=>handleReadOnly(field,true)}
          readOnly = {field.readOnly !== false}
          onChange={(value) => handleChangeFieldValue(field, value)}>
            { getValuesFromDS(field).map(val =>
              <Select.Option value={val.value}>{val.value}</Select.Option>
            )}
          </Select>
    }else {
      return <DatePicker placeholder={field.title} size="small" className="field-paragraph" 
      format="DD/MM/YYYY"
      value={field.value && moment(field.value,"DD/MM/YYYY")}
      onChange={(momentObj) => handleChangeFieldValue(field, momentObj ? moment(momentObj).format( "DD/MM/YYYY" ) : null ) } />
    }
  }

  const  getText = (text) => {
    let p = []
    let lines = text.split('\n')
    lines.map(line => {
      let elems = []
      if(line === '') {
        elems.push(<span>&nbsp;</span>)
      }else {
        let data = line.split('<')
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
      }
      p.push(<p>{elems}</p>)
    })
    return p
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
