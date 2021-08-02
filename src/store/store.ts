import { getWeatherReportByCityName, getWeatherReportByLocation } from '../api';
import { transgormWeatherReportData } from '../utils';

import { TLocation, WidgetDataType } from '../types';

export function createStore() {
  return {
    location: '',
    locations: [] as TLocation[],
    weatherReports: [] as WidgetDataType[],
    fetchWeatherReportByLocation(latitude: number, longitude: number) {
      getWeatherReportByLocation(latitude, longitude)
        .then((response) => {
          const weatherReports = transgormWeatherReportData(response.data);
          this.setWeatherReports(weatherReports);
        })
        .catch((error: Error) => console.log(error));
    },
    fetchWeatherReportByCityName(location: TLocation) {
      getWeatherReportByCityName(location.name)
        .then((response) => {
          this.setLocations(location);
          this.setLocationsToLocalStorage();
          const weatherReports = transgormWeatherReportData(response.data);
          this.setWeatherReports(weatherReports);
        })
        .catch((error: Error) => console.log(error));
    },
    setLocations(location: TLocation) {
      this.locations.push(location);
    },
    deleteLocation(id: number) {
      this.locations = this.locations.filter((location) => location.id !== id);
    },
    setWeatherReports(weatherReport: WidgetDataType) {
      this.weatherReports.push(weatherReport);
    },
    setLocationsToLocalStorage() {
      const serializedLocations = JSON.stringify(this.locations);

      localStorage.setItem('locations', serializedLocations);
    },
    getLocationFromLocalStorage(): TLocation[] {
      const storedLocations = localStorage.getItem('locations') || '{}';

      return JSON.parse(storedLocations);
    },
  };
}
export type TStore = ReturnType<typeof createStore>;
