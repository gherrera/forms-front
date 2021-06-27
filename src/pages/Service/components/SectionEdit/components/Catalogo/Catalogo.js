import "./Catalogo.scss";
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
  Spin,
  Form,
  Tooltip,
  Switch
} from "antd";

import { camelizerHelper } from "../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";

const { TextArea } = Input;

const Catalogo = ({ catalogo, handleChangeCatalogoActive, handlerChangeCatalogo }) => {
  const { t } = useTranslation()

  const handlerChangeCatalogoField = (field, attr, value) => {
    let _f = { ...field }
    _f[attr] = value
    handlerChangeCatalogo(catalogo, _f)
  }

  const changeCatalogoActive = (value) => {
      let cat = { ...catalogo, active: value}
      handleChangeCatalogoActive(cat)
  }

  return (
    <Row className="catalogo">
        <Row className="content" gutter={[6, 6]}>
            <Row>
                <Col className="title" span={22}>{catalogo.title}</Col>
                <Col span={2} className="switch-cat">
                    <Switch checked={catalogo.active} size="small" onChange={changeCatalogoActive}/>
                </Col>
            </Row>
            { catalogo.fields.map((field, index) =>
                <Col span={6} className={ catalogo.active ? "cat show " : "cat hide "}>
                    <Row className="field-cat">
                        <Col span={12}>{field.title}</Col>
                        <Col span={4}>
                            <Tooltip title="Activar"><Checkbox checked={field.active} size="small" disabled={!catalogo.active} onChange={(e) => handlerChangeCatalogoField(field, 'active', e.target.checked)} /></Tooltip>
                        </Col>
                        <Col span={4}>
                            <Tooltip title="Requerido"><Checkbox checked={field.active && field.required} disabled={!catalogo.active || !field.active} size="small" onChange={(e) => handlerChangeCatalogoField(field, 'required', e.target.checked)} /></Tooltip>
                        </Col>
                        <Col span={4}>
                            <Tooltip title="Prellenado"><Checkbox checked={field.active && field.prefilled} disabled={!catalogo.active || !field.active} size="small" onChange={(e) => handlerChangeCatalogoField(field, 'prefilled', e.target.checked)} /></Tooltip>
                        </Col>
                    </Row>
                </Col>
            )}
        </Row>
    </Row>
  )
}

export default Catalogo;
