import React, { useState } from 'react';

function App() {
  const [postgresInput, setPostgresInput] = useState('');
  const [mongoInput, setMongoInput] = useState('');

  const handlePostgresChange = (e) => {
    setPostgresInput(e.target.value);
  };

  const handleMongoChange = (e) => {
    setMongoInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postgresData: postgresInput,
          mongoData: mongoInput,
        }),
      });

      if (response.ok) {
        alert('Data saved successfully');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <div>
        <label>PostgreSQL Input: </label>
        <input type="text" value={postgresInput} onChange={handlePostgresChange} />
      </div>
      <div>
        <label>MongoDB Input: </label>
        <input type="text" value={mongoInput} onChange={handleMongoChange} />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default App;
