import "./FieldSet.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Input,
  DatePicker,
  Select,
  Form
} from "antd";

import { camelizerHelper } from "../../../../helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";

const FieldSet = ({ section, parent, component, mode, handleChangeValues, getFieldDecorator }) => {
  const { t } = useTranslation()
  const [ hasErrors, setHasErrors ] = useState(false)

  useEffect(() => {
    if(parent.id === section.id) {
      let errores = component.fields.filter(f => f.required && (f.value === null || f.value === ''));
      setHasErrors(errores.length > 0)
    }
  }, [])

  const handleChangeFieldValue = (field, value) => {
    debugger
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
                    initialValue: field.value,
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
                        onChange={(value) => handleChangeFieldValue(field, value)}>
                          <Select.Option value={1}>Test</Select.Option>
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
