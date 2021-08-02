export type WeatherReportType = {
  base: string;
  clouds: {
    all: string;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  rain: {
    '1h': number;
  };
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    deg: number;
    speed: number;
  };
};

export type WidgetDataType = {
  cityName: string;
  countryName: string;
  weatherDescription: string;
  weatherIcon: string;
  temperature: number;
  wind: {
    deg: number;
    speed: number;
  };
  humidity: number;
  visibility: number;
  preassure: number;
};
