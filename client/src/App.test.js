import { render, screen } from '@testing-library/react';
import App from './App';

test('Render the SWAPI Exercice heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading',{name:/SWAPI Exercise/i});
  expect(headingElement).toBeInTheDocument();
});
