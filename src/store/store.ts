import { getWeatherReportByCityName } from '../api';

import { TLocation } from '../types';

export function createStore() {
  return {
    location: '',
    locations: [] as TLocation[],
    fetchWeatherReportByCityName(location: TLocation) {
      getWeatherReportByCityName(location.name)
        .then((weatherData) => {
          this.setLocations(location);
          console.log(weatherData);
        })
        .catch((error: Error) => console.log(error));
    },
    setLocations(location: TLocation) {
      this.locations.push(location);
    },
    deleteLocation(id: number) {
      this.locations = this.locations.filter((location) => location.id !== id);
    },
  };
}
export type TStore = ReturnType<typeof createStore>;
