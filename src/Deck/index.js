import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "../components/NavBar";
import DeckData from "./DeckData";
import Cards from "./Cards";

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load deck:", error);
        }
      }
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteDeck = (deletedDeckId) => {
    navigate("/");
  };

  if (!deck) {
    return <p>Loading...</p>;
  }
  const navBarItems = [{ name: deck.name }];

  return (
    <div>
      <NavBar items={navBarItems} />

      <DeckData deck={deck} onDeleteDeck={handleDeleteDeck} />
      <Cards deck={deck} setDeck={setDeck} />
    </div>
  );
}

export default Deck;
