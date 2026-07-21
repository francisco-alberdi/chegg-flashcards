import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "../components/NavBar";

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

  if (!deck) {
    return <p>Loading...</p>;
  }

  const navBarItems = [{ name: deck.name }];

  return (
    <div>
      <NavBar items={navBarItems} />

      <div className="mb-4">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Link
              to={`/decks/${deck.id}/edit`}
              className="btn btn-secondary mr-2"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary mr-2"
            >
              Study
            </Link>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary"
            >
              + Add Cards
            </Link>
          </div>

          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      <h3>Cards</h3>
    </div>
  );
}

export default Deck;
