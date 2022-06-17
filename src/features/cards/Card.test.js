import { render, screen } from '@testing-library/react';
import Card from "./Card";

test('Renders Card', () => {
  render(<Card imageUrl="testUrl" />);

  const image = screen.getByAltText('Card');

  expect(image).toHaveAttribute('src', 'testUrl')
});

test('Visible', () => {
  render(<Card imageUrl="testUrl" active={true} />);

  const image = screen.getByAltText('Card');

  expect(image).toHaveClass('visible')
});

test('Hidden', () => {
  render(<Card imageUrl="testUrl" active={false} />);

  const image = screen.getByAltText('Card ');

  expect(image).toHaveClass('invisible');
});
