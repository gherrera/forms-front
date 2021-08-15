import "./TabForms.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Spin,
  Modal,
  Tooltip,
} from "antd";
import { camelizerHelper } from "../../../../helpers";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByClienteIdPromise } from "../../promises";
import { FormDetail, ModalPdfViewer } from "..";

const TabForms = () => {
	const { t } = useTranslation()
  const [forms, setForms] = useState([])
  const [frm, setFrm] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pdfItem, setPdfItem ] = useState(null)

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
    //setFrm(f)
  }

  const handleViewPDF = (f) => {
    setPdfItem(f)
  }

  const closeHandler = () => {
    setFrm(null)
  }

  const closeHandlerPDF = () => {
    setPdfItem(null)
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
            <Col span={3}>Doc. de Identidad</Col>
            <Col span={3}>Destinatario</Col>
            <Col span={3}>Fecha de Envío</Col>
            <Col span={3}>Fecha Recibido</Col>
            <Col span={2}></Col>
          </Row>

          { forms.map((f, index) =>
            <Row className="rows-section">
              <Col span={1}>{f.nro}</Col>
              <Col span={2}>{camelizerHelper(f.category)}</Col>
              <Col span={7}>{f.name}</Col>
              <Col span={3}>{f.dest.rut}</Col>
              <Col span={3}>{f.userUpdate}</Col>
              <Col span={3}>{f.request.type === 'AUTO' ? 'URL' : moment(f.creationDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={3}>{f.sendDate && moment(f.sendDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={2} className="tools-rows-forms">
                <Tooltip title="Detalles">
                  <Button icon="info" size="small" onClick={(e) => handleViewForm(f)}/>
                </Tooltip>
                <Tooltip title="PDF">
                  <Button icon="file-pdf" size="small" onClick={(e) => handleViewPDF(f)}/>
                </Tooltip>
              </Col>
            </Row>
          )}
          { frm !== null && <FormDetail form={frm} closeHandler={closeHandler} /> }

          { pdfItem &&
            <Modal
              className="modal-pdf-viewer"
              visible={true}
              title="Declaración"
              centered = { true }
              width = {1200}
              style={{ top: 10 }}
              header={ null }
              footer= { [<Button key="back" onClick={ closeHandlerPDF }>Cerrar</Button>] }
              onCancel={ closeHandlerPDF }
            >
              <ModalPdfViewer pdfId={pdfItem.id} />
            </Modal>          
          }
        </>
      }
    </div>
  )
}
export default TabForms;
