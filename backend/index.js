import express from "express"
import cors from "cors"
import axios from "axios"
import { PORT } from "./config.js"
import mongoose from "mongoose"
import categoriesRoute from "./routes/categoriesRoute.js"
import itemsRoute from "./routes/itemsRoute.js"

const app = express()
const uri = process.env.MONGODB_URI

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("WTF")
})

// middleware to parse request body
app.use(express.json())

// middleware for handling CORS policy, allow all origins with default of cors(*)
app.use(cors())

// middleware for handling CORS policy, allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// )

app.use("/categories", categoriesRoute)
app.use("/items", itemsRoute)

mongoose
  .connect(uri)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })
