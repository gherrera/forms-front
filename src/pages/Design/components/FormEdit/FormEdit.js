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
import { deleteLogoPromise, changePositionLogoPromise } from "./promises";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from "moment";

const { Dragger } = Upload;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  cursor: 'move',
  border: isDragging ? '1px solid rgba(0,0,255,.2)':'none',

  // styles we need to apply on draggables
  ...draggableStyle
});

const FormEdit = ({ form, refreshSection, setForm }) => {
    const [ frm, setFrm ] = useState(form)
    useEffect(() => {
    }, [])

    const getPropsUpload = (position) => {
        return {
            accept: '.png,.jpg,.jpeg',
            name: 'file',
            multiple: false,
            action: apiConfig.url + '/uploadLogoForm/'+form.id+'/'+position,
            onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} archivo cargado exitosamente.`);
                setFrm(info.file.response)
            } else if (status === 'error') {
                message.error(`${info.file.name} no ha sido cargado.`);
                info.fileList = []
            }
            }
        }
    };

    const removeLogo = () => {
        deleteLogoPromise(form.id).then((f) => {
            setFrm(f)
            setForm(f)
        })
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }else if(result.destination.droppableId !== result.draggableId){
            let f = {...frm, logo: {position: result.destination.droppableId}}
            setFrm(f)
            changePositionLogoPromise(form.id, result.destination.droppableId).then((f) => {
                setFrm(f)
                setForm(f)
            })
        }
    }

    const getDraggable = (form) => {
            return(<Draggable key={form.id} draggableId={form.logo.position} >
                {(provided, snapshot) =>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                        )}
                    >
                        <img src={apiConfig.url +'/getLogoForm?formId='+form.id}/>
                        <Tooltip title="Quitar Logo">
                            <a className="remove-logo" onClick={removeLogo}>
                                <Icon size="small" type="close-circle"/>
                            </a>
                        </Tooltip>
                    </div>
                }
            </Draggable>)
    }

    const getDroppableLogo = (form, position) => {
        return (
            <Col span={4} offset={position!=='LEFT'?6:0} className={position+(form.logo && form.logo.position === position?' selected':'')}>
                <Droppable key={position} droppableId={position}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            { form.logo && form.logo.position === position ?
                                getDraggable(frm)
                            : form.logo ?
                                <span className="logo">Logo</span>
                            :
                                <Dragger {...getPropsUpload(position)}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="file-image" size="small"/>
                                    </p>
                                </Dragger>
                            }
                        </div>
                    )}
                </Droppable>
            </Col>
        )
    }

    return (
        <div className="form-edit">
            <div className="form-header">
                <Row className="header-logo">
                    <Row className="row-logo">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {getDroppableLogo(frm,'LEFT')}
                            {getDroppableLogo(frm,'CENTER')}
                            {getDroppableLogo(frm,'RIGHT')}
                        </DragDropContext>
                    </Row>
                </Row>
            </div>
            <div className="form-content">
                {frm && frm.sections && frm.sections.map((section, index) => <SectionEdit s={section} refreshThisSection={refreshSection} sectionNro={index+1} />)}
            </div>
        </div>
    )
}
export default FormEdit;
