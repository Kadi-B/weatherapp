import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '7a2a9ef0d7ba6575e5dd0f27f418774f';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.city.value.trim();
    if (input) setLocation(input);
  };

  return (
    <div className='hero' >
      <h1>Weather App</h1>
      <img src='/logo.png' alt='' />
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

<div className='blue'>

      {weatherData && (
        <div >
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}


</div>
     
    </div>
  );
}

export default App;