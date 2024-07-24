import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import { Container } from '../';

describe('Container component', () => {
  it('renders with default styles and applies custom props', () => {
    // arrange 
    render(<Container bg="tomato" p="16px">
      Test Content
    </Container>)

    // act
    const myElem = screen.getByText('Test Content')

    // assert
    expect(myElem).toBeInTheDocument()
    expect(myElem).toHaveStyle('background-color: tomato');
    expect(myElem).toHaveStyle('padding: 16px');
  });
});
