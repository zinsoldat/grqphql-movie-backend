function getMovies() {
  return [
    {
      title: "Alien",
      year: 1979,
      rating: 8.4,
      actors: [],
    },
    {
      title: "The Hobbit: An Unexpected Journey",
      year: 2012,
      rating: 7.8,
      actors: [],
    },
    {
      title: "Inception",
      year: 2010,
      rating: 8.8,
      actors: [],
    },
    {
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      actors: [],
    }
  ];
}

class MovieData {
  constructor() {
    this._movies = getMovies();
  }
  
  getMovies() {
    // return copy to avaid side effects
    return this._movies.map((movie => Object.assign({}, movie)));
  }
  getMoviesByTitles(titles) {
    return this._movies.filter((movie) => titles.includes(movie.title))
      .map((movie => Object.assign({}, movie)));
  }
  getMovie(title) {
    const moviesMatch = this._movies.filter((movie) => movie.title === title);
    if (moviesMatch.length !== 1) {
      throw Error("movie does not exist");
    }
    return Object.assign({}, moviesMatch[0]);
  }
}

module.exports = {
  MovieData,
};