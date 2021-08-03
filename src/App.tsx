import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@iconify/react';
import SettingsIcon from '@iconify/icons-ic/outline-settings';
import { useStore } from './store/context';

import MainWidget from './components/Widget';
import Settings from './components/Settings';

import styles from './App.module.scss';
import { TLocation, TWidgetData } from './types';

const App = observer(() => {
  const store = useStore();
  const { loading, weatherReports, getLocationFromLocalStorage, fetchWeatherReportByLocation, fetchWeatherReportByCityName } = store;
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

    console.log('init');

    handleCheckIfGeoLocationIsAvailable();
  }, [fetchWeatherReportByLocation, fetchWeatherReportByCityName, getLocationFromLocalStorage]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {settingsOpened ? (
          <Settings handleToggleSettings={handleToggleSettings} />
        ) : (
          <div>
            <div>
              {!!weatherReports.length &&
                weatherReports.map((weatherReport: TWidgetData) => <MainWidget key={weatherReport.name} weatherReport={weatherReport} handleToggleSettings={handleToggleSettings} />)}
            </div>
            <div onClick={handleToggleSettings}>
              <Icon icon={SettingsIcon} className={styles.settingsIcon} />
            </div>
          </div>
        )}
        {error && <span className={styles.error}>{error}</span>}
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
});

export default App;
