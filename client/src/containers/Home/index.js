import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import TinderCard from "../../components/TinderCard";
import SwipeButtons from "../../components/SwipeButtons";
import { People } from "../../data";

import { cardsActions, cardsSelectors } from "../../duck/cards";

const Home = () => {
  const cards = useSelector(cardsSelectors.getCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.requestGetCards());
  }, []);

  return (
    <div className="home">
      <Header />
      <TinderCard cards={cards} />;
      <SwipeButtons />
    </div>
  );
};

export default Home;
