import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function Cards({ deck, setDeck }) {
  const handleDeleteCard = async (cardId) => {
    const result = window.confirm(
      "Delete this card? You will not be able to recover it.",
    );
    if (result) {
      await deleteCard(cardId);
      setDeck((prevDeck) => ({
        ...prevDeck,
        cards: prevDeck.cards.filter((card) => card.id !== cardId),
      }));
    }
  };

  return (
    <div>
      <h3>Cards</h3>
      {deck?.cards?.map((card) => (
        <div className="card mb-3" key={card.id}>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <p>{card.front}</p>
              </div>
              <div className="col-6">
                <p>{card.back}</p>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3 border-top pt-2">
              <Link
                to={`/decks/${deck.id}/cards/${card.id}/edit`}
                className="btn btn-secondary mr-2"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
