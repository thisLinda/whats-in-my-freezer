import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import { Button, Input, Modal } from "antd"
import { SelectOutlined} from "@ant-design/icons"
import "./index.css"
import Spinner from "../../Components/Spinner"
import axios from "axios"

export default function HomePage() {
  // const [item, setItem] = useState("")
  const [category, setCategory] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // NOTE: not viewing all categories here!
  // const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/categories')
      .then((response) => {
        setCategory(response.data.data);
        // setCategories(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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

