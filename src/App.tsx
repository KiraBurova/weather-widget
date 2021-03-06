import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@iconify/react';
import SettingsIcon from '@iconify/icons-ic/outline-settings';

import { useStore } from './store/context';
import { getWeatherReportByCityName } from './api';

import MainWidget from './components/Widget';
import Settings from './components/Settings';

import { TLocation, TWidgetData } from './types';
import styles from './App.module.scss';

const App = observer(() => {
  const store = useStore();
  const { loading, serverError, weatherReports, getLocationFromLocalStorage, fetchWeatherReportByLocation, fetchAllWeatherReportsByCityName } = store;
  const [error, setError] = useState('');
  const [settingsOpened, setSettingsOpened] = useState(false);

  const handleToggleSettings = useCallback(() => {
    setSettingsOpened(!settingsOpened);
  }, [settingsOpened]);

  useEffect(() => {
    const handleGetCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const parsedLocations = getLocationFromLocalStorage();
          const promises: any = [];

          if (Object.values(parsedLocations).length) {
            Object.values(parsedLocations as TLocation[]).forEach((location) => {
              promises.push(getWeatherReportByCityName(location.name));
            });
            fetchAllWeatherReportsByCityName(promises);
          } else {
            fetchWeatherReportByLocation(latitude, longitude);
          }
        },
        (error) => setError(error.message),
      );
    };

    const handleCheckIfGeoLocationIsAvailable = () => {
      if ('geolocation' in navigator) {
        handleGetCurrentLocation();
      } else {
        setError('Geolocation is not available');
      }
    };

    handleCheckIfGeoLocationIsAvailable();
  }, [fetchWeatherReportByLocation, fetchAllWeatherReportsByCityName, getLocationFromLocalStorage]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {settingsOpened ? (
          <Settings handleToggleSettings={handleToggleSettings} />
        ) : (
          <>
            {!!weatherReports.length && (
              <div>
                <div>
                  {weatherReports.map((weatherReport: TWidgetData) => (
                    <MainWidget key={weatherReport.name} weatherReport={weatherReport} handleToggleSettings={handleToggleSettings} />
                  ))}
                </div>
                <div onClick={handleToggleSettings} role='button'>
                  <Icon icon={SettingsIcon} className={styles.settingsIcon} />
                </div>
              </div>
            )}
          </>
        )}
        {(error || serverError) && (
          <span className={styles.error} data-testid='error'>
            {error || serverError}
          </span>
        )}
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
});

export default App;
