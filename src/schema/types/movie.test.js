const movie = require("./movie");
const MoviesData = require("../../data/movies");
const ActorsData = require("../../data/actors");
const contextMock = require("../../mocks/context.mock");

describe("movie", () => {
  let moviesData;
  let actorsData;
  beforeEach(() => {
    moviesData = new MoviesData();
    actorsData = new ActorsData();
  });
  describe("resolvers", () => {
    describe("actors", () => {
      const resolver = movie.resolvers.Movie.actors;
      it("should get all actors who played a role in the movie", () => {
        const movie = moviesData.getMovies()[0];
        const expectedActors = actorsData.getActors().filter((actor) => (actor.movies.includes(movie.title)));
        const result = resolver(
          movie,
          {},
          contextMock.createContext()
        );
        
        expect(result.length).toEqual(expectedActors.length);
        result.forEach((actor) => {
          expect(expectedActors.map((a) => a.name).includes(actor.name)).toBe(true);
        });
      });
      
      it("should return an empty array in case no actor played in the movie", () => {
        const movie = moviesData.getMovies(null, {}, contextMock.createContext())[0];
        movie.title = "Test Movie 1234";
        const result = resolver(
          movie,
          {},
          contextMock.createContext()
        );
        expect(result.length).toEqual(0);
      });
    });
  });
});