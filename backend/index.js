const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const shoppingbagRoute = require("./routes/shoppingbag");

var cors = require('cors');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB connection successfull!")
    }).catch((err) => {
        console.log(err);
    });


app.use(cors());
app.use(express.json());
app.use("/api/", productRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products/:productId", productRoute);
app.use("/api/shoppingbag", shoppingbagRoute);



app.listen(process.env.PORT,  () => {
    console.log("Backend server is running!");
  });