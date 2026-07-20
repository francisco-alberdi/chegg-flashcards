import React, { useState } from "react";

function Cards({ cards = [] }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[cardIndex];

  const handleFlip = () => {
    setIsFlipped((prevFlipped) => !prevFlipped);
  };

  return (
    <div>
      <div>
        <h5>Card {cardIndex + 1}</h5>
        <p>{isFlipped ? currentCard.back : currentCard.front}</p>
        <button className="btn btn-secondary mr-2" onClick={handleFlip}>
          Flip
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            setCardIndex((prevIndex) => (prevIndex + 1) % cards.length)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;
