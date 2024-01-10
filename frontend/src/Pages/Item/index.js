import { useEffect, useRef, useState } from "react"
import {
  PlusOutlined
} from "@ant-design/icons"
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputRef,
  Row,
  Select,
  Spin
} from "antd"
import { useParams } from "react-router-dom"
import CustomMessage from "../../Components/CustomMessage"
import dayjs from "dayjs"
import axios from "axios"

const { TextArea } = Input
const { Option } = Select

// export default function Item(props) {
export default function Item({ passedCategories, newlyAddedCategory }) {

  const [componentDisabled, setComponentDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemQuantity, setItemQuantity] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [errorMessageVisible, setErrorMessageVisible] = useState(false)
  // const { passedCategories } = props
  // const [categories, setCategories] = useState(props.passedCategories || [])
  const [categories, setCategories] = useState(passedCategories || [])
  const [loadingCategories, setLoadingCategories] = useState(false)
  // const [newlyAddedCategory, setNewlyAddedCategory] = useState(props.newlyAddedCategory || "")
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [itemData, setItemData] = useState({})

  const { category } = useParams()
  // const inputRef = useRef(null)

  const [form] = Form.useForm()

  const categoryInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const dateInputRef = useRef(null)
  const notesInputRef = useRef(null)
  const submitButtonRef = useRef(null)
  const unitOfMeasurementSelectRef = useRef(null)

  const now = dayjs()

  useEffect(() => {
    if (categoryInputRef.current) {
      setTimeout(() => {
        categoryInputRef.current.focus()
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (!passedCategories) {
      setLoadingCategories(true)
      axios
        .get('http://localhost:5555/categories')
        .then((response) => {
          const formattedCategories = response.data.data.map((category) => ({
            value: category._id,
            label: category.name
          }))

          setCategories(formattedCategories)
          setLoadingCategories(false)
        })
        .catch((error) => {
          console.log(error)
          setLoadingCategories(false)
        })
    }
  }, [passedCategories])
  
  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
  }

  const handleItemQuantityChange = (value) => {
    setItemQuantity(value);
    calculateTotalQuantity(value, selectedUnit);
  }

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
    calculateTotalQuantity(itemQuantity, value)
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
  ]

  const onSubmit = () => {
    // Handle form submission without validation
    setLoading(true)
    const formData = form.getFieldsValue()
    const itemData = {
      ...formData,
      categoryId: selectedCategory,
    }
    // setTimeout(() => {
    //   setSuccessMessageVisible(true)
    //   setLoading(false);
    //   form.resetFields();
    // }, 200)
  }

  axios.post("http://localhost:5555/items", itemData)
    .then((response) => {
      // Handle successful response
      setLoading(false);
      setSuccessMessageVisible(true)
      form.resetFields()
    })
    .catch((error) => {
      // Handle error
      setLoading(false);
      setErrorMessageVisible(true);
      console.error('Error:', error)
    })

  return (
    <>
      <Form
        layout="vertical"
        disabled={componentDisabled}
        form={form}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              // ref={categoryInputRef}
              // autoFocus={true}
              label="Category Select"
              name="categorySelect"
              initialValue={selectedCategory}
              rules={[
                { required: true,
                  message: "Please select a category" },
              ]}
            >
              <Select
                tabIndex={1}
                autoFocus={true}
                defaultOpen={true}
                // ref={categoryInputRef}
                style={{ width: "100%", maxWidth: "200px" }}
                placeholder="Select a category"
                loading={loadingCategories}
                // id="category-select"
                value={newlyAddedCategory} 
                onChange={handleCategoryChange}
              >
                {categories.map(option => (
                  <Option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </Option>
                ))} 
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Add Item"
              // name="addItem"
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
                // ref={itemInputRef}
                placeholder="Enter new item"
                required
                tabIndex={2}
                onKeyDown={(e) => handleInputKeyDown(e, quantityInputRef)}
                id="add-item-input"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              // do I need this className?
              className="quantity"
              // name="quantity"
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
                tabIndex={3}
                onKeyDown={(e) => handleInputKeyDown(e, dateInputRef)}
                id="quantity-input"
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
                tabIndex={4}
                ref={unitOfMeasurementSelectRef}
                onBlur={handleUnitOfMeasurementBlur}
                id="unit-of-measurement-select"
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
                tabIndex={5}
                readOnly
                ref={dateInputRef}
                onKeyDown={(e) => handleInputKeyDown(e, notesInputRef)}
                id="total-quantity-input"
              />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="Date"
              name="date"
              id="date"
              initialValue={now}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DatePicker tabIndex={6} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Notes"
              name="notes"
            >
              <TextArea
                autoSize={{
                  minRows: 1,
                  maxRows: 6,
                }}
                ref={notesInputRef}
                tabIndex={7}
                onKeyDown={(e) => handleInputKeyDown(e, submitButtonRef)}
                id="notes"
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
    </>
  )
}