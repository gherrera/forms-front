import "./ParagraphEdit.scss";
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
  Form
} from "antd";

import { camelizerHelper } from "../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { FieldSetEdit } from '../'

const { TextArea } = Input;

const ParagraphEdit = ({ section, component, index, fieldset, refreshSection }) => {
  const { t } = useTranslation()

  useEffect(() => {
  }, [])

  const handleChangeText = (value) => {
    let comp = []
    section.components.map((component, i) => {
      if(i === index) {
        comp.push({ ...component, text: value })
      }else {
        comp.push(component)
      }
    })
    let _s = { ...section, components: comp }
    refreshSection(_s)
  }

  return (
    <div className="paragraph-edit">
        <TextArea rows={4} value={component.text} placeholder="Ingrese aqui el texto de parrafo" onChange={(e) => handleChangeText(e.target.value)}/>
        <h3>Agregar atributos opcionales (Deben ser incluidos con el atributo "clave" entre &lt;&gt;  )</h3>
        { fieldset && <FieldSetEdit hasHeader={false} section={section} fieldset={fieldset} refreshSection={refreshSection} /> }
    </div>
  )
}

export default ParagraphEdit;