import "./Preview.scss";
import React, { useEffect, useState } from "react";
import {
  Input,
  Radio
} from "antd";
import { Section } from '../FormDeclaration/components'
import { FormDeclaration } from '../'
import { getJsonSectionPromise, getJsonFormPromise } from './promises'

import { camelizerHelper } from "../../helpers";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Preview = ({ form, section }) => {
  const { t } = useTranslation()
  const [ mode, setMode ] = useState("preview")
  const [ json, setJson ] = useState({})

  const handleChangeMode = (value) => {
    setMode(value)
    if(value === 'json') {
      if(form) {
        getJsonFormPromise(form).then(response => {
          setJson(response)
        })
      }else {
        getJsonSectionPromise(section).then(response => {
          setJson(response)
        })
      }
    }
  }

  return (
    <div className={'preview-content preview-content-'+(form ? 'form' : 'section')}>
        <div className="preview-mode">
            <Radio.Group value={mode} size="small" buttonStyle="solid" onChange={(e) => handleChangeMode(e.target.value)}>
                <Radio.Button value="preview">HTML</Radio.Button>
                <Radio.Button value="pdf">PDF</Radio.Button>
                <Radio.Button value="json">JSON</Radio.Button>
            </Radio.Group>
        </div>
        { mode !== 'json' ?
        <>
            { form && <FormDeclaration form={form} mode={mode} /> }
            { section && <Section section={section} mode={mode} /> }
        </>
        : 
        <pre className="preview-pdf">
          <code>
            {JSON.stringify(json, null, 2)}
          </code>
        </pre>
        }
    </div>
  )
}

export default Preview;
