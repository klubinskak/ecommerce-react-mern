const router = require("express").Router();
const ShoppingBag = require("../models/ShoppingBag");
const { ObjectId } = require('mongodb');


router.get("/", async (req, res) => {
  try {
    const data = await ShoppingBag.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req,res) => {
  const newShoppingItem = new ShoppingBag({
    _id: ObjectId(req.body._id),
    name: req.body.name,
    price: req.body.price,
    colors: req.body.colors,
    size: req.body.size,
    image: req.body.image,
    pieces: req.body.pieces
  })
  try {
    const saveShoppingItem = await newShoppingItem.save();
    return res.status(201).json(saveShoppingItem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/delete", async (req, res) => {
  try{
    await ShoppingBag.findOneAndDelete(req.body._id);
    return res.status(200).json({success:true, msg: "Product deleted from shopping bag"});
  }
  catch(err) {
    console.log(err);
  }
})

module.exports = router;