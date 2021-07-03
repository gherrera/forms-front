import "./FieldSet.scss";
import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Input,
  DatePicker,
  Select,
  Form
} from "antd";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { datasourcesContext } from '../../../../contexts'

const FieldSet = ({ section, parent, component, mode, handleChangeValues, getFieldDecorator }) => {
  const { t } = useTranslation()
  const [ hasErrors, setHasErrors ] = useState(false)
	const { datasources } = useContext(datasourcesContext)

  useEffect(() => {
    if(parent.id === section.id) {
      let errores = component.fields.filter(f => f.required && (f.value === null || f.value === ''));
      setHasErrors(errores.length > 0)
    }
  }, [])

  const handleChangeFieldValue = (field, value) => {
    field.value = value
    if(parent.id === section.id) {
      let errores = component.fields.filter(f => f.required && (f.value === null || f.value === ''));
      setHasErrors(errores.length > 0)
    }
    handleChangeValues(component)
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

  return (
    <div className={'fieldset '+section.type}>
      { mode !== 'pdf' && hasErrors && <Row className="has-errors-fieldset">Faltan campos requeridos</Row>}
      { component.title !== null &&
        <Row className="fieldset-title">
          {component.title}
        </Row>
      }
      { component.fields &&
        <Row className="fields-fieldset" gutter={12}>
          { component.fields.map(field =>
            <Col span={24/component.cols}>
              <Form.Item label={field.title}>
                { mode === 'pdf' ?
                  <Input disabled={true} value={field.value}/>
                  :  
                  getFieldDecorator(field.id, {
                    initialValue: field.value !== null && field.value !== '' && field.typeField === 'DATE' ? moment(field.value, 'DD/MM/YYYY') : field.value,
                    validateTrigger: "onChange",
                    rules:
                      [
                        { required: field.required, message: 'Campo requerido' }
                      ]
                  })(
                    field.typeField === 'INPUT' ?
                      <Input
                        autoComplete="off"
                        onFocus= {(e)=>handleReadOnly(field,false)}
                        onBlur= {(e)=>handleReadOnly(field,true)}
                        readOnly = {field.readOnly !== false}
                        onChange={(e) => handleChangeFieldValue(field, e.target.value)}/>
                    : field.typeField === 'SELECT' ?
                      <Select
                        showSearch
                        onFocus= {(e)=>handleReadOnly(field,false)}
                        onBlur= {(e)=>handleReadOnly(field,true)}
                        readOnly = {field.readOnly !== false}
                        onChange={(value) => handleChangeFieldValue(field, value)}>
                          { getValuesFromDS(field).map(val =>
                            <Select.Option value={val.value}>{val.value}</Select.Option>
                          )}
                        </Select>
                    :
                      <DatePicker placeholder="Ingrese la fecha" 
                        format="DD/MM/YYYY"
                        onChange={(momentObj) => handleChangeFieldValue(field, momentObj ? moment(momentObj).format( "DD/MM/YYYY" ) : null ) } />
                  )
                }
              </Form.Item>
            </Col>
            )
          }
        </Row>
      }
    </div>
  )
}

export default FieldSet;
