import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cards({ cards = [], deckId }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[cardIndex];
  const navigate = useNavigate();

  if (cards.length <= 2) {
    return (
      <div className="mt-2">
        <h4>Not enough cards.</h4>
        <p>
          You must have at least 3 cards in this deck to study. There are{" "}
          {cards.length} cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

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
        <h5>
          Card {cardIndex + 1} of {cards.length}
        </h5>
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
