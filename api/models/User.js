const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    language: String,
    shopName: String,
    shopAddress: String,
    shopBanner: String,
    shopDetails: String,
    shopOfficePn: String,
    shopOtherPn: String,
    shopSignature: String,
    customers: [{
      name: String,
      _name: String,
      pn: String,
      address: String,
      note: String,
      reserve: Number,
      totalCost: Number,
      totalReserve: Number
    }],
    products: [{
      name: String,
      price: Number,
      unit: String
    }],
    admin_key: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
