import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const navigate = useNavigate();
  const navBarItems = [{ name: "Create Deck" }];

  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

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
      const newDeck = await createDeck(formData, abortController.signal);
      setFormData({ ...initialFormState });
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to create deck:", error);
      }
    }
  };

  return (
    <div>
      <NavBar items={navBarItems} />
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            placeholder="Brief description of the deck"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => navigate("/")}
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

export default CreateDeck;
