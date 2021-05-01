import Cards from "../models/cardsModel.js";

const addCard = async (req, res, next) => {
  try {
    const card = await Cards.create({
      name: req.body.name,
      url: req.body.url,
    });

    // send response
    res.status(201).json({
      message: "success",
      data: {
        result: card,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Cards.find();

    // send response
    res.status(200).json({
      message: "success",
      data: {
        result: cards,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { addCard, getAllCards };
