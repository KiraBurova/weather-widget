import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Widget } from '../components/Widget';

describe('<Widget />', () => {
  it('renders the <Widget /> with a bunny video', () => {
    const { container, getByText, queryByTestId } = render(<Widget></Widget>);

    expect(queryByTestId('place')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
