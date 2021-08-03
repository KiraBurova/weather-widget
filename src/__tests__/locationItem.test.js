import React from 'react';

import { render } from '@testing-library/react';

import store from '../store/store';
import { StoreProvider } from '../store/context';

import LocationItem from '../components/LocationItem';

describe('<LocationItem />', () => {
  it('renders the <LocationItem /> width given data', () => {
    const location = {
      name: 'Oslo',
      id: 2,
    };
    const { container, getByRole } = render(
      <StoreProvider rootStore={store}>
        <LocationItem location={location}></LocationItem>
      </StoreProvider>,
    );
    expect(getByRole('button')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
