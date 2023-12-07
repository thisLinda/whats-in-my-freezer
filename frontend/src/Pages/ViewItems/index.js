import { useState } from "react"
import { Button, Input, Modal, Table, Tag } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function ViewItems() {
  const [alreadySelectedRows, setAlreadySelectedRows] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      id: 1,
      item: "Item 1",
      grade: "A+"
    },
    {
      key: "2",
      id: 2,
      item: "Item 2",
      grade: "B"
    },
    {
      key: "3",
      id: 3,
      item: "Item 3",
      grade: "C"
    },
    {
      key: "4",
      id: 4,
      item: "Item 4",
      grade: "D"
    },
    {
      key: "5",
      id: 5,
      item: "Item 5",
      grade: "I"
    },
    {
      key: "6",
      id: 6,
      item: "Item 6",
      grade: "IDK"
    }
  ])

  const columns = [
    {
      title: "Item Id",
      dataIndex: "id"
    },
    {
      title: "Item",
      dataIndex: "item"
    },
    {
      title: "USDA Grade",
      dataIndex: "grade",
      // render: (tag) => {
      //   const color = tag.includes("A") ? "green":tag.includes("B")?"blue": "red"
      //   return <Tag color = {color} key={tag}>{tag}</Tag>
      // }
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

  // https://www.youtube.com/watch?v=aN5ISa0cQMw&list=PL-JTnqZPF5z2qTGwNkYln3m0pA0qfgHFR&index=13
// crud https://www.youtube.com/watch?v=y4_nSE-aZhc&t=27s
  return (
    <div
      className="ItemList"
      style={{marginTop: 20, backgroundColor: "pink"}}>
      <Button onClick={onAddItem}>Add a new item</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
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
      {/* <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          pageSize:20,
        }}
      >
      </Table> */}
      {/* <Table
        style={{ width: '25%' }}
        dataSource={ data }
        columns={columns}
      >
      </Table> */}
  </div>
  )
}