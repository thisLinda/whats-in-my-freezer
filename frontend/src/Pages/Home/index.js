import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Input, Modal } from "antd"
import { SelectOutlined} from "@ant-design/icons"
import "./index.css"

export default function HomePage() {
  const [item, setItem] = useState("")
  const [category, setCategory] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // const handleItemChange = (e) => {
  //   setItem(e.target.value)
  // }
  
  const handleAddItem = () => {
    // if (item) {
      // setItem("")
      navigate(`/item/${encodeURIComponent(category)}`)
      // navigate("/item/")
    // }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleAddCategory = () => {
    if (category) {
      setCategory("")
      setOpen(false)
      navigate(`/item/${encodeURIComponent(category)}`)
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItem()
      handleAddCategory()
    }
  }

  const showModal = () => {
    setOpen(true)
  }

  return (
    <div className="container">
      <div className="btn-container">
        <Button
          className="btn btn-item"
          onClick={handleAddItem}
        >
          <SelectOutlined /> Add Item
        </Button>
        <Button
          className="btn btn-category"
          onClick={showModal}
        >
          <SelectOutlined />Add Category
        </Button>
      </div>
      <Modal
        title="Add Category"
        open={open}
        onOk={handleAddCategory}
        onCancel={() => setOpen(false)}
      >
        <Input
          ref={(input) => input && input.focus()}
          showCount
          maxLength={50}
          placeholder="Enter Category"
          value={category}
          onKeyDown={handleInputKeyDown}
          onChange={handleCategoryChange}
        />
      </Modal>
    </div>
  )
}

