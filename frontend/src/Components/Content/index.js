import { Outlet } from "react-router-dom"
import { theme } from "antd"
import AppRoutes from "../AppRoutes"

export default function AppContent() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <div style={{ background: colorBgContainer, padding: "0 50px" }}>
      <AppRoutes />
      <Outlet />
    </div>
  )
}