import axios from 'axios';
import { WeatherReportType } from '../types';

export const getWeatherReportByLocation = (latitude: number, longitude: number) => {
  return axios.get<WeatherReportType>(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
};

export const getWeatherIconByIconName = (icon: string) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getWeatherReportByCityName = (cityName: string) => {
  return axios.get<WeatherReportType>(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
};
