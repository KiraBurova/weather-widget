import { v4 as uuidv4 } from 'uuid';

import { getWeatherReportByCityName, getWeatherReportByLocation } from '../api';
import { transformWeatherReportData } from '../utils';

import { TLocation, TWidgetData } from '../types';

export function createStore() {
  return {
    loading: false,
    serverError: '',
    locations: [] as TLocation[],
    weatherReports: [] as TWidgetData[],
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setServerError(error: string) {
      this.serverError = error;
    },
    fetchWeatherReportByLocation(latitude: number, longitude: number) {
      this.setLoading(true);
      getWeatherReportByLocation(latitude, longitude)
        .then((response) => {
          const weatherReports = transformWeatherReportData(response.data);
          this.setWeatherReports(weatherReports);
          const location = {
            name: weatherReports.name,
            id: uuidv4(),
          };
          this.addLocation(location);
          this.setLocationsToLocalStorage();
        })
        .catch((error: Error) => this.setServerError(error.message))
        .then(() => this.setLoading(false));
    },
    fetchWeatherReportByCityName(location: TLocation) {
      this.setLoading(true);

      getWeatherReportByCityName(location.name)
        .then((response) => {
          this.addLocation(location);
          this.setLocationsToLocalStorage();
          const weatherReports = transformWeatherReportData(response.data);
          this.setWeatherReports(weatherReports);
          console.log(weatherReports);
        })
        .catch((error: Error) => this.setServerError(error.message))
        .then(() => this.setLoading(false));
    },
    fetchAllWeatherReportsByCityName(promises: any) {
      this.setLoading(true);

      Promise.all(promises)
        .then((response) => {
          response.forEach((res: any) => {
            const location: any = {
              name: res.data.name,
              id: uuidv4(),
            };
            this.addLocation(location);
            this.setLocationsToLocalStorage();
            const weatherReports = transformWeatherReportData(res.data);
            this.setWeatherReports(weatherReports);
          });
        })
        .catch((error: Error) => this.setServerError(error.message))
        .then(() => this.setLoading(false));
    },
    reorderWeatherReports() {
      this.weatherReports = [...this.weatherReports].sort((a, b) => {
        return this.locations.findIndex((p) => p.name.toLowerCase() === a.name.toLowerCase()) - this.locations.findIndex((p) => p.name.toLowerCase() === b.name.toLowerCase());
      });
    },
    setWeatherReports(weatherReport: TWidgetData) {
      this.weatherReports.push(weatherReport);
    },
    addLocation(location: TLocation) {
      this.locations.push(location);
    },
    setLocations(locations: TLocation[]) {
      this.locations = locations;
    },
    deleteLocation(id: string) {
      this.locations = this.locations.filter((location) => location.id !== id);
    },
    reorderLocations(list: TLocation[], startIndex: number, endIndex: number) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      this.setLocations(result);
      this.setLocationsToLocalStorage();
      this.reorderWeatherReports();
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
