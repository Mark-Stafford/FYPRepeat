import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import House from "./Models/HouseModel.js";
import houses from "./data/houses.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/houses",
  asyncHandler(async (req, res) => {
    await House.remove({});
    const importHouses = await House.insertMany(houses);
    res.send({ importHouses });
  })
);

export default ImportData;
