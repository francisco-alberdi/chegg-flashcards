import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "../components/CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        const loadedCard = await readCard(cardId, abortController.signal);
        setDeck(loadedDeck);
        setFormData(loadedCard);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load data:", error);
        }
      }
    }

    loadData();

    return () => abortController.abort();
  }, [deckId, cardId]);

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
      await updateCard(formData, abortController.signal);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to update card:", error);
      }
    }
  };

  if (!deck || !formData.id) {
    return <p>Loading...</p>;
  }

  const navBarItems = [
    { name: deck.name, url: `/decks/${deck.id}` },
    { name: `Edit Card ${cardId}` },
  ];

  return (
    <div>
      <NavBar items={navBarItems} />

      <h2>Edit Card</h2>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => navigate(`/decks/${deckId}`)}
      />
    </div>
  );
}

export default EditCard;
