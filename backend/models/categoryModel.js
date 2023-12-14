import mongoose from "mongoose"

// create a mongoose model
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
) 

// Export the mongoose MODEL, not a function
export const Category = mongoose.model('Category', categorySchema)