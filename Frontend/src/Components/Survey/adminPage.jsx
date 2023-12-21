// components/AdminPage.js
import React, { useState } from 'react';
// import SurveyForm from './SurveyForm';
// import SurveyList from './SurveyList';

function AdminPage() {
  // State to track if the form should be displayed
  const [showForm, setShowForm] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
    setShowForm(true);
  };

  return (
    <div style={{ margin: '20px' }}>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Back to Survey List' : 'Create New Survey'}
      </button>

      {showForm ? (
        // Pass the editingSurvey to the form if editing
        <SurveyForm survey={editingSurvey} />
      ) : (
        <SurveyList onEdit={handleEdit} />
      )}
    </div>
  );
}

export default AdminPage;
