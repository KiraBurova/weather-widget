import React, { useState, useEffect, useCallback } from 'react';

import { getWeatherIconByIconName, getWeatherReportByLocation } from './api';

import { DataStoreProvider } from './store/context';

import MainWidget from './components/Widget';
import Settings from './components/Settings';

import { WeatherReportType, WidgetDataType } from './types';
import styles from './App.module.scss';

const App = () => {
  const [error, setError] = useState('');
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [weatherReports, setWeatherReports] = useState<Array<WidgetDataType>>([]);

  const handleToggleSettings = useCallback(() => {
    setSettingsOpened(!settingsOpened);
  }, [settingsOpened]);

  useEffect(() => {
    const handleGetCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        console.log(position);

        getWeatherReportByLocation(latitude, longitude)
          .then((data) => {
            //:todo add type for data
            const weatherReport: WidgetDataType = handleTransformLocationData(data.data);
            setWeatherReports((reports) => [...reports, weatherReport]);
          })
          .catch((error: Error) => setError(error.message));
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

  return (
    <DataStoreProvider>
      <div className={styles.app}>
        <div className={styles.container}>
          {settingsOpened ? (
            <Settings handleToggleSettings={handleToggleSettings} />
          ) : (
            !!weatherReports.length && weatherReports.map((weatherReport) => <MainWidget key={weatherReport.cityName} weatherReport={weatherReport} handleToggleSettings={handleToggleSettings} />)
          )}
          <span className={styles.error}>{error}</span>
        </div>
      </div>
    </DataStoreProvider>
  );
};

export default App;
