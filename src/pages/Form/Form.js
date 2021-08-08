import "./Form.scss";
import React, { useEffect, useState, useContext } from "react";
import { FormDeclaration } from '../'
import { getFormByIdPromise } from "../Design/components/FormDetail/promises";
import { getFormHashPromise } from "../../promises";
import { withRouter } from "react-router-dom";
import { Spin, Row, Col, Form as FormAnt, Input, Button } from "antd";
import { generateFormPromise } from "../Design/components/FormDetail/promises";

const Form = ({ match, form }) => {
    const { getFieldDecorator, validateFields, getFieldsError, setFieldsValue } = form;
    const [isLoading, setIsloading] = useState(true);
    const [mode, setMode] = useState("html");
    const [frm, setFrm] = useState(null);
    const [ isVisibleDest, setIsVisibleDest ] = useState(false)

    useEffect(async () => {
        if(match.params.id) {
            setIsloading(true);
            getFormByIdPromise(match.params.id).then(response => {
                setFrm(response)
                setIsloading(false);
            })
            if (match.params.view === "pdf") {
                setMode("pdf");
            }
        }else if(match.params.hash) {
            setIsVisibleDest(true)
            let id = await getFormHashPromise(match.params.hash)
            getFormByIdPromise(id).then(response => {
                setFrm(response)
                setIsloading(false);
            })
            setMode("preview");
        }
    }, [])

    const generateForm = (e) => {
        e.preventDefault()

        validateFields(['name', 'email']).then(async (obj) => {
            let fId = await generateFormPromise(frm.id, obj)
            window.location = "../forms/"+fId
        })
    }

    return (
        <div className={"formulario" + (isVisibleDest ? ' visible-dest':'')}>
            {isLoading ? <Spin />
                :
                <>
                <FormDeclaration form={frm} mode={mode} />
                { isVisibleDest &&
                    <div className="form-dest">
                        <FormAnt onSubmit={generateForm}>
                            <Row>
                                <Col span={8} offset={8} className="form-data">
                                    <h3>Datos de Destinatario</h3>
                                    <FormAnt.Item label="Nombre">
                                    { getFieldDecorator('name', {
                                        validateTrigger: "onChange",
                                        rules:
                                            [
                                            { required: true, message: 'Campo requerido' },
                                            ]
                                        })(
                                            <Input/>
                                        )
                                    }
                                    </FormAnt.Item>
                                    <FormAnt.Item label="Email">
                                    { getFieldDecorator('email', {
                                        validateTrigger: "onChange",
                                        rules:
                                            [
                                            { required: true, message: 'Campo requerido' },
                                            ]
                                        })(
                                            <Input/>
                                        )
                                    }
                                    </FormAnt.Item>
                                    <Row>
                                        <Button type="primary" htmlType="submit">Generar</Button>
                                    </Row>
                                </Col>
                            </Row>
                        </FormAnt>
                    </div>
                }
                </>
            }
        </div>
    )
}
export default FormAnt.create()(withRouter(Form));
