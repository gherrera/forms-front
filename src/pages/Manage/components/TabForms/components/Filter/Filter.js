import './Filter.scss'
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Tabs,
  Input,
  Tooltip,
  Button,
  Select
} from "antd";

import moment from "moment";
const { TabPane } = Tabs;

const Filter = ({cbFilters}) => {
    const [advancedObj, setAdvancedObj] = useState({});
    const [advancedObjMenu, setAdvancedObjMenu] = useState({
        m1: {},
        m2: {},
        m3: {},
        m4: {},
      });

    const handlerChange = (menu, field, value, enter) => {
        const obj = { ...advancedObj, [field]: value };
        if (value === null || value === "") {
            delete obj[field];
        }
        setAdvancedObj(obj);
        if (enter) {
            let objMenu = advancedObjMenu[menu];
            const obj2 = { ...objMenu, [field]: value };
            if (value === null || value === "") {
            delete obj2[field];
            }
            const obj3 = { ...advancedObjMenu, [menu]: obj2 };

            cbFilters(obj);
            setAdvancedObjMenu(obj3);
        }
    };

    const enterHandler = (menu, field, value) => {
        handlerChange(menu, field, value, true);
    };
    
    const handleClear = () => {
        setAdvancedObj({});
        setAdvancedObjMenu({ m1: {}, m2: {}, m3: {}, m4: {} });
        cbFilters({});
    };
    
    return (
        <div className="advanced-tab-manage">
            <Tooltip title="Borrar Filtros">
                <Button
                    icon="delete"
                    className="btn-clear"
                    shape="circle"
                    ghost
                    onClick={handleClear}
                />
            </Tooltip>
            <Tabs>
                <TabPane tab="Persona" key="1">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Input
                                size="small"
                                placeholder={"Destinatario o Nro de Documento"}
                                value={advancedObj.rutNombre}
                                onChange={(e) => handlerChange("m1", "rutNombre", e.target.value, false)}
                                onPressEnter={(e) => enterHandler("m1", "rutNombre", e.target.value)}
                            />
                        </Col>
                        <Col span={3}>
                            <Select 
                                placeholder="Tipo de Persona"
                                size="small"
                                value={advancedObj.tipoPersona}
                                onChange={(value) => handlerChange("m1", "tipoPersona", value, true)}
                            >
                                <Select.Option value="PN">Natural</Select.Option>
                                <Select.Option value="PJ">Jurídica</Select.Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Input
                                size="small"
                                placeholder={"Email"}
                                value={advancedObj.email}
                                onChange={(e) => handlerChange("m1", "email", e.target.value, false)}
                                onPressEnter={(e) => enterHandler("m1", "email", e.target.value)}
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Datos Opcionales" key="2">
                    
                </TabPane>
                <TabPane tab="Formulario" key="3">
                    
                </TabPane>
                <TabPane tab="Comentario" key="4">
                    
                </TabPane>
                <TabPane tab="Estado" key="5">
                    
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Filter;
