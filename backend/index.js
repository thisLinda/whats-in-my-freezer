import express from "express"
import cors from "cors"
import axios from "axios"
// import dotenv from "dotenv"
import { PORT } from "./config.js"

// require("dotenv").config()

const app = express()
// const cors = require("cors")
// const axios = require("axios")

// hide api key
app.get("/", (request, response) => {
  res.json("hi from the back end")
})

// bookstore
// app.get('/', (request, response) => {
//   console.log(request)
//   return response.status(234).send('Hi Linda!')
// })

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})