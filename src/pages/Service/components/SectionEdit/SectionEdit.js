import "./SectionEdit.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Row,
  Radio,
  Select,
  Menu,
  Dropdown,
  Icon,
  Checkbox,
  DatePicker,
  Button,
  Input,
  Spin,
  notification
} from "antd";

import { camelizerHelper } from "../../../../helpers/";
import { useTranslation } from "react-i18next";
import moment from "moment";

const SectionEdit = ({ section }) => {
  const { t } = useTranslation()

  useEffect(() => {
  }, [])

  return (
    <div className="section-edit">

    </div>
  )
}
export default SectionEdit;
