import "./FormDeclaration.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Button,
  Input,
  Modal
} from "antd";
import { Section } from './components'
import moment from "moment";

import { useTranslation } from "react-i18next";

const FormDeclaration = ({ form, mode }) => {
  const { t } = useTranslation()

  return (
    <div className="form-declaration">
      <div className="form-header">
        <Row>
          <h2 className="form-title">{form.name}</h2>
        </Row>
        <Row>
          <Col span={3}>Fecha</Col>
          <Col span={3}>{moment(form.creationDate).format('DD-MM-YYYY')}</Col>
        </Row>
      </div>
      <div className="form-content">
        { form.sections && form.sections.map(section =>
          <Section s={section} mode={mode} />
        )}
      </div>
    </div>
  )
}

export default FormDeclaration;
