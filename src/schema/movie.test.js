const movie = require("./movie");
const moviesData = require("../data/movies");
const actorsData = require("../data/actors");
const contextMock = require("../mocks/context.mock");

describe("movie", () => {
  let movies;
  beforeEach(() => {
    movies = new moviesData.MovieData();
  });
  describe("resolvers", () => {
    describe("actors", () => {
      const resolver = movie.resolvers.Movie.actors;
      it("should get all actors who played a role in the movie", () => {
        const movie = movies.getMovies()[0];
        const expectedActors = actorsData.getActors().filter((actor) => (actor.movies.includes(movie.title)));
        const actors = resolver(
          movie,
          {},
          contextMock.createContext()
        );
        
        expect(actors.length).toEqual(expectedActors.length);
        actors.forEach((actor) => {
          expect(expectedActors.map((a) => a.name).includes(actor.name)).toBe(true);
        });
      });
      
      it("should return an empty array in case no actor played in the movie", () => {
        const movie = movies.getMovies(null, {}, contextMock.createContext())[0];
        movie.title = "Test Movie 1234";
        const actors = resolver(
          movie,
          {},
          contextMock.createContext()
        );
        expect(actors.length).toEqual(0);
      });
    });
  });
});