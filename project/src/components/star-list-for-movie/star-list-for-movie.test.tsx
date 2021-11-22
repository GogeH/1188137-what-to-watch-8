import { render, screen } from '@testing-library/react';
import StarListForMovie from './star-list-for-movie';

const NUMBER_STARS = 6;

describe('Component: StarListForMovie', () => {
  it('should render correctly', () => {
    render(<StarListForMovie ratingValue={NUMBER_STARS} onChangeRating={() => NUMBER_STARS}/>);
    expect(screen.getByAltText(/звезда номер 6/i)).toBeInTheDocument();
  });
});
