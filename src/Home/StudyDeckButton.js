import React from "react";
import { Link, useNavigate } from "react-router-dom";

function StudyDeckButton({ deckId }) {
  const navigate = useNavigate();
  return (
    <div>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        Study
      </Link>
    </div>
  );
}

export default StudyDeckButton;
