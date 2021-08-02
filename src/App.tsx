import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { useDataStore } from './store/context';

import MainWidget from './components/Widget';
import Settings from './components/Settings';

import styles from './App.module.scss';
import { TLocation } from './types';

const App = observer(() => {
  const store = useDataStore();
  const { weatherReports, getLocationFromLocalStorage, fetchWeatherReportByLocation, fetchWeatherReportByCityName } = store;
  const [error, setError] = useState('');
  const [settingsOpened, setSettingsOpened] = useState(false);

  const handleToggleSettings = useCallback(() => {
    setSettingsOpened(!settingsOpened);
  }, [settingsOpened]);

  useEffect(() => {
    const handleGetCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const parsedLocations = getLocationFromLocalStorage();

        if (Object.values(parsedLocations).length) {
          Object.values(parsedLocations as TLocation[]).forEach((location) => {
            fetchWeatherReportByCityName(location);
          });
        } else {
          fetchWeatherReportByLocation(latitude, longitude);
        }
      });
    };

    const handleCheckIfGeoLocationIsAvailable = () => {
      if ('geolocation' in navigator) {
        handleGetCurrentLocation();
      } else {
        setError('Geolocation is not available');
      }
    };

    console.log('called');

    handleCheckIfGeoLocationIsAvailable();
  }, [fetchWeatherReportByLocation, fetchWeatherReportByCityName, getLocationFromLocalStorage]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {settingsOpened ? (
          <Settings handleToggleSettings={handleToggleSettings} />
        ) : (
          !!weatherReports.length && weatherReports.map((weatherReport: any) => <MainWidget key={weatherReport.cityName} weatherReport={weatherReport} handleToggleSettings={handleToggleSettings} />)
        )}
        <span className={styles.error}>{error}</span>
      </div>
    </div>
  );
});

export default App;
