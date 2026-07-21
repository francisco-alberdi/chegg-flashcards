import React from "react";

function CardForm({ formData, handleChange, handleSubmit, onCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          placeholder="Front side of card"
          value={formData.front || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          placeholder="Back side of card"
          value={formData.back || ""}
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

export default CardForm;
