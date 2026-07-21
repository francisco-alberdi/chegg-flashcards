import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { createDeck } from "../utils/api/index";
import DeckForm from "../components/DeckForm";

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
      <DeckForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}

export default CreateDeck;
