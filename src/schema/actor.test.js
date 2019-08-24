const actor = require("./actor");
const actorsData = require("../data/actors");
const moviesData = require("../data/movies");
const directorsData = require("../data/directors");
const contextMock = require("../mocks/context.mock");

describe("actor", () => {
  let movies;
  let actors;
  let directors;
  beforeEach(() => {
    movies = new moviesData.MovieData();
    actors = new actorsData.ActorData();
    directors = new directorsData.DirectorsData();
  });
  describe("resolvers", () => {
    describe("directors", () => {
      const resolver = actor.resolvers.Actor.directors;
      it("should get all directors", () => {
        const result = resolver(
          {movies: movies.getMovies().map((movie) => movie.title)},
          {},
          contextMock.createContext()
        );
        expect(result.length).toEqual(directors.getDirectors().length);
      });
      
      it("should get all directors of movies the actor played in", () => {
        const testActor = actors.getActors()[0];
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