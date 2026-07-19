import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ViewDeckButton({ deckId }) {
  const navigate = useNavigate();
  return (
    <div>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        View
      </Link>
    </div>
  );
}

export default ViewDeckButton;
