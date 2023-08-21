const express = require("express");
const app = express();
const router = express.Router();
const Food_Items = require("../model/foodItems");

app.use(express.json());

router.get("/getAllfoodItems", async (req, res) => {
  try {
    const getAllFoods = await Food_Items.find({});
    console.log(getAllFoods);
    res.send(getAllFoods);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

router.post("/addfoodItems", async (req, res) => {
  try {
    Food_Items.insertMany([
      {
        id: req.body.id,
        name: req.body.name,
        variants: ["small", "medium", "large"],
        prices: [req.body.prices],
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
      },
    ]).then((newFoodItems) => {
      console.log(newFoodItems);
    });
    // const newFoodItems = new food_items({
    //   name: food_items.name,
    //   variants: ["small", "medium", "large"],
    //   prices: [food_items.prices],
    //   category: food_items.category,
    //   image: food_items.image,
    //   description: food_items.description,
    // });

    res.send("New Food Items added successfully");
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

router.post("/getfoodItemsById", async (req, res) => {
  const food_id = req.body.id;
  try {
    const item = await Food_Items.findOne({ id: food_id });
    item
      ? res.send(item)
      : res.status(404).send({ message: "No Items to list" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

router.delete("/deleteFoodItemsById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Food_Items.deleteOne({ id: id });
    item
      ? res.send("Food Item Successfully deleted")
      : res.status(404).send({ message: "No Items Found" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

// router.post("/deleteFoodItemsById", async (req, res) => {
//   const food_id = req.body.id;
//   try {
//     const item = await Food_Items.findOneAndDelete({ id: food_id });
//     item
//       ? res.send("Food Item Successfully deleted")
//       : res.status(404).send({ message: "No Items Found" });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: err });
//   }
// });

router.put("/editfoodItemsById/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFoodItems = req.body;
  try {
    const item = await Food_Items.findOneAndUpdate(
      { id: id },
      { $set: updatedFoodItems }
    );
    item
      ? res.send("Item updated successfully")
      : res.status(404).send({ message: "No Items to update" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

module.exports = router;
