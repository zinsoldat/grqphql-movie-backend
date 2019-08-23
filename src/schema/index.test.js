const index = require("./index");
const moviesData = require("../data/movies");

describe("index", () => {
  describe("resolvers", () => {
    describe("movies", () => {
      const resolver = index.resolvers.Query.movies;
      it("should return all movies", () => {
        expect(resolver().length).toEqual(moviesData.getMovies().length);
      });
    });
  });
});