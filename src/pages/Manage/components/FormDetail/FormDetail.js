import "./FormDetail.scss";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Spin,
  Input,
  Modal,
  Form,
  Select,
  Drawer 
} from "antd";
import { camelizerHelper } from "../../../../helpers";

import { useTranslation } from "react-i18next";
import moment from "moment";
import { getFormByIdPromise } from "../../promises";

const FormDetail = ({ form, closeHandler }) => {
    const [frm, setFrm] = useState(null)

    useEffect(() => {
        getFormByIdPromise(form.id).then((response) => {
            setFrm(response)
        })
    }, [])

    return (
        <div className="manage-form-detail">
            <Drawer
                title="Detalle de Declaración"
                placement="right"
                closable={true}
                visible={true}
                width={1300}
                onClose={closeHandler}
            >
            </Drawer> 
        </div>
    )
}

export default FormDetail;
