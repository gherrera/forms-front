import "./Subsection.scss";
import React, { useEffect, useState } from "react";
import {
  Row,
  Input
} from "antd";
import { Paragraph, FieldSet, Table } from '..'
import { saveSectionValuesPromise } from "../../promises";

import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Subsection = ({ section, subsection, mode, showErrors, handleChangeValues }) => {
  const { t } = useTranslation()

  const handleChangeFieldValue = (component, value) => {
    component.value = value
    handleChangeValues(component)
  }

  return (
    <div className={'subsection-content mode-'+mode}>
        <h4 className="section-title">{subsection.title}</h4>
        <div className="section-body">
        { subsection.components && subsection.components.map((component, index) =>
            <Row className={'section-component section-component-type-'+component.type}>
                { component.type === 'PARAGRAPH' &&
                    <Paragraph component={component} mode={mode} handleChangeValues={handleChangeValues} />
                }
                { component.type === 'FIELDSET' &&
                    <FieldSet section={section} parent={section} component={component} mode={mode} 
                      showErrors={showErrors}
                      handleChangeValues={handleChangeValues} 
                      validateForm={showErrors}
                    />
                }
                { (component.type === 'TABLE' || component.type === 'DECL') &&
                    <Table section={section} component={component} mode={mode} handleChangeValues={handleChangeValues} showErrors={showErrors} />
                }
                { component.type === 'FIELD' &&
                    <TextArea rows={4} value={component.value} disabled={mode==='pdf'} onChange={(e) => handleChangeFieldValue(component, e.target.value)}
                     className={'field-section'+(mode !== 'pdf' && component.required ? ' required':'')+(component.value ? ' withval':' noval')}
                    />
                }
                </Row>
        )}
        </div>
    </div>
  )
}

export default Subsection;
