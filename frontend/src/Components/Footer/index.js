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
          fontSize: 32 }}
        >
          <a
            href="https://github.com/thisLinda"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white" }}>
              <GithubOutlined style={{ padding: 15 }} />
          </a>
          <a
            href="https://www.linkedin.com/in/linda-forlizzi/"
            target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white" }}>
              <LinkedinOutlined style={{ padding: 15 }} />
          </a>
          <a
            href="https://twitter.com/l_forlizzi/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white" }}>
              <TwitterOutlined style={{ padding: 15 }} />
          </a>
      </div>
      <Outlet />
    </div>
  )
}
