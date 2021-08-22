import "./FormDetail.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  Select,
  Drawer,
  Input
} from "antd";
import { camelizerHelper } from "../../../../helpers";
import { ModalPdfViewer } from "..";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByIdPromise, addCommentPromise, addStatusPromise } from "../../promises";

const { TextArea } = Input;

const FormDetail = ({ form, closeHandler }) => {
    const [frm, setFrm] = useState({})
    const [ showPdf, setShowPdf ] = useState(false)
    const [ comments, setComments ] = useState(null)

    useEffect(() => {
        loadForm()
    }, [])

    const loadForm = () => {
        getFormByIdPromise(form.id).then((response) => {
            setFrm(response)
        })
    }

    const getTypeDest = (type) => {
        if(type === 'PN') return 'Natural'
        else return 'Jurídica'
    }

    const handleViewForm = () => {
        setShowPdf(true)
    }
        
    const closeHandlerPDF = () => {
        setShowPdf(false)
    }

    const handleAddComment = () => {
        if(comments) {
            addCommentPromise(form.id, comments).then((response) => {
                loadForm()
                setComments(null)
            })
        }
    }

    const handleChangleComments = (e) => {
        setComments(e.target.value)
    }

    return (
        <div>
            <Drawer
                className="manage-form-detail"
                title="Detalle de Declaración"
                placement="right"
                closable={true}
                visible={true}
                width={1300}
                onClose={closeHandler}
            >
                <Row className="block">
                    <h3>{form.name}</h3>
                    <Row>
                        <Col span={6}>Categoría: <span className="data-value">{camelizerHelper(form.category)}</span></Col>
                        <Col span={6}>Folio: <span className="data-value">{form.folio}</span></Col>
                    </Row>
                </Row>
                <Row className="block">
                    <h3>{form.dest.name}</h3>
                    <Row>
                        <Col span={6}>Tipo de Documento: <span className="data-value">{form.dest.tipDoc?form.dest.tipDoc:'-'}</span></Col>
                        <Col span={6}>Nro de Documento: <span className="data-value">{form.dest.rut}</span></Col>
                        <Col span={6}>Tipo de Persona: <span className="data-value">{form.dest.type?getTypeDest(form.dest.type):'-'}</span></Col>
                        <Col span={6}>Correo: <span className="data-value">{form.dest.email}</span></Col>
                        <Col span={6}>Empresa: <span className="data-value">{form.dest.empresa}</span></Col>
                        <Col span={6}>Gerencia: <span className="data-value">{form.dest.gerencia}</span></Col>
                        <Col span={6}>Area: <span className="data-value">{form.dest.area}</span></Col>
                    </Row>
                </Row>
                <Row className="block">
                    <h3>Recibido el: {moment(form.sendDate).format('DD.MM.YYYY HH:mm')}</h3>
                    <Row>
                        <Col className="btns">
                            <Button size="small" type="primary" onClick={handleViewForm}>Ver Formulario</Button>
                            <Button size="small" type="primary" disabled>Descargar Información</Button>
                            <Button size="small" type="primary" disabled>Ver todos los formularios</Button>
                        </Col>
                    </Row>
                </Row>
                <Row className="block">
                    <h3>Asignar Estado</h3>
                    <Row>
                        <Col span={2}>Estado</Col>
                        <Col span={3}>
                            <Select size="small" value={form.actualState && form.actualState.status} style={{width:'100%'}}>
                                <Select.Option value="NUEVO">Nuevo</Select.Option>
                                <Select.Option value="PENDIENTE">Pendiente</Select.Option>
                                <Select.Option value="EVALUACION">En Evaluación</Select.Option>
                                <Select.Option value="CERRADO">Cerrado</Select.Option>
                            </Select>
                        </Col>
                        <Col span={6} offset={1}>Fecha: <span className="data-value">{form.actualState ? moment(form.actualState.date).format('DD.MM.YYYY'):null}</span></Col>
                        <Col span={6}>
                            Ver Historico&nbsp;&nbsp;
                            <Button icon="folder-open" size="small" disabled/>
                        </Col>
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
                                <TextArea rows={3} value={frm.lastComment && frm.lastComment.comment} readOnly/>
                            </Col>
                            <Col span={5} offset={1}>
                                <Row>Agregado por: <span className="data-value">{frm.lastComment && frm.lastComment.autor}</span></Row>
                                <Row>Fecha: <span className="data-value">{frm.lastComment && moment(frm.lastComment.date).format('DD.MM.YYYY')}</span></Row>
                                <Row>Ver Histórico: <Button icon="folder-open" size="small" disabled/></Row>
                            </Col>
                        </Col>
                    </Row>
                </Row>
            </Drawer>
            { showPdf &&
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
                    <ModalPdfViewer pdfId={form.id} />
                </Modal>          
            }
        </div>
    )
}

export default FormDetail;
