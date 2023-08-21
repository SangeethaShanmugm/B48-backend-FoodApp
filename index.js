const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = 8000;
const foods = require("./model/foodItems");
const FoodItemsRoute = require("./routes/foodItemsRoute");
app.use(express.json());
app.use(cors());

var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongodb is connected");
});
db.on("error", () => {
  console.log("Mongodb connection failed");
});

app.use("/foodItems", FoodItemsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Foodie Fusion!!!");
});

app.listen(PORT, () => console.log("Server listening on port", PORT));
