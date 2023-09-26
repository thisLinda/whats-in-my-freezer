import { useState } from "react"
import { Button, Modal, Input } from "antd"

export default function Category({ onCategoryAdded }) {
  const [category, setCategory] = useState("")
  const [visible, setVisible] = useState(false)

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleAddCategory = () => {
    if (category) {
      onCategoryAdded(category)
      setCategory("")
      setVisible(false)
    }
  }

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Add Category</Button>
      <Modal
        title="Add Category"
        visible={visible}
        onOk={handleAddCategory}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder="Enter Category"
          value={category}
          onChange={handleCategoryChange}
        />
      </Modal>
    </div>
  )
}