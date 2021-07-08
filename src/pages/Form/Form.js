import React, { useEffect, useState, useContext } from "react";
import { FormDeclaration } from '../'
import { getFormByIdPromise } from "../Design/components/FormEdit/promises";
import { withRouter } from "react-router-dom";
import { Spin } from "antd";

const Form = ({ match }) => {
    const [isLoading, setIsloading] = useState(true);
    const [mode, setMode] = useState("html");
    const [form, setForm] = useState(null);

    useEffect(() => {
        setIsloading(true);
        getFormByIdPromise(match.params.id).then(response => {
            setForm(response)
            setIsloading(false);
        })
        if (match.params.view === "pdf") {
            setMode("pdf");
        }
    }, [])

    return (
        <div>
        {isLoading ? <Spin />
            :
            <FormDeclaration form={form} mode={mode} />
        }
        </div>
    )
}
export default withRouter(Form);
