import { useEffect, useRef, useState } from "react";
import {
  PlusOutlined
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin
} from "antd"
import { useParams } from "react-router-dom"
import CustomMessage from "../../Components/CustomMessage"
import dayjs from "dayjs"

const { TextArea } = Input;
const { Option } = Select;

export default function Item() {
  const [componentDisabled, setComponentDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemQuantity, setItemQuantity] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [errorMessageVisible, setErrorMessageVisible] = useState(false)

  const [form] = Form.useForm()

  const { category } = useParams()

  const itemInputRef = useRef(null)
  const categoryInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const dateInputRef = useRef(null)
  const notesInputRef = useRef(null)
  const submitButtonRef = useRef(null)
  const unitOfMeasurementSelectRef = useRef(null)

  const now = dayjs()

  useEffect(() => {
    if (categoryInputRef.current) {
      categoryInputRef.current.focus()
    }
  }, [])

  const handleItemQuantityChange = (value) => {
    setItemQuantity(value);
    calculateTotalQuantity(value, selectedUnit);
  };

  const calculateTotalQuantity = (quantity, unit) => {
    const numericValue = parseFloat(quantity)

    if (!isNaN(numericValue)) {
      if (unit) {
        setTotalQuantity(`${numericValue} ${unit}`)
      } else {
        setTotalQuantity(`${numericValue}`)
      }
    } else {
      setTotalQuantity("")
    }
  }

  const handleInputKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault()
      nextInputRef.current.focus()
    }
  }

  const handleUnitOfMeasurementBlur = () => {
    calculateTotalQuantity(itemQuantity, selectedUnit);
  }

  const handleUnitOfMeasurementChange = (value) => {
    setSelectedUnit(value);
    calculateTotalQuantity(itemQuantity, value);
  }

  const onClick = ({ key }) => {
    CustomMessage.info(`Click on what ${key}`)
  }

  const what = [
    {
      label: "",
      key: "1",
    },
    {
      label: "cups",
      key: "2",
    },
    {
      label: "slices",
      key: "3",
    },
    {
      label: "ounces",
      key: "4",
    },
    {
      label: "somethings",
      key: "5",
    },
  ];

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!loading) {
          setLoading(true)
          setTimeout(() => {
            if (!loading) {
              setSuccessMessageVisible(true)
              setLoading(false)
              form.resetFields()
            }
          }, 200)
        }
      })
      .catch((err) => {
        console.log("Validation failed:", err)
        setErrorMessageVisible(true)
      })
  }

  return (
    <div>
      {successMessageVisible && (   
        <CustomMessage type="success" content="Item added successfully!" />
      )}
      {errorMessageVisible && (
        <CustomMessage type="error" content="Validation failed. Please check the form." />
      )}
      <Form
        layout="vertical"
        disabled={componentDisabled}
        form={form}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              initialValue={category}
              rules={[
                { required: true },
              ]}
            >
              <Cascader
                style={{ width: "100%", maxWidth: "200px" }}
                options={[
                  {
                    value: "",
                    label: "",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Add Item"
              name="addItem"
              rules={[
                {
                  required: true,
                  message: "Please enter the item",
                },
                { whitespace: true },
                { min: 1 },
              ]}
              hasFeedback
            >
              <Input
                autoFocus
                ref={itemInputRef}
                required
                tabIndex={1}
                onKeyDown={(e) => handleInputKeyDown(e, quantityInputRef)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              className="quantity"
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "How many?",
                }
              ]}
            >
              <InputNumber
                onChange={handleItemQuantityChange}
                value={itemQuantity}
                ref={quantityInputRef}
                tabIndex={2}
                onKeyDown={(e) => handleInputKeyDown(e, dateInputRef)}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Unit of Measurement"
              required
            >
              <Select
                value={selectedUnit}
                onChange={handleUnitOfMeasurementChange}
                tabIndex={3}
                ref={unitOfMeasurementSelectRef}
                onBlur={handleUnitOfMeasurementBlur}
              >
                {what.map((item) => (
                  <Option key={item.key} value={item.label}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Total Quantity">
              <Input
                min={0}
                value={totalQuantity}
                tabIndex={4}
                readOnly
                ref={dateInputRef}
                onKeyDown={(e) => handleInputKeyDown(e, notesInputRef)}
              />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              initialValue={now}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DatePicker tabIndex={5} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Notes" name="notes">
              <TextArea
                autoSize={{
                  minRows: 1,
                  maxRows: 6,
                }}
                ref={notesInputRef}
                tabIndex={6}
                onKeyDown={(e) => handleInputKeyDown(e, submitButtonRef)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="">
          <Spin spinning={loading}></Spin>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<PlusOutlined />}
            onClick={onSubmit}
            ref={submitButtonRef}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}