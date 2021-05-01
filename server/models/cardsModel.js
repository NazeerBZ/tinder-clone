import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("cards", cardSchema);
