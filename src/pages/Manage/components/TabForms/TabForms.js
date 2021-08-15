import "./TabForms.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Spin,
  Input,
  Modal,
  Form,
  Select,
  Tooltip,
} from "antd";
import { camelizerHelper } from "../../../../helpers";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByClienteIdPromise } from "../../promises";
import { FormDetail } from "..";

const TabForms = ({ breadcrumbs, refreshBreadCrumbs }) => {
	const { t } = useTranslation()
  const [forms, setForms] = useState([])
  const [frm, setFrm] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    loadForms()
  }, [])

  const loadForms = () => {
    setIsLoading(true)
    getFormByClienteIdPromise().then(response => {
      setForms(response)
      setIsLoading(false)
    })
  }

  const handleViewForm = (f) => {
    setFrm(f)
  }


  const closeHandler = () => {
    setFrm(null)
  }
  return (
    <div className="tab-forms">
      { isLoading ? <Spin/>
      :
        <>
          <Row className="titles-section">
            <Col span={1}>Nro</Col>
            <Col span={2}>Categoria</Col>
            <Col span={7}>Nombre</Col>
            <Col span={3}>Creado por</Col>
            <Col span={3}>Enviado a</Col>
            <Col span={3}>Fecha de Envío</Col>
            <Col span={3}>Fecha Recibido</Col>
            <Col span={2}></Col>
          </Row>

          { forms.map((f, index) =>
            <Row className="rows-section">
              <Col span={1}>{f.nro}</Col>
              <Col span={2}>{camelizerHelper(f.category)}</Col>
              <Col span={7}>{f.name}</Col>
              <Col span={3}>{f.userCreate}</Col>
              <Col span={3}>{f.userUpdate}</Col>
              <Col span={3}>{moment(f.creationDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={3}>{f.sendDate && moment(f.sendDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={2} className="tools-rows-forms">
                <Tooltip title="Detalles">
                  <Button icon="info" size="small" onClick={(e) => handleViewForm(f)}/>
                </Tooltip>
              </Col>
            </Row>
          )}
          { frm !== null && <FormDetail form={frm} closeHandler={closeHandler} /> }
        </>
      }
    </div>
  )
}
export default TabForms;
