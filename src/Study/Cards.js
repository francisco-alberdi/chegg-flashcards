import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cards({ cards = [] }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[cardIndex];
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped((prevFlipped) => !prevFlipped);
  };

  const handleNext = () => {
    const isLastCard = cardIndex === cards.length - 1;

    if (isLastCard) {
      const restart = window.confirm(
        "Restart cards? Click 'Cancel' to return to the home page.",
      );

      if (restart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    } else {
      setCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  return (
    <div>
      <div>
        <h5>Card {cardIndex + 1}</h5>
        <p>{isFlipped ? currentCard.back : currentCard.front}</p>
        <button className="btn btn-secondary mr-2" onClick={handleFlip}>
          Flip
        </button>
        {isFlipped && (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
