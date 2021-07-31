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

const TabForms = ({breadcrumbs, refreshBreadCrumbs}) => {
	const { t } = useTranslation()
  const [forms, setForms] = useState([])
  const [form, setForm] = useState(null)
  const [key, setKey] = useState(Math.random())
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isVisibleNewForm, setIsVisibleNewForm ] = useState(false)
  const [ newFormObj, setNewFormObj ] = useState({})

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
    setForm(f)
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
      b.push({title: form.name})
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

  const handleChangeAttrNewForm = (key, value) => {
    let f = { ...newFormObj, [key]: value }
    setNewFormObj(f)
  }

  const handleOpenNewForm = () => {
    setNewFormObj({})
    setIsVisibleNewForm(true)
  }

  const closeModalHandler = (create) => {
    if(create) {
      updateFormPromise({ ...newFormObj, status: 'ACTIVE' }).then(r => {
        loadForms()
      })
    }
    setIsVisibleNewForm(false)
  }

  const handleDeleteForm = (form) => {
    updateFormPromise({ ...form, deleted: true }).then(r => {
      loadForms()
      notification.success({
        message: 'Formulario borrado'
      })
    })
  }

  return (
    <div className="tab-forms">
      { isLoading ? <Spin/>
      :
      <>
        { form !== null ? <FormDetail key={key} formId={form.id} refreshBreadCrumbs={_refreshBreadCrumbs} />
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

          { forms.map((form, index) =>
            <Row className="rows-section">
              <Col span={1}>{form.nro}</Col>
              <Col span={2}>{camelizerHelper(form.category)}</Col>
              <Col span={7}><Input size="small" value={form.name} onChange={(e) => changeNameForm(index, e.target.value)} className="editable"/></Col>
              <Col span={3}>{form.userCreate}</Col>
              <Col span={3}>{moment(form.creationDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={3}>{form.updateDate && moment(form.updateDate).format('DD/MM/YYYY HH:mm')}</Col>
              <Col span={2}>
                <Checkbox checked={form.status === 'ACTIVE'} onChange={(e) => changeActiveForm(index, e.target.checked)}/>
              </Col>
              <Col span={3} className="tools-rows-forms">
                <Tooltip title="Modificar">
                  <Button icon="form" size="small" onClick={(e) => handleEditForm(form)}/>
                </Tooltip>
                <Tooltip title="Historial">
                  <Button icon="folder-open" size="small" />
                </Tooltip>
                <Tooltip title="Eliminar">
                  <Popconfirm title="Confirma eliminar la Sección?" onConfirm={(e) => handleDeleteForm(form)}>
                    <Button icon="delete" size="small" />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Enviar por Correo">
                  <Button icon="mail" size="small" />
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
                  <Select onChange={(value) => handleChangeAttrNewForm('category', value)}>
                    <Select.Option value="CLIENTE">Cliente</Select.Option>
                    <Select.Option value="COLABORADOR">Colaborador</Select.Option>
                    <Select.Option value="PROVEEDOR">Proveedor</Select.Option>
                    <Select.Option value="DIRECTOR">Director</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Formulario">
                  <Input onChange={(e) => handleChangeAttrNewForm('name', e.target.value)}/>
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
export default TabForms;
