import "./ParagraphEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Input
} from "antd";

import { useTranslation } from "react-i18next";
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
        <TextArea rows={5} value={component.text} placeholder="Ingrese aqui el texto de parrafo" onChange={(e) => handleChangeText(e.target.value)}/>
        { fieldset && 
          <>
            <h3>Agregar datos opcionales (Deben ser incluidos con el número del campo entre &lt;&gt;, Ej. &lt;1&gt; )</h3>
            <FieldSetEdit hasHeader={false} section={section} component={component} fieldset={fieldset} refreshSection={refreshSection} /> }
          </>
        }
    </div>
  )
}

export default ParagraphEdit;