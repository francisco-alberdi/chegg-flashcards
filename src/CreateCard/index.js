import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "../components/CardForm";

function CreateCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);

  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
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
      await createCard(deckId, formData, abortController.signal);
      setFormData({ ...initialFormState });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to add card:", error);
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const navBarItems = [
    { name: deck.name, url: `/decks/${deck.id}` },
    { name: "Add Card" },
  ];

  return (
    <div>
      <NavBar items={navBarItems} />

      <h2>{deck.name}: Add Card</h2>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => navigate(`/decks/${deckId}`)}
      />
    </div>
  );
}

export default CreateCard;
