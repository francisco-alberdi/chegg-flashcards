import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "../components/DeckForm";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
        setFormData({
          id: loadedDeck.id,
          name: loadedDeck.name,
          description: loadedDeck.description,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load deck:", error);
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await updateDeck(formData, abortController.signal);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to update deck:", error);
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const navBarItems = [
    { name: deck.name, url: `/decks/${deck.id}` },
    { name: "Edit Deck" },
  ];

  return (
    <div>
      <NavBar items={navBarItems} />
      <h1>Edit Deck</h1>
      <DeckForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => navigate(`/decks/${deckId}`)}
      />
    </div>
  );
}

export default EditDeck;
