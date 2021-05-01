import express from "express";
import cors from "cors";

import cardRoutes from "./routes/cardRoutes.js";
import globalErrHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

// Routes
app.use("/api/v1/cards", cardRoutes);

// Handle home page request
app.get("/", (req, res) => res.status(200).send("Tinder Clone Server"));

// Handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

export default app;
