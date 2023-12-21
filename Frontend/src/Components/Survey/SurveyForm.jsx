import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormState = {
  title: '',
  questions: [{ text: '', type: 'input', answerChoices: [] }]
};

function SurveyForm({ match }) {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = match && match.params.id; // Determine if editing based on the URL

  useEffect(() => {
    if (isEditing) {
      // Fetch the survey to edit and set it as initial form state
      axios.get(`/api/surveys/${match.params.id}`).then(response => {
        setFormData(response.data);
      });
    }
  }, [isEditing, match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`/api/surveys/${match.params.id}`, formData);
    } else {
      await axios.post('/api/surveys', formData);
    }
    // Redirect or update state as needed after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Create'} Survey</button>
    </form>
  );
}

export default SurveyForm;
