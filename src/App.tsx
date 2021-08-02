import React, { useState, useEffect, useCallback } from 'react';

import { getWeatherIconByIconName, getWeatherReportByLocation } from './api';

import MainWidget from './components/Widget';
import Settings from './components/Settings';

import { WeatherReportType, WidgetDataType } from './types';

import styles from './App.module.scss';

const App = () => {
  const [error, setError] = useState('');
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [weatherReports, setWeatherReports] = useState<Array<WidgetDataType>>([]);

  useEffect(() => {
    const handleGetCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getWeatherReportByLocation(latitude, longitude)
          .then((response) => response.json())
          .then((weatherData: WeatherReportType) => {
            const weatherReport: WidgetDataType = handleTransformLocationData(weatherData);
            console.log(weatherData);
            setWeatherReports((reports) => [...reports, weatherReport]);
          })
          .catch((error: TypeError) => setError(error.message));
      });
    };

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

  const handleOpenSettings = useCallback(() => {
    setSettingsOpened(!settingsOpened);
  }, [settingsOpened]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {settingsOpened ? (
          <Settings handleOpenSettings={handleOpenSettings} />
        ) : (
          !!weatherReports.length && weatherReports.map((weatherReport) => <MainWidget weatherReport={weatherReport} handleOpenSettings={handleOpenSettings} />)
        )}
        <span className={styles.error}>{error}</span>
      </div>
    </div>
  );
};

export default App;
