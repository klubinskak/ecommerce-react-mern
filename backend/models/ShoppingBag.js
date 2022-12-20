const mongoose = require("mongoose");

const ShoppingBagSchema = new mongoose.Schema(
    {
        name: {type: String},
        price: {type: Number},
        colors: {type: Array},
        size: {type:Array},
        image: {type: String},
        pieces: {type: Number},
    },
    {versionKey: false }
);

module.exports = mongoose.model("ShoppingBag", ShoppingBagSchema);