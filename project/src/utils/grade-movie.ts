export const getRatingMovie = (grade: number): string => {
  if (grade >= 0 && grade < 3) {
    return 'Bad';
  }

  if (grade >= 3 && grade < 5) {
    return 'Normal';
  }

  if (grade >= 5 && grade < 8) {
    return 'Good';
  }

  if (grade >= 8 && grade < 10) {
    return 'Very good';
  }

  if (grade === 10) {
    return 'Awesome';
  }

  return 'Unknown';
};

export const getFormatRating = (rating: number): string =>
  rating.toFixed(1).replace('.', ',');
