const express = require("express");
const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT | 5001;

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log(`Server is listening on ${port}`);
// });
