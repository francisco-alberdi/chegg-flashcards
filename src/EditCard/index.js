import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { readDeck, readCard, updateCard } from "../utils/api/index";

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

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of card"
            value={formData.front}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of card"
            value={formData.back}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
