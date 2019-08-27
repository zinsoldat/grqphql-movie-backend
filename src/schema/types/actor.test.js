const actor = require("./actor");
const ActorsData = require("../../data/actors");
const MoviesData = require("../../data/movies");
const DirectorsData = require("../../data/directors");
const contextMock = require("../../mocks/context.mock");

describe("actor", () => {
  let moviesData;
  let actorsData;
  let directorsData;
  beforeEach(() => {
    moviesData = new MoviesData();
    actorsData = new ActorsData();
    directorsData = new DirectorsData();
  });
  describe("resolvers", () => {
    describe("directors", () => {
      const resolver = actor.resolvers.Actor.directors;
      it("should get all directors", () => {
        const result = resolver(
          {movies: moviesData.getMovies().map((movie) => movie.title)},
          {},
          contextMock.createContext()
        );
        expect(result.length).toEqual(directorsData.getDirectors().length);
      });
      
      it("should get all directors of movies the actor played in", () => {
        const testActor = actorsData.getActors()[0];
        const result = resolver(
          testActor,
          {},
          contextMock.createContext()
        );
        expect(result.length).toEqual(testActor.movies.length); // assuming all movies in the test data have one director
      });
      
      it("should return an empty array in case no movie matches", () => {
        const result = resolver(
          {movies: ["Test Movie 1234"]},
          {},
          contextMock.createContext()
        );
        expect(result.length).toEqual(0);
      });
    });
  });
});