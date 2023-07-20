const express = require("express");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

const authRouter = require("./routers/authRouter");

// Middlewares
app.use(express.json());

// Routes
router.get("/login", authRouter);
router.post("/signup", authRouter);

router.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
