import React, { useState, useEffect } from "react";
import CreateDeckButton from "./CreateDeckButton";
import { listDecks } from "../utils/api/index";
import ViewDeckButton from "./ViewDeckButton";
import StudyDeckButton from "./StudyDeckButton";
import DeleteDeckButton from "./DeleteDeckButton";
import DeckListItem from "./DeckListItem";

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
      <div className="mb-4">
        <CreateDeckButton />
      </div>
      <div>
        {decks.map((deck) => (
          <DeckListItem
            key={deck.id}
            deck={deck}
            onDeleteDeck={handleDeleteDeck}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
