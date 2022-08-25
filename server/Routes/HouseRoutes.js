import express from "express";
import asyncHandler from "express-async-handler";
import House from "./../Models/HouseModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const houseRoute = express.Router();

// GET ALL HOUSE
houseRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await House.countDocuments({ ...keyword });
    const houses = await House.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ houses, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL HOUSE WITHOUT SEARCH AND PEGINATION
houseRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const houses = await House.find({}).sort({ _id: -1 });
    res.json(houses);
  })
);

// GET SINGLE HOUSE
houseRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const house = await House.findById(req.params.id);
    if (house) {
      res.json(house);
    } else {
      res.status(404);
      throw new Error("House not Found");
    }
  })
);

// HOUSE REVIEW
houseRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const house = await House.findById(req.params.id);

    if (house) {
      const alreadyReviewed = house.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("House already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      house.reviews.push(review);
      house.numReviews = house.reviews.length;
      house.rating =
        house.reviews.reduce((acc, item) => item.rating + acc, 0) /
        house.reviews.length;

      await house.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("House not Found");
    }
  })
);

// DELETE HOUSE
houseRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const house = await House.findById(req.params.id);
    if (house) {
      await house.remove();
      res.json({ message: "House deleted" });
    } else {
      res.status(404);
      throw new Error("House not Found");
    }
  })
);

// CREATE HOUSE
houseRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const houseExist = await House.findOne({ name });
    if (Exist) {
      res.status(400);
      throw new Error("House name already exist");
    } else {
      const house = new House({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (house) {
        const createdhouse = await house.save();
        res.status(201).json(createdhouse);
      } else {
        res.status(400);
        throw new Error("Invalid house data");
      }
    }
  })
);

// UPDATE HOUSE
houseRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const house = await House.findById(req.params.id);
    if (house) {
      house.name = name || house.name;
      house.price = price || house.price;
      house.description = description || house.description;
      house.image = image || house.image;
      house.countInStock = countInStock || house.countInStock;

      const updatedHouse = await house.save();
      res.json(updatedHouse);
    } else {
      res.status(404);
      throw new Error("House not found");
    }
  })
);
export default houseRoute;
