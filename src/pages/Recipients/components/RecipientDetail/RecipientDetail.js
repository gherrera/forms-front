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
import { getRecipientByIdPromise } from "../../promises";
import { ReportService } from "../../../../services";

const { TextArea } = Input;

const RecipientDetail = ({ recipient, closeHandler }) => {
    const [ recpt, setRecpt ] = useState({})
    const [ comments, setComments ] = useState(null)
    const [ statusChanged, setStatusChanged ] = useState(false)
    const [ isVisibleHistoryStatus, setIsVisibleHistoryStatus ] = useState(false)
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
                    <h3>Recibido el: {moment(recipient.sendDate).format('DD.MM.YYYY HH:mm')}</h3>
                    <Row>
                        <Col className="btns">
                            <Button size="small" type="primary" disabled>Ver todos los formularios</Button>
                        </Col>
                    </Row>
                </Row>
            </Drawer>
        </div>
    )
}

export default RecipientDetail;
