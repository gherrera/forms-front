import "./RecipientDetail.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  Select,
  Drawer,
  Input,
  Table
} from "antd";
import { camelizerHelper } from "../../../../helpers";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getRecipientByIdPromise, addCommentPromise } from "../../promises";
import { ReportService } from "../../../../services";
import { ModalPdfViewer } from "../../../Manage/components";

const { TextArea } = Input;

const RecipientDetail = ({ recipient, closeHandler }) => {
    const [ recpt, setRecpt ] = useState({})
    const [ comments, setComments ] = useState(null)
    const [ pdfId, setPdfId ] = useState(null)
    const [ isVisibleHistoryComment, setIsVisibleHistoryComment ] = useState(false)

    useEffect(() => {
        loadRecipient()
    }, [])

    const loadRecipient = () => {
        getRecipientByIdPromise(recipient.id).then((response) => {
            setRecpt(response)
        })
    }

    const getTypeDest = (type) => {
        if(type === 'PN') return 'Natural'
        else return 'Jurídica'
    }

    const handleAddComment = () => {
        if(comments) {
            addCommentPromise(recipient.id, comments).then((response) => {
                loadRecipient()
                setComments(null)
            })
        }
    }

    const handleChangleComments = (e) => {
        setComments(e.target.value)
    }

    const closeModalComments = () => {
        setIsVisibleHistoryComment(false)
    }

    const handleViewForm = (f) => {
        setPdfId(f.id)
    }
        
    const closeHandlerPDF = () => {
        setPdfId(null)
    }

    const downloadJson = (form) => {
        ReportService.read('/getJsonFormId/'+form.id, null, null, 'form-'+form.folio+'.json')
    }

    const columnsComment = [
        {
            title: 'Comentario',
            dataIndex: 'comment',
            width: '60%'
        },
        {
            title: 'Autor',
            dataIndex: 'autor',
            width: '20%'
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: '20%',
            render: (text, record) => moment(text).format('DD.MM.YYYY HH:mm')
        }
    ]

    const columnsForm = [
        {
            title: 'Formulario',
            dataIndex: 'name',
            width: '50%'
        },
        {
            title: 'Folio',
            dataIndex: 'folio',
            width: '20%'
        },
        {   
            title: 'Fecha',
            dataIndex: 'sendDate',
            width: '20%',
            render: (text, record) => moment(text).format('DD.MM.YYYY HH:mm')
        },
        {   
            title: 'Ver',
            dataIndex: 'id',
            width: '20%',
            render: (text, record) => {
                return <>
                    <Button size="small" icon="file-pdf" onClick={() => handleViewForm(record)}/>
                    <Button size="small" icon="file-text" onClick={() => downloadJson(record)}/>
                </>
            }
        }
    ]

    return (
        <div>
            <Drawer
                className="recipient-detail"
                title="Detalle Destinatario"
                placement="right"
                closable={true}
                visible={true}
                width={1300}
                onClose={closeHandler}
            >
                <Row className="block">
                    <h3>{recipient.name}</h3>
                    <Row>
                        <Col span={6}>Tipo de Documento: <span className="data-value">{recipient.tipDoc?recipient.tipDoc:'-'}</span></Col>
                        <Col span={6}>Nro de Documento: <span className="data-value">{recipient.rut}</span></Col>
                        <Col span={6}>Tipo de Persona: <span className="data-value">{recipient.type?getTypeDest(recipient.type):'-'}</span></Col>
                        <Col span={6}>Correo: <span className="data-value">{recipient.email}</span></Col>
                        <Col span={6}>Empresa: <span className="data-value">{recipient.empresa}</span></Col>
                        <Col span={6}>Gerencia: <span className="data-value">{recipient.gerencia}</span></Col>
                        <Col span={6}>Area: <span className="data-value">{recipient.area}</span></Col>
                    </Row>
                </Row>
                <Row className="block">
                    <h3>Comentarios</h3>
                    <Row>
                        <Col span={1}>
                            <Button icon="plus" type="primary" onClick={handleAddComment} disabled={comments===null}/>
                        </Col>
                        <Col span={23}>
                            <TextArea rows={3} placeholder="Agregar comentarios" value={comments} onChange={handleChangleComments}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23} offset={1}>
                            <Col>Ultimo Comentario</Col>
                            <Col span={18}>
                                <TextArea rows={3} value={recpt.lastComment && recpt.lastComment.comment} readOnly/>
                            </Col>
                            <Col span={5} offset={1}>
                                <Row>Agregado por: <span className="data-value">{recpt.lastComment && recpt.lastComment.autor}</span></Row>
                                <Row>Fecha: <span className="data-value">{recpt.lastComment && moment(recpt.lastComment.date).format('DD.MM.YYYY')}</span></Row>
                                <Row>Ver Histórico: <Button icon="folder-open" size="small" onClick={() => setIsVisibleHistoryComment(true)}/></Row>
                            </Col>
                        </Col>
                    </Row>
                </Row>
                <Row className="block">
                    <h3>Historial</h3>
                    <Row>
                        <Table size="small" dataSource={recpt.forms} columns={columnsForm} pagination={{pageSize: 5}}/>
                    </Row>
                </Row>
            </Drawer>
            { isVisibleHistoryComment &&
                <Modal
                    visible={true}
                    title="Comentarios"
                    header={ null }
                    width={800}
                    footer= { [<Button key="back" onClick={ closeModalComments }>Cerrar</Button>] }
                    onCancel={ closeModalComments }
                >
                    <Table size="small" dataSource={recpt.comments} columns={columnsComment} />
                </Modal>
            }
            { pdfId &&
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
                    <ModalPdfViewer pdfId={pdfId} />
                </Modal>          
            }
        </div>
    )
}

export default RecipientDetail;
