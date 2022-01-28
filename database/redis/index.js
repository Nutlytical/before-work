const express = require("express");

const basic = require("./route");

const app = express();
app.use(express.json());

app.use("/", basic);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
