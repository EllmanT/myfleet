const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  city: {
    type: String,
    
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
