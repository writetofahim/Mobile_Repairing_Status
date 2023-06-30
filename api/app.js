const express = require("express");
const app = express();
const cors = require("cors");
const statusRoute = require("./routes/statusRoute");

app.use(cors());
app.use(express.json());

// if specified route
app.use("/api/status/", statusRoute);

// if home or root route
app.get("/", (req, res) => {
  res.send("<h1>this is home route 12</h1>");
});

// if unknown route
app.use((req, res) => {
  res.send("<h1>404 not found</h1>");
});

module.exports = app;
