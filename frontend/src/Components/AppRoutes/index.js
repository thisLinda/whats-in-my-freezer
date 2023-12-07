import { Routes, Route } from "react-router-dom"
import "./index"
import HomePage from "../../Pages/Home"
import Item from "../../Pages/Item"
import PrintItem from "../../Pages/ViewItems"
import ViewCategories from "../../Pages/ViewCategories"
import NoMatch from "../../Pages/NoMatch"

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/:category" element={<Item />} />
        <Route path="/printItem" element={<PrintItem />} />
        {/* <Route path="/viewCategories" element={<ViewCategories />} /> */}
        {/* <Route path="/exit" element={<Exit />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
  )
}
