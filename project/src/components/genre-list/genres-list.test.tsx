import { render, screen } from '@testing-library/react';
import GenresList from './genres-list';
import { Genres } from '../../types/enum';

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const { container } = render(<GenresList genres={[Genres.AllGenres, Genres.Dramas, Genres.Crime]} activeGenre={Genres.AllGenres} onGenreChange={() => Genres.AllGenres}/>);

    expect(container.querySelector('.catalog__genres-list')).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/Drama/i)).toBeInTheDocument();
    expect(screen.getByText(/Crime/i)).toBeInTheDocument();
  });
});
