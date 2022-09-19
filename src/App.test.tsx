import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('It should have a heading', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Test 1
  const appText = screen.getByText("Bank Listing");
  expect(appText).toBeInTheDocument();

});


test('It should have a table', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Test 2
  const customTable = screen.getByTestId("custom-table");
  expect(customTable).toBeInTheDocument();

});