import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


const files : any = []


test('renders learn react link', () => {
  render(   <App></App>  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
