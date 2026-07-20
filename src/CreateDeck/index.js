import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function CreateDeck() {
  const navBarItems = [{ name: "Create Deck" }];

  return (
    <div>
      <NavBar items={navBarItems} />
      <h1>Create Deck</h1>
    </div>
  );
}

export default CreateDeck;
