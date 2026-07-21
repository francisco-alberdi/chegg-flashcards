import { Link } from "react-router-dom";
import DeleteDeckButton from "../components/DeleteDeckButton";

function DeckData({ deck, onDeleteDeck }) {
  return (
    <div className="mb-4">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Link
            to={`/decks/${deck.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            Edit
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
            Study
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            + Add Cards
          </Link>
        </div>

        <DeleteDeckButton deckId={deck.id} onDeleteDeck={onDeleteDeck} />
      </div>
    </div>
  );
}

export default DeckData;
