import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NoMatch() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 2000)
  }, [navigate])
  return (
    <div>
      <h2>Page not found :( </h2>
    </div>
  )
}