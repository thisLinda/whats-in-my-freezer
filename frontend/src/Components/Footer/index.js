import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons"
import { Outlet } from "react-router-dom"

export default function AppFooter() {
  return (
    <div className="AppFooter"
      style={{ 
        backgroundColor: "#98FB98",
        color: "white",
        height: "60",
      }}
    >
      <div
        className="socials"
        style={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          padding: 10,
          fontSize: 32 }}>
            <GithubOutlined style={{ color: "white", padding: 15 }} />
            <LinkedinOutlined style={{ color: "white", padding: 15 }} />
            <TwitterOutlined style={{ color: "white", padding: 15 }} />
      </div>
      <Outlet />
    </div>
  )
}
