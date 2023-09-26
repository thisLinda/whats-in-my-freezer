import { NumberOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { 
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Spin,
  } from 'antd'

const { TextArea } = Input
const { Option } = Select

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// }

export default function AppForm() {
  const [componentDisabled, setComponentDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()
  const onSubmit = (event) => {
    console.log(event)
    setTimeout(() => {
      message.success("Item added successfully")
    }, 1000)
  }

  // const formItemLayout = {
  //   labelCol: {
  //     span: 20
  //   },
  //   wrapperCol: {
  //     span: 15
  //   }
  // }

  return (
    // <div className="appForm">
      <Form
      // autoComplete="off"
      // labelCol={{ span: 10 }}
      // wrapperCol={{ span: 14 }}
      // onFinish={(values) => {
      //   console.log({ values })
      // }}
      // onFinishFailed={( error ) => {
      //   console.log({ error })
      // }}
      layout="horizontal"
      disabled={componentDisabled}
      >

        {/* should I search for a category first? */}

        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: '',
                label: 'Fruit',
                children: [
                  {
                    value: 'lime',
                    label: 'Lime',
                  },
                  
                ],
              },
              {
                value: '',
                label: 'Vegetable',
                children: [
                  {
                    value: 'corn',
                    label: 'Corn',
                  },
                  
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        
          {/* TODO: decimal quantity, how to do weight or cups; need rule for number input only */}
          <Row>
          <Col span={12}>
            <Form.Item className="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              allowclear="true"
              prefix={<NumberOutlined />}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "How many?"
                }
              ]}
            >
              
              <InputNumber
                prefix={<NumberOutlined />}
              ></InputNumber>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Total Quantity">
              <Form.Item name="totalQuantity" noStyle>
                <InputNumber min={0} />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Add Item"
          name="addItem"
          rule={[
            {
              required: true,
              message: "Please enter the item",
            },
            { whitespace: true },
            { min: 1}
          ]}
          hasFeedback
        >
          <TextArea
            style={{ width: '25%' }}
            rows={1}
            placeholder="test"
            required/>
        </Form.Item>

        <Form.Item label="Notes">
          <TextArea
            style={{ width: '50%' }}
            rows={2} />
        </Form.Item>
        
        {/* form needs to click on click */}
        <Form.Item label="">
          <Spin spinning={loading}></Spin>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<PoweroffOutlined />}
            // onClick={() => setLoading(preValue=>!preValue)}>Add</Button>
            onClick={onSubmit}>Add</Button>
        </Form.Item>

      </Form>
  )
}