import React from 'react';
import SurveyList from './SurveyList';
import SurveyForm from './SurveyForm'; 
const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Create a New Survey</h2>
        <SurveyForm onSave={(newSurvey) => console.log(newSurvey)} />
      </div>
      <div>
        <h2>Existing Surveys</h2>
        <SurveyList />
      </div>
    </div>
  );
};

export default AdminPage;
