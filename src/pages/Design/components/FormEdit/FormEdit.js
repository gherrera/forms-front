import "./FormEdit.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Upload,
  Icon,
  message,
  Tooltip
} from "antd";
import apiConfig from '../../../../config/api'
import { SectionEdit } from '../'
import { deleteLogoPromise } from "./promises";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from "moment";

import { saveFormPromise } from "../FormDetail/promises";

const { Dragger } = Upload;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  cursor: 'auto',

  // styles we need to apply on draggables
  ...draggableStyle
});

const FormEdit = ({ form, refreshSection }) => {
    const [ frm, setFrm ] = useState(form)
    useEffect(() => {
    }, [])

    const props = {
        accept: '.png,.jpg,.jpeg',
        name: 'file',
        multiple: false,
        action: apiConfig.url + '/uploadLogoForm/'+form.id+'/LEFT',
        onChange(info) {
          const { status } = info.file;
          if (status === 'done') {
            message.success(`${info.file.name} archivo cargado exitosamente.`);
            setFrm(info.file.response)
          } else if (status === 'error') {
            message.error(`${info.file.name} no ha sido cargado.`);
            info.fileList = []
          }
        },
    };

    const removeLogo = () => {
        deleteLogoPromise(form.id).then((f) => {
            setFrm(f)
        })
    }

    return (
        <div className="form-edit">
            <div className="form-header">
                <Row className="header-logo">
                    { frm.logo === null ?
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="file-image" size="small"/>
                            </p>
                            <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar el Logo</p>
                        </Dragger>
                        :
                        <Row className="row-logo">
                            <Col span={4} className="LEFT">
                                { frm.logo.position === 'LEFT' &&
                                    <>
                                        <img src={apiConfig.url +'/getLogoForm?formId='+form.id}/>
                                        <Tooltip title="Quitar Logo">
                                            <a className="remove-logo" onClick={removeLogo}>
                                                <Icon size="small" type="close-circle"/>
                                            </a>
                                        </Tooltip>
                                    </>
                                }
                            </Col>
                            <Col span={4} offset={6} className="CENTER">
                                { frm.logo.position === 'CENTER' &&
                                    <>
                                        <img src={apiConfig.url +'/getLogoForm?formId='+form.id}/>
                                        <Tooltip title="Quitar Logo">
                                            <a className="remove-logo" onClick={removeLogo}>
                                                <Icon size="small" type="close-circle"/>
                                            </a>
                                        </Tooltip>
                                    </>
                                }
                            </Col>
                            <Col span={4} offset={6} className="RIGHT">
                                { frm.logo.position === 'RIGHT' &&
                                    <>
                                        <img src={apiConfig.url +'/getLogoForm?formId='+form.id}/>
                                        <Tooltip title="Quitar Logo">
                                            <a className="remove-logo" onClick={removeLogo}>
                                                <Icon size="small" type="close-circle"/>
                                            </a>
                                        </Tooltip>
                                    </>
                                }
                            </Col>
                        </Row>
                    }
                </Row>
                <Row>
                    <h2 className="form-title">{frm.name}</h2>
                </Row>
                <Row>
                <Col span={12}>Fecha:&nbsp;&nbsp;<span className="inputHeader">{moment(frm.creationDate).format('DD-MM-YYYY')}</span></Col>
                <Col span={12} style={{textAlign:'right', paddingRight:'20px'}}>
                    Folio:&nbsp;&nbsp;<span className="inputHeader">{frm.folio?frm.folio:'###'}</span>
                </Col>
                </Row>
            </div>
            <div className="form-content">
                {frm && frm.sections && frm.sections.map((section, index) => <SectionEdit s={section} refreshThisSection={refreshSection} sectionNro={index+1} />)}
            </div>
        </div>
    )
}
export default FormEdit;
