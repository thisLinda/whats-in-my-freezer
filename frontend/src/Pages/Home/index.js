import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ConfigProvider, Input, Modal, message } from "antd"
import { SelectOutlined} from "@ant-design/icons"
import "./index.css"
import Spinner from "../../Components/Spinner"
import axios from "axios"
import { useSnackbar } from "notistack"

export default function HomePage() {
  // const [item, setItem] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  // const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false)
  const [openOptionsModal, setOpenOptionsModal] = useState(false)
  const [newlyAddedCategory, setNewlyAddedCategory] = useState({})
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleAddItem = () => {
    navigate("/item")
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value.toUpperCase())
  }

  const handleAddCategory = () => {
    if (category) {
      axios
        .get(`http://localhost:5555/categories?name=${category}`)
        .then((response) => {
          const existingCategories = response.data.data

          const categoryExists = existingCategories.some(
            (existingCat) => existingCat.name === category
          )

          if (!categoryExists) {
            axios
              .post("http://localhost:5555/categories", { name: category })
              .then((addCategoryResponse) => {
                const newCategoryData = addCategoryResponse.data

                const newCategory = {
                  value: newCategoryData._id,
                  label: newCategoryData.name,
                }

                setCategories((prevCategories) => [newCategory, ...prevCategories])

                setNewlyAddedCategory(newCategory)

                // navigate("/item", {state: { updatedCategories: [newCategory, ...categories] }})

                setOpenAddCategoryModal(false)
                
                enqueueSnackbar("Category added successfully", { variant: "success"})

                // message.success("Category added successfully!")
                showOptionsModal()
              })
              .catch((error) => {
                console.log(error)
                enqueueSnackbar("Error", { variant: "error"})
                // message.error("Failed to add category.")
              })
          } else {
            enqueueSnackbar("Category already exists.", { variant: "error"})

            // message.warning("Category already exists.")
          }
        })
        .catch((error) => {
          enqueueSnackbar("Error checking that the category already exists.", { variant: "error"})

          // console.log(error)
          // message.error("Error checking category existence.")
        })
    } else {
      enqueueSnackbar("Please enter a category name.", { variant: "error"})

      // message.warning("Please enter a category name.")
    }
  }

  const handleAddAnotherCategory = () => {
    setOpenOptionsModal(false)
    setOpenAddCategoryModal(true)
    setCategory("")
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCategory()
    }
  }

  const showModal = () => {
    setCategory("")
    setOpenAddCategoryModal(true)
  }

  const handleOptionsModalOk = (selectedOption) => {
    if (selectedOption === "category") {
      handleAddAnotherCategory()
    } else if (selectedOption === "item") {
      handleAddItem()
    } else if (selectedOption === "done") {
      setOpenOptionsModal(false)
    }
  }

  const handleOptionsModalCancel = () => {
    setOpenOptionsModal(false)
  }

  const showOptionsModal = () => {
    setOpenAddCategoryModal(false)
    setOpenOptionsModal(true)
  }

  useEffect(() => {
    if (openAddCategoryModal && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [openAddCategoryModal])

  return (
    <ConfigProvider>
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
          open={openAddCategoryModal}
          onOk={handleAddCategory}
          onCancel={() => setOpenAddCategoryModal(false)}
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
        <Modal
          title="Options"
          open={openOptionsModal}
          onOk={handleOptionsModalOk}
          onCancel={handleOptionsModalCancel}
        >
          <Button onClick={() => handleAddAnotherCategory("category")}> Add Another Category</Button>
          <Button onClick={() => handleOptionsModalOk("item")}>Add an Item</Button>
          <Button onClick={() => handleOptionsModalOk("done")}>Done</Button>
        </Modal>
      </div>
    </ConfigProvider>
  )
}