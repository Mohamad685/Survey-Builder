import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = ({ onSave }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Adjust the API endpoint as necessary
      const response = await axios.post('/api/surveys', { title });
      onSave(response.data); // Pass the new survey up to the parent component
    } catch (error) {
      console.error("Error saving survey", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button type="submit">Save Survey</button>
    </form>
  );
};

export default SurveyForm;
