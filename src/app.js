require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.APP_PORT ?? 5000;

app.use(express.json());

const mainRouter = require("./routes/mainRoute");

app.use("/api", mainRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
