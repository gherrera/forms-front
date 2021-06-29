import "./Paragraph.scss";
import React, { useEffect, useState } from "react";
import {
  Row,
  Input
} from "antd";

import { camelizerHelper } from "../../../../helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";

const Paragraph = ({ component, mode }) => {
  const { t } = useTranslation()
  const [fields, setFields] = useState({})

  useEffect(() => {
    if(component.fieldSet && component.fieldSet.fields) {
      let _fields = {}
      component.fieldSet.fields.map(field => {
        _fields[field.key] = field
      })
      setFields(_fields)
    }
  }, [])

  const getField = (field) => {
    if(field.typeField === 'INPUT') {
      return <Input size="small" className="field-paragraph"/>
    }
  }

  const  getText = (text) => {
    let elems = []
    let data = text.split('<')
    data.map(el => {
      if(el.indexOf('>') > 0) {
        let key = el.substring(0, el.indexOf('>'))
        if(fields[key]) {
          elems.push(getField(fields[key]))
          elems.push(<span>{el.substring(el.indexOf('>')+1)}</span>)
        }else {
          elems.push(<span>&lt;{el}</span>)
        }
      }else {
        elems.push(<span>{el}</span>)
      }
    })
    return elems
  }

  return (
    <div className="paragraph-form">
      <Row>
        { component.text && getText(component.text) }
      </Row>
    </div>
  )
}

export default Paragraph;
