import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
