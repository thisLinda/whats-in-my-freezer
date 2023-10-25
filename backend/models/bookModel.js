import mongoose from "mongoose"

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
) 

// Create the mongoose model
const Book = mongoose.model("Book", bookSchema)

// Export the mongoose model, not a function
export default Book