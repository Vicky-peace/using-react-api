import React, { useState, useEffect } from 'react';
import './App.css';

const UniversitySearch = () => {
  const [searchParam, setSearchParam] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchUniversities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://universities.hipolabs.com/search?country=${searchParam}`);
        const data = await response.json();
        setUniversities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    if (searchParam) {
      searchUniversities();
    }
  }, [searchParam]);

  const handleInputChange = (event) => {
    setSearchParam(event.target.value);
  };

  const clearTable = () => {
    setUniversities([]);
  };

  return (
    <div className="container">
  { /*<h2>University search</h2>*/}
      <div className="search-panel">
        <input type="text" placeholder="Enter country name" value={searchParam} onChange={handleInputChange} />
        <button onClick={clearTable} className="clear-button">
          Clear Table
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="university-table">
            <h2>Searched Universities</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((university) => (
                  <tr key={university.name}>
                    <td>{university.name}</td>
                    <td>{university.country}</td>
                    <td>{university.web_pages[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySearch;

