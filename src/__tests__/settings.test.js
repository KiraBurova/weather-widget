import React from 'react';

import { render } from '@testing-library/react';

import { StoreProvider } from '../store/context';

import Settings from '../components/Settings';

describe('<Settings />', () => {
  it('renders with no settings', function () {
    const { getByText } = render(
      <StoreProvider>
        <Settings />
      </StoreProvider>,
    );

    expect(getByText('No settings yet.')).toBeTruthy();
  });
});
