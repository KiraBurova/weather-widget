import React from 'react';

import { transformMetersToKM, roundDegrees } from '../../utils';
import { Icon } from '@iconify/react';
import PressureIcon from '@iconify/icons-ic/filter-tilt-shift';
import WindIcon from '@iconify/icons-ic/outline-near-me';

import { WidgetProps } from './types';
import styles from './Widget.module.scss';

const Widget = ({ weatherReport }: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetTop}>
        <span className={styles.place}>
          {weatherReport.name}, {weatherReport.countryName}
        </span>
      </div>
      <div className={styles.temperature}>
        <img src={weatherReport.weatherIcon} alt='Weather icon' />
        <span>{roundDegrees(weatherReport.temperature)}&deg;C</span>
      </div>
      <p className={styles.weatherDescriptionContainer}>
        <span>Feels like {roundDegrees(weatherReport.feelsLike)}&deg;C.</span>
        <span className={styles.weatherDescription}>{weatherReport.weatherDescription}.</span>
      </p>
      <div className={styles.row}>
        <span className={styles.wind}>
          <Icon icon={WindIcon} />
          {weatherReport.wind.speed}m/s
        </span>
        <span className={styles.pressure}>
          <Icon icon={PressureIcon} />
          {weatherReport.pressure}hPa
        </span>
      </div>
      <div className={styles.row}>
        <span>
          Humidity: <span className={styles.boldText}>{weatherReport.humidity}%</span>
        </span>
        <span>
          Cloudiness: <span className={styles.boldText}>{weatherReport.clouds}%</span>
        </span>
      </div>
      <span>
        Visibility: <span className={styles.boldText}>{transformMetersToKM(weatherReport.visibility)}km</span>
      </span>
    </div>
  );
};

export default Widget;
