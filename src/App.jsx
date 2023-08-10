import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Москва');
  const [inputTimeout, setInputTimeout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    const timeout = setTimeout(() => {
      fetchWeatherData(city);
    }, 500);

    setInputTimeout(timeout);

    return () => {
      clearTimeout(inputTimeout);
    };
  }, [city]);

  const fetchWeatherData = (city) => {
    fetch(`https://api.weatherapi.com/v1/current.json?lang=ru&key=140d46611506424ea0e141051230907&q=${encodeURIComponent(city.trim())}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching weather data')}
      })
      .then(data => {
        setWeather(data);
        setError(null)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Что-то пошло не так, попробуйте снова.');
      });
  };

  return (
    <div className="App">
      {/* <input className='city_input' type="text" value={city} onChange={(e) => setCity(e.target.value)} /> */}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h1>Температура в городе <input className='city_input' type="text" value={city} onChange={(e) => setCity(e.target.value)} /> {weather.current.temp_c ? weather.current.temp_c : null }°C</h1>
          <h2>{weather.current.condition.text}</h2>
          <img className='weather_icon' src={`https:${weather.current.condition.icon}`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
  
}

export default App;
