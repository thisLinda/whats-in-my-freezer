import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import { Button, Input, Modal, message } from "antd"
import { SelectOutlined} from "@ant-design/icons"
import "./index.css"
import Spinner from "../../Components/Spinner"
import axios from "axios"

export default function HomePage() {
  // const [item, setItem] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  // NOTE: not viewing all categories here!

  const handleAddItem = () => {
    if (category) {
      navigate(`/item/${encodeURIComponent(category)}`)
    }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleAddCategory = () => {
    if (category) {
      axios
        .get(`http://localhost:5555/categories?name=${category}`)
        .then((response) => {
          const existingCategories = response.data.data

          const categoryExists = existingCategories.some((existingCat) => existingCat.name === category)

          if (categoryExists) {
            message.warning("Category already exists.")
          } else {
            axios
              .post("http://localhost:5555/categories", { name: category })
              .then(() => {
                message.success("Category added successfully.")

                setCategories((prevCategories) => [
                  ...prevCategories,
                  { value: category, label: category },
                ])

                setOpen(false)
                navigate(`/item/${encodeURIComponent(category)}`)
              })
              .catch((error) => {
                console.log(error);
                message.error("Failed to add category.")
              })
          }
        })
        .catch((error) => {
          console.log(error);
          message.error("Error checking category existence.")
        })
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

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open])

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
          ref={inputRef}
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

