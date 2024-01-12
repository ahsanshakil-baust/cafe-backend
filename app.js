require("dotenv").config;
require("./connection");
const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(express.urlencoded);

app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server Running...");
});
