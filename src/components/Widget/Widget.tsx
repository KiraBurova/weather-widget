import React from 'react';

import { getWeatherIconByIconName } from '../../api';
import { roundDegrees } from '../../utils';

import Stats from './Stats';

import { WidgetProps } from './types';
import styles from './Widget.module.scss';

const Widget = ({ weatherReport }: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetTop}>
        {weatherReport.name && (
          <span className={styles.place} data-testid='place'>
            {weatherReport.name}, {weatherReport.countryName}
          </span>
        )}
      </div>
      <div className={styles.temperature} data-testid='temperature'>
        {weatherReport.weather.map((w) => (
          <img src={getWeatherIconByIconName(w.icon)} key={w.id} alt='Weather icon' />
        ))}
        <span>{roundDegrees(weatherReport.temperature)}&deg;C</span>
      </div>
      <p className={styles.weatherDescriptionContainer} data-testid='description'>
        <span>Feels like {roundDegrees(weatherReport.feelsLike)}&deg;C.</span>
        <span className={styles.weatherDescription}>{weatherReport.weather.map((w) => w.description)}.</span>
      </p>
      <Stats weatherReport={weatherReport} />
    </div>
  );
};

export default Widget;
