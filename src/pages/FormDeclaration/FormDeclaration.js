import "./FormDeclaration.scss";
import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Button,
  notification
} from "antd";
import { Section } from './components'
import moment from "moment";

import { useTranslation } from "react-i18next";
import { datasourcesContext } from '../../contexts'
import apiConfig from '../../config/api'

const FormDeclaration = ({ form, mode }) => {
  const { t } = useTranslation()
  const [decl, setDecl] = useState(form)
  const [ showErrors, setShowErrors ] = useState(false)
  const { loadFormDatasource } = useContext(datasourcesContext)

  useEffect(() => {
    loadFormDatasource(form.formParentId ? form.formParentId : form.id)
	}, [])

  const refreshForm = (f) => {
    setDecl(f)
  }

  const sendForm = () => {
    setShowErrors(false)
    let hasErrorsForm = false
    decl.sections.map(section => {
      let hasErrorsSection = false
      let descriptions = []
      section.components && section.components.map(component => {
        if(component.type === 'FIELDSET') {
          let errores = component.fields.filter(f => ((f.required && (f.value === null || f.value === '')) || f.errors) );
          if(errores.length > 0) {
            let title = component.title !== null && component.title !== '' ? component.title : section.title
            descriptions.push(<p>Faltan datos en la seccion {title}</p>)
            hasErrorsSection = true
          }
        }else if(component.type === 'DECL') {
          if(component.decision === null || component.decision === undefined) {
            hasErrorsSection = true
            descriptions.push(<p>Debe marcar una decisión en la seccion {section.title}</p>)
          }else if(component.decision && component.records.length === 0) {
            hasErrorsSection = true
            descriptions.push(<p>Debe agregar al menos 1 registro en la seccion {section.title}</p>)
          }
        }else if(component.type === 'PARAGRAPH') {
          let errores = component.fieldSet && component.fieldSet.fields && component.fieldSet.fields.filter(f => f.required && (f.value === null || f.value === ''));
          if(errores && errores.length > 0) {
            let title = component.title !== null && component.title !== '' ? component.title : section.title
            descriptions.push(<p>Faltan datos en la seccion {title}</p>)
            hasErrorsSection = true
          }
        }else if(component.type === 'FIELD') {
          if(component.required && (component.value === null || component.value === '')) {
            hasErrorsSection = true
          }
        }
      })
      if(hasErrorsSection) {
        hasErrorsForm = true
        /*
        notification.error({
          className: 'notif-error-required-fields',
          message: 'Faltan campos requeridos',
          description: descriptions
        })
        */
      }
    })
    if(hasErrorsForm) {
      setShowErrors(true)
      notification.error({
        className: 'notif-error-required-fields',
        message: 'Hay errores en el formulario',
        description: 'Faltan campos requeridos'
      })
    }else {
      notification.success({
        message: 'OK'
      })
    }
  }

  return (
    <div className="form-declaration">
      <div className="form-header">
        { form.logo !== null &&
        <Row className="row-logo">
          <Col span={4} className="LEFT">
              { form.logo.position === 'LEFT' &&
                  <img src={apiConfig.url +'/getLogoForm?formId='+(form.formParentId === null ?form.id : form.formParentId)}/>
              }
          </Col>
          <Col span={4} offset={6} className="CENTER">
              { form.logo.position === 'CENTER' &&
                  <img src={apiConfig.url +'/getLogoForm?formId='+(form.formParentId === null ?form.id : form.formParentId)}/>
              }
          </Col>
          <Col span={4} offset={6} className="RIGHT">
              { form.logo.position === 'RIGHT' &&
                  <img src={apiConfig.url +'/getLogoForm?formId='+(form.formParentId === null ?form.id : form.formParentId)}/>
              }
          </Col>
        </Row>
        }
        <Row>
          <h2 className="form-title">{form.name}</h2>
        </Row>
        <Row>
          <Col span={12}>Fecha:&nbsp;&nbsp;<span className="inputHeader">{moment(form.creationDate).format('DD-MM-YYYY')}</span></Col>
          <Col span={12} style={{textAlign:'right', paddingRight:'20px'}}>
            Folio:&nbsp;&nbsp;<span className="inputHeader">{form.folio?form.folio:<>&nbsp;&nbsp;&nbsp;&nbsp;</>}</span>
          </Col>
        </Row>
      </div>
      <div className="form-content">
        { decl.sections && decl.sections.map(section =>
          <Section decl={decl} section={section} mode={mode} refreshForm={refreshForm} showErrors={showErrors} />
        )}
      </div>
      { mode !== 'pdf' &&
        <Row className="form-actions">
            <Col offset={20} span={4}>
              <Button onClick={sendForm} disabled={mode !== 'html'} type="primary" size="large" style={{width:'150px'}}>Enviar</Button>
            </Col>
        </Row>
      }
    </div>
  )
}

export default FormDeclaration;
