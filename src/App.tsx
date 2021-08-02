import React, { useState, useEffect } from 'react';

import MainWidget from './components/Widget';

import { WeatherReportType, WidgetDataType } from './types';

import styles from './App.module.scss';

const App = () => {
  const [error, setError] = useState('');
  const [weatherReports, setWeatherReports] = useState<Array<WidgetDataType>>([]);

  useEffect(() => {
    const handleCheckIfGeoLocationIsAvailable = () => {
      if ('geolocation' in navigator) {
        handleGetCurrentLocation();
      } else {
        setError('Geolocation is not available');
      }
    };
    handleCheckIfGeoLocationIsAvailable();
  }, []);

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
        .then((response) => response.json())
        .then((weatherData: WeatherReportType) => {
          const weatherReport: WidgetDataType = {
            cityName: weatherData.name,
            countryName: weatherData.sys.country,
            weatherDescription: weatherData.weather[0].description,
            weatherIcon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            temperature: weatherData.main.temp,
            wind: weatherData.wind,
            humidity: weatherData.main.humidity,
            visibility: weatherData.visibility,
            preassure: weatherData.main.pressure,
          };
          setWeatherReports([...weatherReports, weatherReport]);
        })
        .catch((error: TypeError) => setError(error.message));
    });
  };

  return <div className={styles.app}>{!!weatherReports.length && weatherReports.map((weatherReport) => <MainWidget weatherReport={weatherReport} />)}</div>;
};

export default App;
