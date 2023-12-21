import { Outlet } from "react-router-dom"
import AppRoutes from "../AppRoutes"

export default function AppContent() {

  return (
    <div>
      <AppRoutes />
      <Outlet />
    </div>
  )
}