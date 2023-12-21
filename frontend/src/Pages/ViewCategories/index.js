import { useEffect, useState } from "react"
import { Divider, List, Dropdown, Menu, Modal, Input, Select } from "antd"
import { DownOutlined } from "@ant-design/icons"
import axios from "axios"
import Spinner from "../../Components/Spinner/index"

export default function ViewCategories() {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editMode, setEditMode] = useState(false)
  console.log("isModalOpen:", isModalOpen)
  console.log("selectedCategoryId:", setSelectedCategoryId)

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:5555/categories")
      .then((response) => {
        setCategoryList(response.data.data)
        // setLoading(false)
        // console.log(response)
      })
      .catch((error) => {
        console.log(error)
        // setLoading(false)
      })
  }, [])

  const handleEdit = (newCategoryName) => {
    // Update category name in the backend and then update the category list
    axios
      .put(`http://localhost:5555/categories/${selectedCategoryId}`, { 
        name: newCategoryName
      })
      .then((response) => {
        const updatedList = categoryList.map((category) => {
          if (category._id === selectedCategoryId) {
            return { ...category, name: newCategoryName }
          }
          return category
        })
        setCategoryList(updatedList)
        setIsModalOpen(false)
        setNewCategoryName("")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleDelete = () => {
    // Delete category from the backend and then update the category list
    axios
      .delete(`http://localhost:5555/categories/${selectedCategoryId}`)
      .then((response) => {
        const updatedList = categoryList.filter(
          (category) => category._id !== selectedCategoryId
        )
        setCategoryList(updatedList)
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleOpenSelect = (categoryId) => {
    console.log("Hovered category ID:", categoryId)
    setSelectedCategoryId(categoryId)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    console.log("Modal closed")
    setSelectedCategoryId(null)
  }

  const handleCancel = () => {
    console.log("modal is open")
    setIsModalOpen(false);
    setNewCategoryName(null)
  }

  return (
    <div>
      <Divider orientation="left">Categories</Divider>
      <List
        size="large"
        bordered
        dataSource={categoryList}
        renderItem={(category) => (
          <List.Item
            key={category.id}
            onMouseEnter={() => handleOpenSelect(category._id)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor:
                selectedCategoryId === category._id ? "#e6f7ff" : "inherit",
              cursor: "pointer",
            }}
          >
            <span>{category.name}</span>
            <Modal
              title="Edit or Delete Category"
              open={isModalOpen && selectedCategoryId === category.id}
              onCancel={handleCancel}
              footer={null}
              // onOk={null}
            >
              {/* <p
                style={{ cursor: "pointer" }}
                onClick={handleEdit}
              >
                Edit
              </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
              >
                Delete
              </p> */}
            </Modal>
          </List.Item>
        )}
      />
    </div>
  )
}
