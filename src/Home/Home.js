import React, { useState, useEffect } from "react";
import CreateDeckButton from "./CreateDeckButton";
import { listDecks } from "../utils/api/index";
import ViewDeckButton from "./ViewDeckButton";
import StudyDeckButton from "./StudyDeckButton";

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
  return (
    <div>
      <CreateDeckButton />
      <div>
        {decks.map((deck) => (
          <div key={deck.id}>
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <div>
              <ViewDeckButton deckId={deck.id} />
              <StudyDeckButton deckId={deck.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
