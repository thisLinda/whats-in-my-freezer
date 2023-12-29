import { useEffect, useState } from "react"
import { Divider, List, Dropdown, Menu, Modal, Input, Table } from "antd"
import axios from "axios"
import Spinner from "../../Components/Spinner/index"
import "./index.css"

export default function ViewCategories() {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

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
        setSelectedCategoryId(null)
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  )

  const handleMenuClick = (key) => {
    if (key === 'edit') {
      setIsModalOpen(true);
    } else if (key === 'delete') {
      handleDelete();
    }
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
                overlay={menu}
                trigger={["click"]}
                onOpenChange={(open) =>
                  open && setSelectedCategoryId(category._id)
                }
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
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onPressEnter={() => handleEdit(newCategoryName)}
            />
          </Modal>
      </>
    </div>
  )
}
