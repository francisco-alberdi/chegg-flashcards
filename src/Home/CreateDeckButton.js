import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateDeckButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/decks/new">Create Deck</Link>
    </div>
  );
}

export default CreateDeckButton;
