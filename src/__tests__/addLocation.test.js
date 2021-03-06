import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { StoreProvider } from '../store/context';

import AddLocation from '../components/AddLocation';

const setup = () => {
  return render(
    <StoreProvider>
      <AddLocation></AddLocation>
    </StoreProvider>,
  );
};

describe('<AddLocation />', () => {
  it('change location on input', () => {
    const { container, getByRole } = setup();
    const textBox = getByRole('textbox');

    fireEvent.change(textBox, { target: { value: 'Oslo' } });

    expect(textBox.value).toEqual('Oslo');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('submit inputted location', () => {
    const { container, getByTestId, getByRole } = setup();
    const textBox = getByRole('textbox');

    fireEvent.change(textBox, { target: { value: 'Oslo' } });

    const form = getByTestId('form');

    fireEvent.submit(form);

    expect(textBox.value).toEqual('');
    expect(container.firstChild).toMatchSnapshot();
  });
});
