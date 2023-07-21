const mongoose = require("mongoose");
const app = require("./app");

const port = 3000;
const hostname = "127.0.0.1";

mongoose.connect(
  "mongodb+srv://writetofahimahammad:PxcR1TxzXDFsitxd@taibuldb.puc4tok.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb atlas");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
