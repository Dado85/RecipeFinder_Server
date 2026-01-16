const express = require("express");
require("dotenv").config();
require("./config/db");
const cors = require("cors");
const { PORT } = require("./config/server-config");
const cookieParser = require("cookie-parser");
const v1Router = require("./routes/index");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", v1Router);
app.listen(PORT, () => {
  console.log(`server aterted at ${PORT}`);
});

