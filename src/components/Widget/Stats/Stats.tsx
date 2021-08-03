import React from 'react';
import { Icon } from '@iconify/react';
import PressureIcon from '@iconify/icons-ic/filter-tilt-shift';
import WindIcon from '@iconify/icons-ic/outline-near-me';

import { transformMetersToKM } from '../../../utils';

import styles from './Stats.module.scss';

const Stats = ({ weatherReport }: any) => {
  return (
    <div>
      <div className={styles.row}>
        {weatherReport.wind.speed && (
          <span className={styles.wind} data-testid='wind'>
            <Icon icon={WindIcon} />
            {weatherReport.wind.speed}m/s
          </span>
        )}
        {weatherReport.pressure && (
          <span data-testid='pressure' className={styles.pressure}>
            <Icon icon={PressureIcon} />
            {weatherReport.pressure}hPa
          </span>
        )}
      </div>
      <div className={styles.row}>
        {weatherReport.humidity && (
          <span data-testid='humidity'>
            Humidity: <span className={styles.boldText}>{weatherReport.humidity}%</span>
          </span>
        )}
        {weatherReport.clouds && (
          <span data-testid='cloudiness'>
            Cloudiness: <span className={styles.boldText}>{weatherReport.clouds}%</span>
          </span>
        )}
      </div>
      {weatherReport.visibility && (
        <span data-testid='visibility'>
          Visibility: <span className={styles.boldText}>{transformMetersToKM(weatherReport.visibility)}km</span>
        </span>
      )}
    </div>
  );
};

export default Stats;
