import React, { useState, useEffect } from 'react';

import { getWeatherIconByIconName, getWeatherReportByLocation } from './api';

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

  const handleTransformLocationData = (weatherData: WeatherReportType) => {
    return {
      cityName: weatherData.name,
      countryName: weatherData.sys.country,
      weatherDescription: weatherData.weather[0].description,
      feelsLike: weatherData.main.feels_like,
      weatherIcon: getWeatherIconByIconName(weatherData.weather[0].icon),
      temperature: weatherData.main.temp,
      wind: weatherData.wind,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      pressure: weatherData.main.pressure,
      clouds: weatherData.clouds.all,
    };
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      getWeatherReportByLocation(latitude, longitude)
        .then((response) => response.json())
        .then((weatherData: WeatherReportType) => {
          const weatherReport: WidgetDataType = handleTransformLocationData(weatherData);
          console.log(weatherData);
          setWeatherReports([...weatherReports, weatherReport]);
        })
        .catch((error: TypeError) => setError(error.message));
    });
  };

  return (
    <div className={styles.app}>
      {!!weatherReports.length && weatherReports.map((weatherReport) => <MainWidget weatherReport={weatherReport} />)}
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default App;
