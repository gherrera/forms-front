import "./Table.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Radio,
  Select,
  Menu,
  Dropdown,
  Icon,
  Checkbox,
  DatePicker,
  Button,
  Input,
  Form
} from "antd";

import { camelizerHelper } from "../../../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { FieldSet } from '../'

const { TextArea } = Input;

const Table = ({ section, component, index, fieldset, refreshSection }) => {
	const { t } = useTranslation()

  useEffect(() => {
  }, [])

  const handleChangeText = (value) => {
    let _s = { ...section }
    let comp = []
    _s.components.map((c, i) => {
      if(i === index) {
        comp.push({ ...c, text: value })
      }else {
        comp.push(c)
      }
    })
    _s.components = comp
    refreshSection(_s)
  }

  return (
    <div className="comp-table">
    { component.type === 'DECL' &&
    <Row>
      <Col span={21}>
        <Form.Item label="Texto pregunta declaracion">
          <TextArea value={component.text} onChange={(e) => handleChangeText(e.target.value)}/>
        </Form.Item>
      </Col>
      <Col span={2} offset={1}>
        <Form.Item label="Decisión">
          <Radio.Group disabled>
            <Radio className="radio-switch" value={true}>
              Sí
            </Radio>
            <Radio className="radio-switch" value={false}>
              No
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
    }
    { fieldset && <FieldSet section={section} fieldset={fieldset} refreshSection={refreshSection} /> }
    </div>
  )
}
export default Table;
