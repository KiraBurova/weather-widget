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
          this.addLocation(location);
          this.setLocationsToLocalStorage();
          const weatherReports = transgormWeatherReportData(response.data);
          this.setWeatherReports(weatherReports);
        })
        .catch((error: Error) => console.log(error));
    },
    addLocation(location: TLocation) {
      this.locations.push(location);
    },
    setLocations(locations: TLocation[]) {
      this.locations = locations;
    },
    deleteLocation(id: number) {
      this.locations = this.locations.filter((location) => location.id !== id);
    },
    //@ts-ignore
    reorderLocations(list, startIndex, endIndex) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      console.log(list, startIndex);

      //@ts-ignore
      this.setLocations(result);
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
