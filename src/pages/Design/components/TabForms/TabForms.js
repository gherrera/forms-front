import "./TabForms.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Button
} from "antd";
import { FormEdit } from '../'

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByClienteIdPromise } from "./promises";

const TabForms = ({breadcrumbs, refreshBreadCrumbs}) => {
	const { t } = useTranslation()
  const [forms, setForms] = useState([])
  const [form, setForm] = useState(null)
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
      getFormByClienteIdPromise().then(response => {
        setForms(response)
      })
  }, [])

  const handleClickForm = () => {
    setKey(Math.random())
    let b = []
    b.push(breadcrumbs[0])
    b.push(breadcrumbs[1])
    b[1].link = null
    refreshBreadCrumbs({ breadcrumbs: b, title: breadcrumbs[1].title })
  }

  const handleEditForm = async (f) => {
    setForm(f)
    refreshBreadCrumbs({ title: f.name } )
  }

  const _refreshBreadCrumbs = (title, nav) => {
    let b = []
    b.push(breadcrumbs[0])
    b.push(breadcrumbs[1])
    b[1].onClick = handleClickForm
    b[1].link = 'design'
    b.push({ title: nav })
    refreshBreadCrumbs({ breadcrumbs: b, title } )
  }

  const exitSection = () => {
    let b = []
    b.push(breadcrumbs[0])
    b.push(breadcrumbs[1])
    b[1].link = null
    refreshBreadCrumbs({ breadcrumbs: b, title: breadcrumbs[1].title } )
  }

  return (
    <div className="tab-forms">
      { form !== null ? <FormEdit key={key} formId={form.id} refreshBreadCrumbs={_refreshBreadCrumbs} exitSection={exitSection} />
      :
      <>
        <Row className="titles-section">
          <Col span={6}>Categoria</Col>
          <Col span={6}>Formulario</Col>
          <Col span={3}>Creado por</Col>
          <Col span={3}>Fecha de Creación</Col>
          <Col span={3}>Ultima modificacion</Col>
          <Col span={3}>Edición</Col>
        </Row>

        { forms.map((form, index) =>
          <Row className="rows-section">
            <Col span={6}>{form.category}</Col>
            <Col span={6}>{form.name}</Col>
            <Col span={3}>{form.userCreate}</Col>
            <Col span={3}>{moment(form.creationDate).format('DD/MM/YYYY HH:mm')}</Col>
            <Col span={3}>{form.updateDate && moment(form.updateDate).format('DD/MM/YYYY HH:mm')}</Col>
            <Col span={3}><Button icon="edit" size="small" onClick={(e) => handleEditForm(form)}/></Col>
          </Row>
        )}
      </>
      }
    </div>
  )
}
export default TabForms;
