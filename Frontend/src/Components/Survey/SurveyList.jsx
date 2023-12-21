import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('/api/surveys');
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching surveys", error);
      }
    };

    fetchSurveys();
  }, []);

  const surveyElements = [];
  surveys.forEach(survey => {
    surveyElements.push(
      <div key={survey._id}>
        <h2>{survey.title}</h2>
        {/* More details and actions like edit/delete here */}
      </div>
    );
  });

  return (
    <div>
      {surveyElements}
    </div>
  );
};

export default SurveyList;
