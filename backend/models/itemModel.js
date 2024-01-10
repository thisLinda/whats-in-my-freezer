import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitOfMeasurement: {
      type: String,
      required: true,
    },
    totalQuantity: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model('Item', itemSchema)