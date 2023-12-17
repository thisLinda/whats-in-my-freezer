// import { useEffect, useState } from "react"
// // import { Divider, List } from "antd"
// import { Divider, List, Dropdown, Menu, Modal, Input, Button } from "antd"
// import axios from "axios"
// import Spinner from "../../Components/Spinner/index"
// import { Link } from "react-router-dom"

// export default function ViewCategories({ categories }) {
//   const [categoryList, setCategoryList] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null)
//   const [editModalOpen, setEditModalOpen] = useState(false)
//   const [newCategoryName, setNewCategoryName] = useState("")


//   useEffect (() => {
//     setLoading (true)
//     axios
//       .get("http://localhost:5555/categories")
//       .then((response) => {
//         setCategoryList (response.data.data)
//         setLoading (false)
//       })
//       .catch((error) => {
//         console.log(error)
//         setLoading (false)
//       })
//   }, [])

//   const handleEdit = () => {
//     // Update category name in the backend and then update the category list
//     axios.put(`http://localhost:5555/categories/${selectedCategoryId}`, { name: newCategoryName })
//       .then((response) => {
//         const updatedList = categoryList.map(category => {
//           if (category._id === selectedCategoryId) {
//             return { ...category, name: newCategoryName }
//           }
//           return category
//         })
//         setCategoryList(updatedList)
//         setEditModalOpen(false)
//       })
//       .catch((error) => {
//         console.log(error)
//         // Handle error if necessary
//       })
//   }

//   const handleDelete = () => {
//     // Delete category from the backend and then update the category list
//     axios.delete(`http://localhost:5555/categories/${selectedCategoryId}`)
//       .then((response) => {
//         const updatedList = categoryList.filter(category => category._id !== selectedCategoryId)
//         setCategoryList(updatedList)
//         setSelectedCategoryId(null)
//       })
//       .catch((error) => {
//         console.log(error)
//         // Handle error if necessary
//       })
//   }

//     const menu = (
//     <Menu onClick={({ key }) => {
//       if (key === "edit") {
//         setEditModalOpen(true)
//       } else if (key === "delete") {
//         handleDelete()
//       }
//     }}>
//       <Menu.Item key="edit">Edit</Menu.Item>
//       <Menu.Item key="delete">Delete</Menu.Item>
//     </Menu>
//   )

//   // const menu = (
//   //   <Menu>
//   //     <Menu.Item key="edit" onClick={() => setEditModalOpen(true)}>
//   //       Edit
//   //     </Menu.Item>
//   //     <Menu.Item key="delete" onClick={handleDelete}>
//   //       Delete
//   //     </Menu.Item>
//   //   </Menu>
//   // )

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <Divider orientation="left">Categories</Divider>
//           <List
//             size="large"
//             bordered
//             dataSource={categoryList}
//             renderItem={(category) => (
//               <List.Item>
//                 <Dropdown menu={menu} trigger={["click"]} onOpenChange={() => setSelectedCategoryId(category._id)}>
//                   <span style={{ cursor: "pointer" }}>{category.name}</span>
//                 </Dropdown>
//               </List.Item>
//             )}
//           />
//           <Modal
//             title="Edit Category"
//             open={editModalOpen}
//             onOk={handleEdit}
//             onCancel={() => setEditModalOpen(false)}
//           >
//             <Input
//               value={newCategoryName}
//               onChange={(e) => setNewCategoryName(e.target.value)}
//               onPressEnter={handleEdit}
//             />
//           </Modal>
//         </>
//       )}
//     </>
//   )
// }

// //   const handleItemClick = (categoryId) => {
// //     console.log(`Clicked category with ID: ${categoryId}`)
// //   }

