import "./TabForms.scss";
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
  notification
} from "antd";
import { FormEdit } from '../'

import { camelizerHelper } from "../../../../helpers/";
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
    debugger
    setKey(Math.random())
    let b = []
    b.push(breadcrumbs[0])
    b.push(breadcrumbs[1])
    refreshBreadCrumbs({ breadcrumbs: b, title: breadcrumbs[1].title })
  }

  const handleEditForm = (f) => {
    setForm(f)
    refreshBreadCrumbs({ title: f.name, onClick: handleClickForm, link: 'design' } )
  }

  const _refreshBreadCrumbs = (nav, title) => {
    refreshBreadCrumbs({ nav, title } )
  }

  return (
    <div className="tab-forms">
      { form !== null ? <FormEdit key={key} formId={form.id} refreshBreadCrumbs={_refreshBreadCrumbs} />
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
