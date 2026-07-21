import React from "react";

function DeckForm({ formData, handleChange, handleSubmit, onCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Deck Name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          placeholder="Brief description of the deck"
          value={formData.description || ""}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
