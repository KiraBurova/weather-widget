import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';

import { StoreProvider } from '../store/context';

import App from '../App';

describe('<App />', () => {
  it('show error when no geolocation is available', () => {
    const { container, getByTestId } = render(
      <StoreProvider>
        <App></App>
      </StoreProvider>,
    );
    const error = getByTestId('error');

    expect(error).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('show settings', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          }),
        ),
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const { container, getByRole, getByText } = render(
      <StoreProvider>
        <App></App>
      </StoreProvider>,
    );

    await waitFor(() => {
      const button = getByRole('button');

      fireEvent.click(button);

      expect(getByText('Settings')).toBeTruthy();
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('show error when geolocation is not given', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
        Promise.resolve(
          error({
            code: 1,
            message: 'GeoLocation Error',
          }),
        ),
      ),
    };

    global.navigator.geolocation = mockGeolocation;

    const { container, getByTestId } = render(
      <StoreProvider>
        <App></App>
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('error')).toBeTruthy();
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
