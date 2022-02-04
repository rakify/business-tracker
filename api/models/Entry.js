const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    user: String,
    entryNo: Number,
    date: String,
    cost: Number, //todays total cost
    previousReserve: Number, //previous date final due or reserve
    reserve: Number, //todays reserve
    finalReserve: Number, //reserved-(cost+previousReserve)
    by: String,
    products: Array,
    quantity: Object,
    subtotal: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
