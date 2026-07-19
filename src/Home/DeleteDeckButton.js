import React from "react";
import { deleteDeck } from "../utils/api/index";

function DeleteDeckButton({ deckId, onDeleteDeck }) {
  const handleDelete = async () => {
    const resultFromWarning = window.confirm(
      "Are you sure you want to delete this deck?",
    );
    if (resultFromWarning) {
      await deleteDeck(deckId);
      onDeleteDeck(deckId);
    }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteDeckButton;
