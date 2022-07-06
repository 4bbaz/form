const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(
  "mongodb+srv://root:root@cluster0.91ogx.mongodb.net/PMS?retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/createUsers", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});


const port = 5001;

app.listen(port, () => {
  console.log("successfully!");
});

