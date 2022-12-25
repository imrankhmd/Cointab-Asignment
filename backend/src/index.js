const express = require("express");
const app = express();

const authRoute = require("./routes/auth.controller");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/check", async (req, res) => {
  return res.send("success!");
});

app.use("/", authRoute);

module.exports = app;
