import express from "express"
import { Category } from "../models/categoryModel.js"

const router = express.Router()

// route for SAVE a new category or categories
router.post("/", async (request, response) => {
  try {
    // Log to check the received data in the console
    console.log(request.body)
    if (Array.isArray(request.body)) {
      // If it's an array, create multiple categories
      const categories = await Promise.all(
        request.body.map(async (category) => {
          if (!category.name) {
            throw new Error("Send the required field: name")
          }
          return await Category.create({ name: category.name })
        })
      )
      return response.status(201).send(categories)
    } else {
      // If it's a single object, create a single category
      if (!request.body.name) {
        return response.status(400).send({
          message: "Send the required field: name",
        })
      }
      const newCategory = await Category.create({ name: request.body.name })
      return response.status(201).send(newCategory)
    }
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