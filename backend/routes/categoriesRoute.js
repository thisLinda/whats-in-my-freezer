import express from "express"
import { Category } from "../models/categoryModel.js"

const router = express.Router()

// route for SAVE a new category
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name
    ) {
      return response.status(400).send({
        message: "Send the required field: name",
      })
    }
    const newCategory = {
      name: request.body.name
    }

    const category = await Category.create(newCategory)

    return response.status(201).send(category)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for GET all categories
router.get("/", async (request, response) => {
  try {
    const categories = await Category.find({})
    
    return response.status(200).json({
      count: categories.length,
      data: categories
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for GET one category from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const category = await Category.findById(id)

    return response.status(200).json(category)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for UPDATE a category
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name
    ) {
      return response.status(400).send({
        message: "Send the required field: name",
    })
  }

  const { id } = request.params

  const result = await Category.findByIdAndUpdate(id, request.body)
    
  if (!result) {
    return response.status(404).json({ message: "Category not found." })
  }

  return response.status(200).send({ message: "Category updated successfully" })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for DELETE a category
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const result = await Category.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: "Category not found" })
    }

    return response.status(200).send({ message: "Category deleted successfully" })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router