const ActorsData = require("./actors");
const MoviesData = require("./movies");

describe("actors test", () => {
  let actorData;
  let moviesData;
  beforeEach(() => {
    actorData = new ActorsData();
    moviesData = new MoviesData();
  });
  describe("getActors", () => {
    it("should return all actors", () => {
      const result = actorData.getActors();
      expect(result.length).toEqual(16); // ToDo: do not use a hard coded value
    });
  });
  
  describe("getActorsByTitles", () => {
    it("should return all actors", () => {
      const actors = actorData.getActors();
      const result = actorData.getActorsByName(actors.map((actor) => actor.name));
      expect(result.length).toEqual(actors.length);
      for(let i = 0; i < actors.length; i++) {
        expect(result[i].title).toEqual(actors[i].title);
        expect(result[i].year).toEqual(actors[i].year);
        expect(result[i].rating).toEqual(actors[i].rating);
      }
    });
  });
  
  describe("getActor", () => {
    it("should return an existing actor", () => {
      const actor = actorData.getActors()[0];
      const result = actorData.getActor(actor.name);
      expect(result.name).toEqual(actor.name);
      expect(result.birthday).toEqual(actor.birthday);
    });
    
    it("should throw an error if the actor does not exist", () => {
      try {
        actorData.getActor("not a valid actor");
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
  describe("getActorsByMovie", () => {
    
    it("should return all actors", () => {
      const movie = moviesData.getMovies()[0];
      const result = actorData.getActorsByMovie(movie.title);
      expect(result.length).toEqual(4); // ToDo: do not use a hard coded value
    });
    
    it("should return empty array if no movies match", () => {
      const result = actorData.getActorsByMovie("not a valid movie");
      expect(result.length).toEqual(0); // ToDo: do not use a hard coded value
    });
  });
  
});