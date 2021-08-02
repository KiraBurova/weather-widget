import { getWeatherReportByCityName, getWeatherReportByLocation, getWeatherIconByIconName } from '../api';

import { TLocation, WeatherReportType } from '../types';

export function createStore() {
  return {
    location: '',
    locations: [] as TLocation[],
    weatherReports: [] as WeatherReportType[],
    fetchWeatherReportByLocation(latitude: number, longitude: number) {
      getWeatherReportByLocation(latitude, longitude)
        .then((weatherData: any) => {
          console.log(weatherData);
          const w = this.transformLocationData(weatherData.data);
          this.setWeatherReports(w);
        })
        .catch((error: Error) => console.log(error));
    },
    fetchWeatherReportByCityName(location: TLocation) {
      getWeatherReportByCityName(location.name)
        .then((weatherData) => {
          this.setLocations(location);
          const w = this.transformLocationData(weatherData.data);
          this.setWeatherReports(w);
        })
        .catch((error: Error) => console.log(error));
    },
    setLocations(location: TLocation) {
      this.locations.push(location);
    },
    deleteLocation(id: number) {
      this.locations = this.locations.filter((location) => location.id !== id);
    },
    setWeatherReports(weatherReport: any) {
      this.weatherReports.push(weatherReport);
    },
    transformLocationData(weatherData: WeatherReportType) {
      return {
        cityName: weatherData.name,
        countryName: weatherData.sys.country,
        weatherDescription: weatherData.weather[0].description,
        feelsLike: weatherData.main.feels_like,
        weatherIcon: getWeatherIconByIconName(weatherData.weather[0].icon),
        temperature: weatherData.main.temp,
        wind: weatherData.wind,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility,
        pressure: weatherData.main.pressure,
        clouds: weatherData.clouds.all,
      };
    },
  };
}
export type TStore = ReturnType<typeof createStore>;
