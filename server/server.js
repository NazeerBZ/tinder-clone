import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

// loads environment variables from a .env file into process.env
dotenv.config({
  path: "./config.env",
});

// Connect the database
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// listener
const port = process.env.PORT;
app.listen(port, () => console.log(`listening on localhost: ${port}`));
