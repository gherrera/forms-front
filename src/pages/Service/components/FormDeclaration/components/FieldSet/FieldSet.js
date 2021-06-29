import "./FieldSet.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select
} from "antd";

import { camelizerHelper } from "../../../../helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";

const FieldSet = ({ section, component, mode, handleChangeValues }) => {
  const { t } = useTranslation()

  const handleChangeFieldValue = (field, value) => {
    field.value = value
    handleChangeValues(component)
  }

  return (
    <div className={'fielset '+section.type}>
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
                    <Input />
                  :
                  field.typeField === 'INPUT' ?
                    <Input
                      value={field.value}
                      onChange={(e) => handleChangeFieldValue(field, e.target.value)}/>
                  : field.typeField === 'SELECT' ?
                    <Select 
                      value={field.value}
                      onChange={(value) => handleChangeFieldValue(field, value)}></Select>
                  :
                    <DatePicker placeholder="Ingrese la fecha" 
                      format="DD/MM/YYYY"
                      value={field.value && moment(field.value, "DD/MM/YYYY")}
                      onChange={(momentObj) => handleChangeFieldValue(field, momentObj ? moment(momentObj).format( "DD/MM/YYYY" ) : null ) } />
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
