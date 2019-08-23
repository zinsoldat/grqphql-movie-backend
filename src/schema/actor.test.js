const actor = require("./actor");
const actorsData = require("../data/actors");
const moviesData = require("../data/movies");
const directorsData = require("../data/directors");
const contextMock = require("../mocks/context.mock");

describe("actor", () => {
  describe("resolvers", () => {
    describe("directors", () => {
      const resolver = actor.resolvers.Actor.directors;
      it("should get all directors", () => {
        const directors = resolver(
          {movies: moviesData.getMovies().map((movie) => movie.title)},
          {},
          contextMock.createContext()
        );
        expect(directors.length).toEqual(directorsData.getDirectors().length);
      });
      
      it("should get all directors of movies the actor played in", () => {
        const testActor = actorsData.getActors()[0];
        const directors = resolver(
          testActor,
          {},
          contextMock.createContext()
        );
        expect(directors.length).toEqual(testActor.movies.length); // assuming all movies in the test data have one director
      });
      
      it("should return an empty array in case no movie matches", () => {
        const directors = resolver(
          {movies: ["Test Movie 1234"]},
          {},
          contextMock.createContext()
        );
        expect(directors.length).toEqual(0);
      });
    });
  });
});