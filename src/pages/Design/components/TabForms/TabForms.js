import "./TabForms.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Spin,
  Input,
  Checkbox,
  Modal,
  Form,
  Select,
  Tooltip,
  notification,
  Popconfirm
} from "antd";
import { FormDetail } from '../'
import { camelizerHelper } from "../../../../helpers";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByClienteIdPromise, updateFormPromise } from "./promises";
import { generateFormPromise } from "../FormDetail/promises";

const TabForms = ({ form, breadcrumbs, refreshBreadCrumbs }) => {
	const { t } = useTranslation()
  const { getFieldDecorator, validateFields, getFieldsError, setFieldsValue } = form;
  const [forms, setForms] = useState([])
  const [frm, setFrm] = useState(null)
  const [key, setKey] = useState(Math.random())
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isVisibleNewForm, setIsVisibleNewForm ] = useState(false)

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

  const handleClickForm = () => {
    setKey(Math.random())
    let b = []
    b.push(breadcrumbs[0])
    if(breadcrumbs.length === 2) {
      b.push(breadcrumbs[1])
      b[1].link = null
    }
    refreshBreadCrumbs({ breadcrumbs: b, title: form.name })
  }

  const handleEditForm = async (f) => {
    setFrm(f)
    let b = []
    b.push(breadcrumbs[0])
    refreshBreadCrumbs({ breadcrumbs: b, title: f.name } )
    //refreshBreadCrumbs({ title: f.name } )
  }

  const _refreshBreadCrumbs = (title, nav) => {
    let b = []
    b.push(breadcrumbs[0])
    if(breadcrumbs.length === 2) {
      b.push(breadcrumbs[1])
    }else {
      b.push({title: frm.name})
    }
    b[1].onClick = handleClickForm
    b[1].link = 'design'      
  if(nav) b.push({ title: nav })
    refreshBreadCrumbs({ breadcrumbs: b, title } )
  }

  const handleChangeAttrForm = (index, key, value) => {
    let fs = forms.map((f, i) => {
      if (index == i) {
        return { ...f, [key]: value };
      } else {
        return f;
      }
    })
    let f = fs[index]
    updateFormPromise(f)
    setForms(fs)
  }

  const changeNameForm = (index, value) => {
    handleChangeAttrForm(index, 'name', value)
  }

  const changeActiveForm = (index, checked) => {
    handleChangeAttrForm(index, 'status', checked ? 'ACTIVE' : 'INACTIVE')
  }

  const handleOpenNewForm = () => {
    setIsVisibleNewForm(true)
  }

  const closeModalHandler = (create) => {
    if(create) {
      validateFields(['category','name']).then((obj) => {
        debugger
        updateFormPromise({ ...obj, status: 'ACTIVE' }).then(r => {
          loadForms()
        })
        setIsVisibleNewForm(false)
      })
    }
  }

  const handleDeleteForm = (f) => {
    updateFormPromise({ ...f, deleted: true }).then(r => {
      loadForms()
      notification.success({
        message: 'Formulario borrado'
      })
    })
  }

  const handleGenerateForm = async (f) => {
    let fId = await generateFormPromise(f.id)
    window.open("forms/"+fId)
  }


  return (
    <div className="tab-forms">
      { isLoading ? <Spin/>
      :
      <>
        { frm !== null ? <FormDetail key={key} formId={frm.id} refreshBreadCrumbs={_refreshBreadCrumbs} />
        :
        <>
          <Row className="tools-form">
            <Button icon="plus" type="primary" onClick={handleOpenNewForm}>Nuevo Formulario</Button>
          </Row>
          <Row className="titles-section">
            <Col span={1}>Nro</Col>
            <Col span={2}>Categoria</Col>
            <Col span={7}>Nombre</Col>
            <Col span={3}>Creado por</Col>
            <Col span={3}>Fecha de Creación</Col>
            <Col span={3}>Ultima modificacion</Col>
            <Col span={2}>Activo</Col>
            <Col span={3}>Edición</Col>
          </Row>

          { forms.map((f, index) =>
            <Row className="rows-section">
              <Col span={1}>{f.nro}</Col>
              <Col span={2}>{camelizerHelper(f.category)}</Col>
              <Col span={7}><Input size="small" value={f.name} onChange={(e) => changeNameForm(index, e.target.value)} className="editable"/></Col>
              <Col span={3}>{f.userCreate}</Col>
              <Col span={3}>{moment(f.creationDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={3}>{f.updateDate && moment(f.updateDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={2}>
                <Checkbox checked={f.status === 'ACTIVE'} onChange={(e) => changeActiveForm(index, e.target.checked)}/>
              </Col>
              <Col span={3} className="tools-rows-forms">
                <Tooltip title="Modificar">
                  <Button icon="edit" size="small" onClick={(e) => handleEditForm(f)}/>
                </Tooltip>
                <Tooltip title="Historial">
                  <Button icon="folder-open" size="small" />
                </Tooltip>
                <Tooltip title="Eliminar">
                  <Popconfirm title="Confirma eliminar la Sección?" onConfirm={(e) => handleDeleteForm(f)}>
                    <Button icon="delete" size="small" />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Generar Formulario">
                  <Button icon="form" size="small" onClick={() => handleGenerateForm(f)} />
                </Tooltip>
              </Col>
            </Row>
          )}
          { isVisibleNewForm &&
            <Modal
              visible={true}
              title="Nuevo Formulario"
              onOk={ () => closeModalHandler(true)  }
              onCancel={ () => closeModalHandler(false) }
            >
              <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item label="Categoría">
                { getFieldDecorator('category', {
                      validateTrigger: "onChange",
                      rules:
                        [
                          { required: true, message: 'Campo requerido' }
                        ]
                    })(
                    <Select>
                      <Select.Option value="CLIENTE">Cliente</Select.Option>
                      <Select.Option value="COLABORADOR">Colaborador</Select.Option>
                      <Select.Option value="PROVEEDOR">Proveedor</Select.Option>
                      <Select.Option value="DIRECTOR">Director</Select.Option>
                    </Select>
                    )
                }
                </Form.Item>
                <Form.Item label="Formulario">
                { getFieldDecorator('name', {
                      validateTrigger: "onChange",
                      rules:
                        [
                          { required: true, message: 'Campo requerido' }
                        ]
                    })(
                    <Input/>
                    )
                }
                </Form.Item>
              </Form>
            </Modal>
          }
        </>
        }
      </>
      }
    </div>
  )
}
export default Form.create()(TabForms);
