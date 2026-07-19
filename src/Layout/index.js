import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import Study from "../Study";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
