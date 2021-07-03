import "./Table.scss";
import React, { useEffect, useState } from "react";
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

import { useTranslation } from "react-i18next";
import { FieldSet } from '..'

const Table = ({ form, section, component, mode, handleChangeValues }) => {
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
    cols.push({
      title: 'Acción',
      width: '80px',
      render: (text, record, index) => {
        return <Button icon="delete" size="small" onClick={() => removeRecord(index)} />
      }
    })
    setColumns(cols)

    verifyValidations()
  }, [])

  const verifyValidations = () => {
    if(component.type === 'DECL') {
      if(component.decision === null || component.decision === undefined) {
        setError('Debe marcar una decision')
      }else if(component.decision && component.records.length === 0) {
        setError('Debe Agregar al menos 1 registro')
      }else {
        setError(null)
      }
    }
  }

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
    refreshSectionKey('decision', value)

    if(value && component.records && component.records.length === 0) {
      setError('Debe Agregar al menos 1 registro')
    }else {
      setError(null)
    }
  }

  const refreshSectionKey = (key, value) => {
    component[key] = value
    handleChangeValues(component)
  }

  const handleChangeValuesFn = (fieldSet) => {
    refreshSectionKey('fieldSet', fieldSet)
  }

  function hasErrorsFn(fieldsError) {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  }

  const removeRecord = (index) => {
    let t = { ...component }
    let records = t.records
    records.splice(index, 1)
    refreshSectionKey('records', records)
    verifyValidations()
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
      verifyValidations();

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
    handleChangeValuesFn(fieldSet)
  }

  return (
    <div className="table-form">
      { component.type === 'TABLE' &&
      <Row className="header-table">
        <Col span={21}>
            {component.text}
        </Col>
      </Row>
      }
      { component.type === 'DECL' &&
      <Row className="header-table">
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
              handleChangeValues={handleChangeValuesFn} 
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
