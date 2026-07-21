import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { readDeck, createCard } from "../utils/api/index";

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
          Done
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateCard;
