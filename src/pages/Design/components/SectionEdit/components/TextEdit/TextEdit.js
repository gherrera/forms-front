import "./TextEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Row,
  Input,
  Col,
  Checkbox
} from "antd";

const TextEdit = ({ section, component, handleChangeValuesSection }) => {

    const handleChangeRequried = (value) => {
        component.required = value
        handleChangeValuesSection(section)
      }

    return (
        <Row className="row-component-text">
            <Col span={3}>Texto requerido</Col>
            <Col>
                <Checkbox size="small" checked={component.required} onChange={(e) => handleChangeRequried(e.target.checked)} />
            </Col>
        </Row>
    )
}

export default TextEdit;
