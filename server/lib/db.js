"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
mongoose.connect(url, options);
