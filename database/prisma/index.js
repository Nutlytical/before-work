const express = require("express");

const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
