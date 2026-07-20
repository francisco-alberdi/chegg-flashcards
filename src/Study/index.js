import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "../components/NavBar";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  const navBarItems = [
    { name: deck.name, url: `/decks/${deck.id}` },
    { name: "Study" },
  ];

  return (
    <div>
      <NavBar items={navBarItems} />
    </div>
  );
}

export default Study;
