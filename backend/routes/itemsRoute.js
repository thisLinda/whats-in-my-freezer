import express from "express"
import { Item } from "../models/itemModel.js"

const router = express.Router()

// route for SAVE a new Item or Items
router.post("/", async (request, response) => {
  try {
    // Log to check the received data in the console
    console.log(request.body)
    if (Array.isArray(request.body)) {
      // If it's an array, create multiple items
      const items = await Promise.all(
        request.body.map(async (item) => {
          if (
            !item.name ||
            !item.quantity || 
            !item.unitOfMeasurement ||
            !item.date
          ) {
            throw new Error("Send all required fields: name, quantity, unitOfMeasurement, date")
          }
          const newItem = await Item.create({
            name: item.name,
            quantity: item.quantity,
            totalQuantity: item.totalQuantity,
            unitOfMeasurement: item.unitOfMeasurement,
            date: item.date,
            notes: item.notes
          })
          return newItem
        })
        //   if (
        //     !item.name
        //     !request.body.quantity ||
        //     !request.body.unitOfMeasurement ||
        //     !request.body.date
        //   ){
        //     throw new Error("Send the required fields: name,quantity,  unitOfMeasurement, date");
        //   }
        //   return await Item.create({ 
        //     name: item.name 
        //     quantity: item.quantity,
        //     unitOfMeasurement: item.unitOfMeasurement,
        //     date: item.date
        //   });
        // })
      )
      return response.status(201).send(items)
    } else {
      // If it's a single object, create a single item
      if (
        !request.body.name ||
        !request.body.quantity ||
        !request.body.unitOfMeasurement ||
        !request.body.date
      ){
        return response.status(400).send({
          message: "Send all required fields: name, quantity, unitOfMeasurement, date",
        })
      }
      const newItem = await Item.create({
        name: request.body.name,
        quantity: request.body.quantity,
        totalQuantity: request.body.totalQuantity,
        unitOfMeasurement: request.body.unitOfMeasurement,
        date: request.body.date,
        notes: request.body.notes 
      })
      return response.status(201).send(newItem)
    }
    //   if (!request.body.name) {
    //     return response.status(400).send({
    //       message: "Send the required fields: name, quantity, unitOfMeasurement, date",
    //     })
    //   }
    //   const newItem = await Item.create({ 
    //     name: request.body.name,
    //     quantity: request.body.quantity,
    //     unitOfMeasurement: request.body.unitOfMeasurement,
    //     date: request.body.date
    //   })
    //   return response.status(201).send(newItem)
    // }
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.name ||
//       !request.body.quantity ||
//       !request.body.unitOfMeasurement ||
//       !request.body.date
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: name, quantity, unitOfMeasurement, date',
//       })
//     }
//     const newItem = {
//       name: request.body.name,
//       quantity: request.body.quantity,
//       unitOfMeasurement: request.body.unitOfMeasurement,
//       date: request.body.date
//     }

//     const item = await Item.create(newItem)

//     return response.status(201).send(item)
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message })
//   }
// })

// route for GET All Items from database
router.get('/', async (request, response) => {
  try {
    const items = await Item.find({})

    return response.status(200).json({
      count: items.length,
      data: items,
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for GET one item from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const item = await Item.findById(id)

    return response.status(200).json(item)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for UPDATE an item
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.quantity ||
      !request.body.unitOfMeasurement ||
      !request.body.date
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, quantity, unitOfMeasurement, date",
      })
    }

    const { id } = request.params

    const result = await Item.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'Item not found' })
    }

    return response.status(200).send({ message: "Item updated successfully" })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// route for DELETE an item
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const result = await Item.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: "Item not found" })
    }

    return response.status(200).send({ message: "Item deleted successfully" })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router