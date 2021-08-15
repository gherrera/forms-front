import "./Text.scss";
import React, { useEffect, useState, useContext } from "react";
import {
  Input,
  Row
} from "antd";

import { useTranslation } from "react-i18next";
const { TextArea } = Input;

const Text = ({ component, mode, handleChangeValues }) => {

    const handleChangeFieldValue = (component, value) => {
        component.value = value
        handleChangeValues && handleChangeValues(component)
      }

    return (
        <Row className="text-form">
            { component.hasTitle &&
                <Row className="text-title">
                    {component.title}
                </Row>
            }
            <TextArea rows={4} value={component.value} disabled={mode==='pdf'} 
                onChange={(e) => handleChangeFieldValue(component, e.target.value)}
                style={{ width: "100%" }}
                className={'field-section'+(mode !== 'pdf' && component.required ? ' required':'')+(component.value ? ' withval':' noval')}
            />
        </Row>
    )
}
    
export default Text;    
