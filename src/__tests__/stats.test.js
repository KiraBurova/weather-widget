import React from 'react';

import { render } from '@testing-library/react';

import Stats from '../components/Widget/Stats';

describe('<Stats />', () => {
  it('renders the <Stats /> width given data', () => {
    const weatherReport = {
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

    const { container, getByTestId } = render(<Stats weatherReport={weatherReport}></Stats>);

    expect(getByTestId('wind')).toBeTruthy();
    expect(getByTestId('humidity')).toBeTruthy();
    expect(getByTestId('cloudiness')).toBeTruthy();
    expect(getByTestId('visibility')).toBeTruthy();
    expect(getByTestId('pressure')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
