import { useState } from "react"
import { Button, Input, Modal, Table, Tag } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useSnackbar } from "notistack"


export default function ViewItems() {
  const [alreadySelectedRows, setAlreadySelectedRows] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar()


  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      item: "peas",
      category: "VEGETABLES",
      quantity: "4",
      dateAdded: "2015"
    },
    {
      key: "2",
      item: "asparagus",
      category: "VEGETABLES",
      quantity: "1",
      dateAdded: "2017"
    },
    {
      key: "3",
      item: "blueberries",
      category: "FRUIT",
      quantity: "13",
      dateAdded: "1982"
    },
    {
      key: "4",
      item: "gouda",
      category: "CHEESE",
      quantity: "16",
      dateAdded: "1985"
    },
    {
      key: "5",
      item: "raspberries",
      category: "FRUIT",
      quantity: "6",
      dateAdded: "1981"
    },
    {
      key: "6",
      item: "filet o'beef",
      category: "MEAT",
      quantity: "1",
      dateAdded: "1958"
    },
  ])

  const columns = [
    {
      title: "Item",
      width: 100,
      dataIndex: "item",
      key: "name",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "1",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "2",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "3",
    },
    {
      title: "Actions",
      render: (record) => {
        return <>
          <EditOutlined onClick={() => {
            onEditItem(record)

          }} />
          <DeleteOutlined onClick={() => {
            onDeleteItem(record)
          }} style={{ color: "red", marginLeft: 12 }} />
        </>
      }
    }
  ]

  const onAddItem = () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const newItem = {
      key: "Key " + randomNumber,
      id: randomNumber,
      item: "Name " + randomNumber,
      grade: "Grade " + randomNumber
    }
    setDataSource(pre => {
      return [...pre, newItem]
    })
  }

  const onDeleteItem = (record) => {
    Modal.confirm ({
      title: "Are you sure???", 
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((item) => item.id !==   record.id)
        })
      }
    })
  }

  const onEditItem = (record) => {
    setIsEditing(true)
    setEditingItem({...record})
  }

  const resetEditing = () => {
    setIsEditing(false)
    setEditingItem(null)
  }

  return (
    <div
      className="ItemList"
      style={{marginTop: 20, backgroundColor: "pink"}}>
      <Button onClick={onAddItem}>Add a new item</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1300,
        }}
        rowSelection={{
          onSelect: (record) => {
            console.log({record})
          },
          selections: [
            Table.SELECTION_NONE,
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
              key: "even",
              text: "Select even rows",
              onSelect: (allKeys) => {
                const selectedKeys = allKeys.filter(key => {
                  return key %2 === 0
                })
                setAlreadySelectedRows(selectedKeys)
              }
            }
          ]
        }}
      >

      </Table>
      <Modal
        title="Edit Item"
        open={isEditing}
        okText = "Save"
        onCancel = {() => {
          resetEditing()
        }}
        onOk={() => {
          setDataSource(pre => {
            return pre.map(item => {
              if (item.id === editingItem.id) {
                return editingItem
              } else {
                return item
              }
            })
          })
          resetEditing()
        }}
      >
        <Input value = {editingItem?.item} onChange={(e) => {
          setEditingItem (pre => {
            return {...pre, item:e.target.value}
          })
        }}/>
        <Input value = {editingItem?.grade} onChange={(e) => {
          setEditingItem (pre => {
            return {...pre, grade:e.target.value}
          })
        }} />
      </Modal>
  </div>
  )
}