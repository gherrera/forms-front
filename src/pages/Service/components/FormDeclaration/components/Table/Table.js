import "./Table.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Radio,
  Table as TableAntd,
  Descriptions,
  Button
} from "antd";

import { camelizerHelper } from "../../../../helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { FieldSet } from '..'

const Table = ({ section, component, index, mode, refreshSection }) => {
  const { t } = useTranslation()
  const [columns, setColumns] = useState([])
  const [fieldsPdf, setFieldsPdf] = useState({})

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
      if(i === index) {
        comp.push({ ...c, decision: value })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)
  }

  const handleChangeValues = (fieldSet) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(i === index) {
        comp.push({ ...c, fieldSet: fieldSet })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)
  }

  const cleanFields = () => {
    let fieldSet = { ...component.fieldSet }
    fieldSet.fields && fieldSet.fields.map(field => {
      field.value = null
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
            <FieldSet section={section} component={component.fieldSet} mode={mode} handleChangeValues={handleChangeValues}/>
            <Row className="btns-table">
              <Button>Añadir</Button>
              <Button onClick={cleanFields}>Limpiar</Button>
            </Row>
          </>
        }
        {(mode !== 'pdf' || columns.length < 5) ? 
          <TableAntd columns={columns} size="small" dataSource={component.records} className="table-rows"/>
          :
          toDescriptionsPdf(component.records)
        }
      </>
      }
    </div>
  )
}

export default Table;
