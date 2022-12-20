const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {type:String, required: true, unique: true},
        description : {type:String, required: true},
        price: {type: Number, required: true},
        colors: {type: Array},
        size: {type:Array},
        image: {type: String, required:true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("products", ProductSchema);