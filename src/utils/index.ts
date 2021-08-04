import { TInitialWeatherReport, TWidgetData } from '../types';

export const transformMetersToKM = (meters: number) => {
  return meters / 1000;
};

export const roundDegrees = (degrees: number) => {
  return Math.round(degrees);
};

export const transformWeatherReportData = (weatherReport: TInitialWeatherReport): TWidgetData => {
  return {
    name: weatherReport.name,
    countryName: weatherReport.sys.country,
    weather: weatherReport.weather,
    feelsLike: weatherReport.main.feels_like,
    temperature: weatherReport.main.temp,
    wind: weatherReport.wind,
    humidity: weatherReport.main.humidity,
    visibility: weatherReport.visibility,
    pressure: weatherReport.main.pressure,
    clouds: weatherReport.clouds.all,
  };
};
