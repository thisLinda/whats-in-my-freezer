import express from "express"
import cors from "cors"
import axios from "axios"
import { PORT } from "./config.js"
import mongoose from "mongoose"
import Book from "./models/bookModel.js"

const app = express()
const uri = process.env.MONGODB_URI
// const axios = require("axios")
// const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log("listening on port: ${PORT")
})

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("WooHoo MongoDB Learning!")
})

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      })
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    }

    const book = await Book.create(newBook)

    return response.status(201).send(book)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({})
    
    return response.status(200).json({
      count: books.length,
      data: books
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findById(id)

    return response.status(200).json(book)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, pushYear."
    })
  }

  const { id } = request.params

  // Checks if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ message: "Invalid ID format." })
  }

  const result = await Book.findByIdAndUpdate(id, request.body)
    
  if (!result) {
    return response.status(404).json({ message: "Book not found." })
  }

  return response.status(200).send({ "message": "Book updated successfully" })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params

    const result = await Book.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: "Book not found" })
    }

    return response.status(200).send({ "message": "Book deleted successfully" })
    
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
  })

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })
