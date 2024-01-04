import { useEffect, useState } from "react"
import { Divider, List, Dropdown, Menu, Modal, Input, Row, Col } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
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

  const handleMenuClick = (action, categoryId) => {
    if (action === "edit") {
      setIsModalOpen(true)
      setSelectedCategoryId(categoryId)
    } else if (action === "delete") {
      setSelectedCategoryId(categoryId)
      handleDelete()
    }
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
                    <Menu.Item onClick={() => handleMenuClick("edit", category._id)}>
                      <EditOutlined className="anticon-edit" />
                    </Menu.Item>
                    <Menu.Item onClick={() => handleMenuClick('delete', category._id)}>
                      <DeleteOutlined style={{ color: "red" }} className="anticon-delete" />
                    </Menu.Item>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <EditOutlined className="anticon-edit" style={{ marginRight: '10px' }} />
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onPressEnter={() => handleEdit(newCategoryName)}
              style={{ flex: 1 }}
            />
            <DeleteOutlined style={{ color: "red", marginLeft: '10px' }} className="anticon-delete" />
          </div>
          {/* <Row justify="space-between" align="middle">
            <Col>
              <EditOutlined className="anticon-edit" />
            </Col>
            <Col flex="auto">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onPressEnter={() => handleEdit(newCategoryName)}
              />
            </Col>
            <Col>
              <DeleteOutlined style={{ color: "red" }} className="anticon-delete" />
            </Col>
          </Row> */}
        </Modal>
      </>
    </div>
  )
}
