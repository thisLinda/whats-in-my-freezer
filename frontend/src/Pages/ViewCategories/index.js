import { useEffect, useRef, useState } from "react"
import { Divider, List, Dropdown, Menu, Modal, Input, Row, Col } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from "axios"
import Spinner from "../../Components/Spinner/index"
import { useSnackbar } from "notistack"
import "./index.css"

export default function ViewCategories() {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const inputRef = useRef(null)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [isModalOpen])

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:5555/categories")
      .then((response) => {
        setCategoryList(response.data.data)
        // setLoading(false)
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
        enqueueSnackbar("Category was updated successfully", { variant: "success" })
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" })
      })
  }

  const handleMenuClick = (action, categoryId) => {
    if (action === "edit") {
      setIsModalOpen(true)
      setSelectedCategoryId(categoryId)
    } else if (action === "delete") {
      setSelectedCategoryId(categoryId)
      handleDelete(categoryId)
    }
  }

  const handleDelete = (categoryIdToDelete) => {
    // Delete category from the backend and then update the category list
    if (!categoryIdToDelete) {
      console.error("No category selected for deletion")
      return
    }
    
    axios
      .delete(`http://localhost:5555/categories/${categoryIdToDelete}`)
      .then((response) => {
        const updatedList = categoryList.filter(
          (category) => category._id !== categoryIdToDelete
        )
        setCategoryList(updatedList)
        enqueueSnackbar("Category was deleted successfully", { variant: "success" })
        setIsModalOpen(false)
      })
      .catch((error) => {
        enqueueSnackbar("Error deleting category", { variant: "error" })
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewCategoryName(null)
  }

  const sortedCategory = categoryList.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="categoryList">
      <>
        <Divider orientation="left">Categories</Divider>
        <List
          size="large"
          bordered
          dataSource={sortedCategory}
          renderItem={(category) => (
            <List.Item key={category.id}>
              <Dropdown
                overlay={
                  <Menu>
                    <Row>                      
                      <Menu.Item
                        style={{ borderRadius: "0" }}
                        onClick={() => handleMenuClick("edit", category._id)}
                        icon ={<EditOutlined
                        className="anticon-edit" />}
                      />
                      <Menu.Item
                        style={{ borderRadius: "0" }}
                        onClick={() => handleMenuClick('delete', category._id)}
                        icon={<DeleteOutlined
                          style={{ color: "red" }}className="anticon-delete" />}
                      />
                    </Row>
                  </Menu>
                }
                trigger={["click"]}
              >
                <span>{category.name}</span>
              </Dropdown>
            </List.Item>
          )}
        />
        <Modal
          title="Edit Category"
          open={isModalOpen}
          onOk={() => handleEdit(newCategoryName)}
          onCancel={handleCancel}
        >
          <div>            
            <Input
              ref={inputRef}
              value={newCategoryName}
              onInput={e => e.target.value = e.target.value.toUpperCase()}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onPressEnter={() => handleEdit(newCategoryName)}
              style={{ flex: 1 }}
            />
          </div>
        </Modal>
      </>
    </div>
  )
}