// //   return (
// //     <>
// //     {loading ? (
// //         <Spinner />
// //       ) : (
// //       <>
// //         <Divider orientation="left">Categories</Divider>
// //         <List
// //           size="large"
// //           // header={<div>Header</div>}
// //           // footer={<div>Footer</div>}
// //           bordered
// //           dataSource={categoryList}
// //           renderItem={(category) => (
// //             <List.Item onClick={() => handleItemClick(category._id)}>
// //               <Link to={`/editCategory/${category._id}`}>
// //                 {category.name}
// //               </Link>
// //             </List.Item>
// //           )}
// //         />
// //       </>
// //       )}
// //     </> 
// //   )
// // }
import { useEffect, useState } from "react"
import { Divider, List, Dropdown, Menu, Modal, Input } from "antd"
import { DownOutlined } from "@ant-design/icons"
import axios from "axios"
import Spinner from "../../Components/Spinner/index"

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
        setLoading(false)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const handleEdit = () => {
    // Update category name in the backend and then update the category list
    axios
      .put(`http://localhost:5555/categories/${selectedCategoryId}`, { 
        name: newCategoryName
      })
      .then((response) => {
        const updatedList = categoryList.map(category => {
          if (category._id === selectedCategoryId) {
            return { ...category, name: newCategoryName }
          }
          return category
        })
        setCategoryList(updatedList)
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
        // Handle error if necessary
      })
  }

  const handleDelete = () => {
    // Delete category from the backend and then update the category list
    axios
      .delete(`http://localhost:5555/categories/${selectedCategoryId}`)
      .then((response) => {
        const updatedList = categoryList.filter(
          category => category._id !== selectedCategoryId
        )
        setCategoryList(updatedList)
        setSelectedCategoryId(null)
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
        // Handle error if necessary
      })
  }

//  const menuItems = [
//     {
//       label: 'Edit',
//       onClick: () => setEditModalOpen(true),
//     },
//     {
//       label: 'Delete',
//       onClick: handleDelete,
//     },
//   ]

  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  )

  // const generateMenu = () => (
  //   <Menu onClick={({ key }) => handleMenuClick(key, selectedCategoryId)}>
  //     <Menu.Item key="edit">Edit</Menu.Item>
  //     <Menu.Item key="delete">Delete</Menu.Item>
  //   </Menu>
  // )

  const handleMenuClick = ({ key }) => {
    if (key === "edit") {
      setIsModalOpen(true);
    } else if (key === "delete") {
      handleDelete();
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // const menu = (
  //   <Menu onClick={({ key }) => {
  //     if (key === "edit") {
  //       setEditModalOpen(true)
  //     } else if (key === "delete") {
  //       handleDelete()
  //     }
  //   }}>
  //     <Menu.Item key="edit">Edit</Menu.Item>
  //     <Menu.Item key="delete">Delete</Menu.Item>
  //   </Menu>
  // )

  return (
    // <div>
    //   <Divider orientation="left">Categories</Divider>
    //   <List
    //     size="large"
    //     bordered
    //     dataSource={categoryList}
    //     renderItem={(category) => (
    //       <List.Item key={category._id}>
    //         <Dropdown overlay={menu} trigger={["click"]}>
    //           <span style={{ cursor: "pointer" }}>{category.name}</span>
    //         </Dropdown>
    //         {/* <Dropdown
    //           <Menu
    //             onClick={({ key }) => handleMenuClick(key, category._id)}
    //               <Menu.Item key="edit">Edit</Menu.Item>
    //               <Menu.Item key="delete">Delete</Menu.Item>
    //           />
    //           trigger={["click"]}
    //           <span style={{ cursor: "pointer" }}>{category.name}</span>
    //         </Dropdown> */}
    //       </List.Item>
    //     )}
    //   />
    <div>
      <Divider orientation="left">Categories</Divider>
      <List
        size="large"
        bordered
        dataSource={categoryList}
        renderItem={(category) => (
          <List.Item> {[category.name]}
            {/* <Dropdown
              <Menu
                onClick={onClick}
                category={category}
                onOpenChange={(open) =>
                open && setSelectedCategoryId(category._id)
              }
                <span style={{ cursor: 'pointer' }}>{category.name}</span>
              /Menu>
            </Dropdown> */}
          </List.Item>
        )}
      />
      <Modal
        title="Edit Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onPressEnter={handleEdit}
        />
      </Modal>
    </div>
  )
}
