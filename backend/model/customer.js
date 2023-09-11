const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
