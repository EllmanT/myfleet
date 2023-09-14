const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    make :{
        type:String,
        required:true
    },
    companyId:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    regNumber:{
        type:String,
        requried:true,
    }
})

module.exports = mongoose.model("Vehicle", vehicleSchema)