const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: [
    {
        type: Number,
        required: true,
    }
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  idNumber: {
    type:String,
    required:true,
  },
  licence: {
    type:String,
  },
  companyId:{
    type:String,
    required
  },
  dateJoined:{
    type:Date,
  },
  dateEnded:{
    type:Date,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model("Driver", driverSchema);
