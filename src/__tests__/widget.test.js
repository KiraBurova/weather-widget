import React from 'react';

import { render } from '@testing-library/react';

import Widget from '../components/Widget';

describe('<Widget />', () => {
  it('renders the <Widget /> width given data', () => {
    const weatherReport = {
      name: 'Moscow',
      countryName: 'RU',
      feelsLike: 17.2,
      temperature: 15.0,
      humidity: 95,
      pressure: 1000,
      clouds: 75,
      weather: [
        {
          description: 'Very bad weather',
          icon: '2d',
          id: 1,
          main: 'Rain',
        },
      ],
      wind: {
        deg: 35,
        speed: 5,
      },
      visibility: 1000,
    };

    const { container, getByTestId } = render(<Widget weatherReport={weatherReport}></Widget>);
    
    expect(getByTestId('place')).toBeTruthy();
    expect(getByTestId('temperature')).toBeTruthy();
    expect(getByTestId('description')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
