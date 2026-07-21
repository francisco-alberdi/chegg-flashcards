import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import Study from "../Study";
import CreateDeck from "../CreateDeck";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import CreateCard from "../CreateCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
