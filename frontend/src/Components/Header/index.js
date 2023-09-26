import { Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Drawer, Menu }  from "antd"
import { HomeOutlined, MenuOutlined, PoweroffOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons"
import "./index.css"

export default function AppHeader() {
  const [openMenu, setOpenMenu] = useState(false)
  const menuIconStyle = {
    color: "purple",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    backgroundColor: "pink",
    boxShadow: "1px 2px 2px #00000033",
    height: 60,
    border: "none",
    margin: 20
  }

  return (
    <div className="navContainer"
      style={{
        backgroundColor: "blue",
        display: "flex",
        alignItems: "center", 
        height: 60,
      }}>
      <span className="menuIcon">
        <MenuOutlined
          style={menuIconStyle}
          onClick={() => {
            setOpenMenu(true)
          }}
        />
      </span>
      <span className="headerMenu">
        <NavMenu isInline={false} />
      </span>
      <Drawer
        placement="left"
        open={openMenu}
        onClose = {() => {
          setOpenMenu(false)
        }}
        closeable={false}
        bodyStyle={{ backgroundColor:"orange" }}
      >
        <NavMenu isInline={true} />
      </Drawer>
      <Outlet />
    </div>
  )
}

function NavMenu({ isInline=false }) {
  const navigate = useNavigate()
  const menuStyle = {
    flexDirection: isInline ? "column" : "row",
    justifyContent: isInline ? "flex-start" : "center",
    boxShadow: "1px 2px 2px #00000033",
    color: isInline ? "red" : "yellow", 
    fontSize: 20,
    height: 60,
    border: "none"
  }

  return (
    <div className="navMenu" style={menuStyle}>
      <Menu
        style={menuStyle}
        mode={ isInline ? "inline" : "horizontal"}
        onClick={({key}) => {
          if (key === "exit") {
            // exit code here
          } else {
            navigate(key)
          }
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          {
            label: "Home",
            key: "/",
            icon: <HomeOutlined />
          },
          {
            label: "Item",
            key: "/item",
            icon: <UnorderedListOutlined />
          },
          // {
          //   label: "Category",
          //   key: "/category",
          //   icon: <UnorderedListOutlined />
          // },
          {
            label: "Print",
            key: "/print",
            icon: <PrinterOutlined />,
            children: [
              { label: "Print Item", key: "/printItem"},
              { label: "Print Category", key: "/printCategory"}]
          },
          {
            label: "Exit",
            key: "/exit",
            icon: <PoweroffOutlined />
          },
        ]}
      ></Menu>
      <Outlet />
    </div>
  )
}