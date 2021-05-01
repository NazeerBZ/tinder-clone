import React from "react";
import * as Card from "react-tinder-card";
import "./style.css";

const TinderCard = ({ cards }) => {
  const swiped = (direction, name) => {
    console.log("direction:", direction);
    console.log("name:", name);
  };

  const outOfFrame = (name) => {
    console.log("name:", name);
  };

  return (
    <div className="tinderCard">
      <div className="tinderCard_container">
        {cards.map((item, index) => (
          <Card
            className="swipe"
            key={index}
            onSwipe={(direction) => swiped(direction, item.name)}
            onCardLeftScreen={() => outOfFrame(item.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${item.url})` }}
            >
              <h3>{item.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TinderCard;
