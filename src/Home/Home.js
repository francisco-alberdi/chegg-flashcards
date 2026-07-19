import React, { useState, useEffect } from "react";
import CreateDeckButton from "./CreateDeckButton";
import { listDecks } from "../utils/api/index";
import ViewDeckButton from "./ViewDeckButton";
import StudyDeckButton from "./StudyDeckButton";
import DeleteDeckButton from "./DeleteDeckButton";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const decks = await listDecks(abortController.signal);
        setDecks(decks);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadDecks();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleDeleteDeck = (deletedDeckId) => {
    setDecks((decks) => decks.filter((deck) => deck.id !== deletedDeckId));
  };

  return (
    <div>
      <CreateDeckButton />
      <div>
        {decks.map((deck) => (
          <div className="card mb-3" key={deck.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{deck.name}</h5>
                <small className="text-muted">{deck.cards.length} cards</small>
              </div>
              <p className="card-text">{deck.description}</p>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <ViewDeckButton deckId={deck.id} />
                  <StudyDeckButton deckId={deck.id} />
                </div>
                <DeleteDeckButton
                  deckId={deck.id}
                  onClickDeleted={handleDeleteDeck}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
