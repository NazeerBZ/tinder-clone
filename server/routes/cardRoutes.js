import express from "express";
import cardController from "../controllers/cardController.js";

const router = express.Router();

router.post("/addCard", cardController.addCard);
router.get("/", cardController.getAllCards);

export default router;
