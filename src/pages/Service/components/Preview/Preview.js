import "./Preview.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Input,
  Radio,
  Icon
} from "antd";
import { Section } from '../FormDeclaration/components'
import { FormDeclaration } from '../'

import { camelizerHelper } from "../../helpers";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Preview = ({ form, section }) => {
  const { t } = useTranslation()
  const [ mode, setMode ] = useState("preview")

  return (
    <div className="preview-content">
        <div className="preview-mode">
            <Radio.Group value={mode} size="small" buttonStyle="solid" onChange={(e) => setMode(e.target.value)}>
                <Radio.Button value="preview">HTML</Radio.Button>
                <Radio.Button value="pdf">PDF</Radio.Button>
                <Radio.Button value="json">JSON</Radio.Button>
            </Radio.Group>
        </div>
        { mode !== 'json' ?
        <>
            { form && <FormDeclaration form={form} mode={mode} /> }
            { section && <Section s={section} mode={mode} /> }
        </>
        : <h1>No Disponible</h1>
        }
    </div>
  )
}

export default Preview;
