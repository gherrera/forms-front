import React from 'react'
import {Row,Col} from 'antd'
const formRow = (formItems) => {
  return <Row className="form-row">
    {
      formItems.map(formElement => {
        if (formElement !== null) {
          const test = formElement.labelClass
          const line = []
          if (formElement.label)
            line.push(
              <Col span={formElement.cols}>
                <label class={formElement.labelClass ? formElement.labelClass : ''} >
                  {formElement.label}
                </label>
                {< formElement.item.type {...formElement.item.props}/>}
              </Col>)
          return line
        } else
          return null
      })
    }
  </Row>
}

export default formRow;

