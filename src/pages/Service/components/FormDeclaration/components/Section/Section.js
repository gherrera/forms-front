import "./Section.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Button,
  Input,
  Modal
} from "antd";
import { Paragraph, FieldSet, Table } from '../'

import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Section = ({ s, mode }) => {
  const { t } = useTranslation()
  const [section, setSection] = useState(s)

  const refreshSection = (s) => {
    setSection(s)
  }

  return (
    <div className="section-content">
        <h4 className="section-title">{section.title}</h4>
        <div className="section-body">
        { section.components && section.components.map((component, index) =>
            <Row className="preview-component">
                { component.type === 'PARAGRAPH' &&
                    <Paragraph component={component} mode={mode} />
                }
                { component.type === 'FIELDSET' &&
                    <FieldSet section={section} component={component} mode={mode} />
                }
                { (component.type === 'TABLE' || component.type === 'DECL') &&
                    <Table section={section} component={component} index={index} mode={mode} refreshSection={refreshSection} />
                }
                { component.type === 'FIELD' &&
                    <TextArea rows={4} />
                }
            </Row>
        )}
        </div>
    </div>
  )
}

export default Section;
