import React from "react";
import ViewDeckButton from "./ViewDeckButton";
import StudyDeckButton from "./StudyDeckButton";
import DeleteDeckButton from "../components/DeleteDeckButton";

function DeckListItem({ deck, onDeleteDeck }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <small className="text-muted">{deck.cards.length} cards</small>
        </div>
        <p className="card-text">{deck.description}</p>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="mr-2">
              <ViewDeckButton deckId={deck.id} />
            </div>
            <div className="mr-2">
              <StudyDeckButton deckId={deck.id} />
            </div>
          </div>
          <DeleteDeckButton deckId={deck.id} onDeleteDeck={onDeleteDeck} />
        </div>
      </div>
    </div>
  );
}

export default DeckListItem;
