import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(10);
  const [link, setLink] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:30001/api/banner')
      .then(response => {
        const { description, timer, link, visible } = response.data;
        setDescription(description);
        setTimer(timer);
        setLink(link);
        setVisible(visible);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:30001/api/banner', { description, timer, link, visible })
      .then(() => {
        alert('Banner updated successfully!');
      })
      .catch(error => {
        console.error('Error updating banner data:', error);
      });
  };

  return (
    <div className="dashboard">
      <label>Description:</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Timer (in seconds):</label>
      <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />

      <label>Link:</label>
      <input value={link} onChange={(e) => setLink(e.target.value)} />

      <label>Visible:</label>
      <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Dashboard;
