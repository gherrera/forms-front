import "./TabForms.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Spin,
  Modal,
  Tooltip,
  Pagination
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
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ totalRecords, setTotalRecords ] = useState(-1)
  const recordsxPage = 10

  useEffect(() => {
    loadForms(1)
  }, [])

  const loadForms = (page) => {
    setIsLoading(true)
    let from = (page-1) * recordsxPage
    getFormByClienteIdPromise(from, recordsxPage).then(response => {
      setForms(response.records)
      setTotalRecords(response.total)
      setIsLoading(false)
    })
  }

  const handleViewForm = (f) => {
    setFrm(f)
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

  const handleChangePage = (page) => {
    setCurrentPage(page)
    loadForms(page)
  }

  return (
    <div className="tab-forms">
      { isLoading ? <Spin/>
      :
        <>
          <Row className="titles-section" gutter={4}>
            <Col span={1}>Nro</Col>
            <Col span={2}>Categoria</Col>
            <Col span={7}>Nombre</Col>
            <Col span={3}>Doc. de Identidad</Col>
            <Col span={3}>Destinatario</Col>
            <Col span={4}>Email</Col>
            <Col span={3}>Fecha Recibido</Col>
            <Col span={1}></Col>
          </Row>

          { forms.map((f, index) =>
            <Row className="rows-section" gutter={4}>
              <Col span={1}>{f.nro}</Col>
              <Col span={2}>{camelizerHelper(f.category)}</Col>
              <Col span={7}>{f.name}</Col>
              <Col span={3}>{f.dest.rut}</Col>
              <Col span={3}>{f.dest.name}</Col>
              <Col span={4}>{f.dest.email}</Col>
              <Col span={3}>{f.sendDate && moment(f.sendDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={1} className="tools-rows-forms">
                <Tooltip title="Detalles">
                  <Button icon="info" size="small" onClick={(e) => handleViewForm(f)}/>
                </Tooltip>
                <Tooltip title="PDF">
                  <Button icon="file-pdf" size="small" onClick={(e) => handleViewPDF(f)}/>
                </Tooltip>
              </Col>
            </Row>
          )}
          { totalRecords > forms.length &&
            <Pagination current={currentPage} total={totalRecords} pageSize={recordsxPage} onChange={handleChangePage} size="small"/>
          }

          { frm !== null && <FormDetail form={frm} closeHandler={closeHandler} /> }
          { pdfItem &&
            <Modal
              className="modal-pdf-viewer"
              visible={true}
              title="Declaración"
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
