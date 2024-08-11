import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 0,
    link: '',
    visible: false,
  });
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    
    axios.get('http://localhost:30001/api/banner')
      .then(response => {
        setBannerData(response.data);
        setTimeLeft(response.data.timer); 
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  }, []); 

  useEffect(() => {
    // Timer interval
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    
    return () => clearInterval(interval);
  }, [timeLeft]); 

 
  if (!bannerData.visible || timeLeft <= 0) return null;

  return (
    <div className="banner">
      <p>{bannerData.description}</p>
      <p>Time left: {timeLeft}s</p>
      {bannerData.link && <a href={bannerData.link}>Click Here</a>}
    </div>
  );
};

export default Banner;
