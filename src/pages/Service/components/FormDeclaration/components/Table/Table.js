import "./Table.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Radio,
  Table as TableAntd,
  Descriptions,
  Button,
  Form,
  notification
} from "antd";

import { camelizerHelper } from "../../../../helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { FieldSet } from '..'

const Table = ({ form, section, component, mode, refreshSection }) => {
  const { t } = useTranslation()
  const { getFieldDecorator, validateFields, setFields, getFieldsError, setFieldsValue } = form;
  const [columns, setColumns] = useState([])
  const [fieldsPdf, setFieldsPdf] = useState({})
  const [ error, setError ] = useState(null)

  useEffect(() => {
    let cols = []
    if(component.fieldSet && component.fieldSet.fields) {
      let fields = {}
      component.fieldSet.fields.map(field => {
        fields[field.key] = field
        if(field.tableVisible === true) {
          cols.push({
            title: field.title,
            dataIndex: field.key,
            render: (text, record, index) => {
              return record.fields[field.key]
            }
          })
        }
      })
      setFieldsPdf(fields)
    }
    setColumns(cols)

    if(component.type === 'DECL') {
      if(component.decision === null || component.decision === undefined) {
        setError('Debe marcar una decision')
      }else if(component.decision && component.records.length === 0) {
        setError('Debe Agregar al menos 1 registro')
      }
    }
  }, [])

  const toDescriptionsPdf = (records) => (
    <>
      {records.map((record, index) => (
        <>
          <div className="descriptions-pdf">
            <h4 className="descriptions-numeral">#{index + 1}</h4>
            <Descriptions title="" column={1} bordered size="small">
              {Object.keys(fieldsPdf).map((key) => {
                return (
                  <Descriptions.Item label={fieldsPdf[key].title}>
                    {record.fields[key]}
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </div>
          <br />
        </>
      ))}
    </>
  );

  const handleChangeDecision = (value) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(c.id === component.id) {
        comp.push({ ...c, decision: value })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)

    if(value && component.records.length === 0) {
      setError('Debe Agregar al menos 1 registro')
    }else {
      setError(null)
    }
  }

  const refreshSectionKey = (key, value) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(c.id === component.id) {
        comp.push({ ...c, [key]: value })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s, key !== 'fieldSet')
  }

  const handleChangeValues = (fieldSet) => {
    refreshSectionKey('fieldSet', fieldSet)
  }

  function hasErrorsFn(fieldsError) {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  }

  const addRecord = () => {
    let ids = component.fieldSet.fields.map(f => f.id);
    validateFields(ids).then((error, values) => {
      let t = { ...component }
      let records = t.records ? t.records : []
      let fields = {}
      component.fieldSet.fields.map(f => {
        fields[f.key] = f.value
      })
      records.push({fields})

      refreshSectionKey('records', records)
      
      if(component.type === 'DECL') {
        if(component.decision === null || component.decision === undefined) {
          setError('Debe marcar una decision')
        }else if(component.decision && component.records.length === 0) {
          setError('Debe Agregar al menos 1 registro')
        }else {
          setError(null)
        }
      }
      cleanFields()
      
    })
    if(hasErrorsFn(getFieldsError())) {
      notification.error({
        message: 'Debe ingresar los campos requeridos'
      })
    }

  }

  const cleanFields = () => {
    let fieldSet = { ...component.fieldSet }
    fieldSet.fields && fieldSet.fields.map(field => {
      field.value = null
      setFieldsValue({[field.id]: null})
    })
    handleChangeValues(fieldSet)
  }

  return (
    <div className="table-form">
      { component.type === 'TABLE' &&
      <Row>
        <Col span={21}>
            {component.text}
        </Col>
      </Row>
      }
      { component.type === 'DECL' &&
      <Row>
        { mode !== 'pdf' && error !== null && <Row className="has-errors-fieldset">{error}</Row>}
        <Col span={21}>
            {component.text}
        </Col>
        <Col span={2} offset={1}>
            <Radio.Group value={component.decision} disabled={mode === 'pdf'} onChange={(e) => handleChangeDecision(e.target.value)}>
              <Radio className="radio-switch" value={true}>
                Sí
              </Radio>
              <Radio className="radio-switch" value={false}>
                No
              </Radio>
            </Radio.Group>
        </Col>
      </Row>
      }
      { component.fieldSet && (component.type === 'TABLE' || component.decision === true) &&
      <>
        { mode !== 'pdf' &&
          <>
            <FieldSet section={section} 
              parent={component}
              component={component.fieldSet} 
              mode={mode} 
              handleChangeValues={handleChangeValues} 
              getFieldDecorator={getFieldDecorator}
            />
            <Row className="btns-table">
              <Button onClick={addRecord}>Añadir</Button>
              <Button onClick={cleanFields}>Limpiar</Button>
            </Row>
          </>
        }
        {(mode !== 'pdf' || columns.length <= component.fieldSet.fields.length) ? 
          <TableAntd columns={columns} size="small" dataSource={component.records} className="table-rows"/>
          :
          toDescriptionsPdf(component.records)
        }
      </>
      }
    </div>
  )
}

export default Form.create()(Table);
