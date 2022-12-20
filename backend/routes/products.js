const router = require("express").Router();
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.productId});
    if(product) {
        return res.json(product);
      }
      res.json({ message:'No Products found' });
    } catch (err) {
      res.json({ message: err });
    }
});

module.exports = router;
