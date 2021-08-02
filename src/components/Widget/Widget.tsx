import React from 'react';

import { WidgetProps } from './types';
import styles from './Widget.module.scss';

const Widget = ({ weatherReport }: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <span className={styles.place}>
        {weatherReport.cityName}, {weatherReport.countryName}
      </span>
      <div className={styles.temperature}>
        <img src={weatherReport.weatherIcon} />
        {weatherReport.temperature}
      </div>
      <p>{weatherReport.weatherDescription}</p>
      <div>
        {weatherReport.wind.speed} {weatherReport.wind.speed}
      </div>
      <div>{weatherReport.humidity}</div>
      <div>{weatherReport.preassure}</div>
      <div>{weatherReport.visibility}</div>
    </div>
  );
};

export default Widget;
