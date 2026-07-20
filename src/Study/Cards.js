import React, { useState } from "react";

function Cards({ cards = [] }) {
  return (
    <div>
      <div>
        <h5>Card #</h5>
        <p>{cards[0].front}</p>
        <button className="btn btn-secondary mr-2">Flip</button>
        <button className="btn btn-primary">Next</button>
      </div>
    </div>
  );
}

export default Cards;
