const MoviesData = require("./movies");

describe("movies test", () => {
  let movieData;
  beforeEach(() => {
    movieData = new MoviesData();
  });
  describe("getMovies", () => {
    it("should return all movies", () => {
      const result = movieData.getMovies();
      expect(result.length).toEqual(4); // ToDo: do not use a hard coded value
    });
  });
  
  describe("getMoviesByTitles", () => {
    it("should return all movies", () => {
      const movies = movieData.getMovies();
      const result = movieData.getMoviesByTitles(movies.map((movie) => movie.title));
      expect(result.length).toEqual(movies.length);
      for(let i = 0; i < movies.length; i++) {
        expect(result[i].title).toEqual(movies[i].title);
        expect(result[i].year).toEqual(movies[i].year);
        expect(result[i].rating).toEqual(movies[i].rating);
      }
    });
  });
  
  describe("getMovie", () => {
    it("should return an existing movie", () => {
      const movie = movieData.getMovies()[0];
      const result = movieData.getMovie(movie.title);
      expect(result.title).toEqual(movie.title);
      expect(result.year).toEqual(movie.year);
    });
    
    it("should throw an error if the movie does not exist", () => {
      try {
        movieData.getMovie("not a valid movie");
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
});