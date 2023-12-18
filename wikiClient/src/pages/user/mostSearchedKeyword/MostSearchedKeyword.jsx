import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MostSearchedKeywords.css'


const MostSearchedKeywords = () => {
  const [keywords, setKeywords] = useState([]);
  const [order, setOrder] = useState('asc');  

  useEffect(() => {
    const fetchMostSearchedKeywords = async () => {
      try {
        const response = await axios.get(`/keywords/${order}`);
        setKeywords(response.data);
      } catch (error) {
        console.error('Error fetching most searched keywords:', error);
      }
    };

    fetchMostSearchedKeywords();
  }, [order]); 

  return (
    <div>
      <h2>Most Searched Keywords</h2>
      <div>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index}>{keyword.searchTerm}: {keyword.count}</li>
          
        ))}
      </ul>
      
    </div>
  );
};

export default MostSearchedKeywords;
