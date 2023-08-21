const mongoose = require("mongoose");

const foodItemsSchema = mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    variants: [],
    prices: [],
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const foodItemsSchemaModel = mongoose.model("food_Items", foodItemsSchema);

module.exports = foodItemsSchemaModel;
