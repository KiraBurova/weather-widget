import { TInitialWeatherReport, TWidgetData } from '../types';

import { getWeatherIconByIconName } from '../api';

export const transformMetersToKM = (meters: number) => {
  return meters / 1000;
};

export const roundDegrees = (degrees: number) => {
  return Math.round(degrees);
};

export const transgormWeatherReportData = (weatherReport: TInitialWeatherReport): TWidgetData => {
  return {
    name: weatherReport.name,
    countryName: weatherReport.sys.country,
    weatherDescription: weatherReport.weather[0].description,
    feelsLike: weatherReport.main.feels_like,
    weatherIcon: getWeatherIconByIconName(weatherReport.weather[0].icon),
    temperature: weatherReport.main.temp,
    wind: weatherReport.wind,
    humidity: weatherReport.main.humidity,
    visibility: weatherReport.visibility,
    pressure: weatherReport.main.pressure,
    clouds: weatherReport.clouds.all,
  };
};
