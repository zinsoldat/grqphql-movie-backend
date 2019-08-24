const DirectorsData = require("./directors");
const MoviesData = require("./movies");

describe("directors test", () => {
  let directorData;
  let moviesData;
  beforeEach(() => {
    directorData = new DirectorsData();
    moviesData = new MoviesData();
  });
  describe("getDirectors", () => {
    it("should return all directors", () => {
      const result = directorData.getDirectors();
      expect(result.length).toEqual(3); // ToDo: do not use a hard coded value
    });
  });
  
  describe("getDirectorsByTitles", () => {
    it("should return all directors", () => {
      const directors = directorData.getDirectors();
      const result = directorData.getDirectorsByNames(directors.map((director) => director.name));
      expect(result.length).toEqual(directors.length);
      for(let i = 0; i < directors.length; i++) {
        expect(result[i].name).toEqual(directors[i].name);
        expect(result[i].birthday).toEqual(directors[i].birthday);
      }
    });
  });
  
  describe("getDirector", () => {
    it("should return an existing director", () => {
      const director = directorData.getDirectors()[0];
      const result = directorData.getDirector(director.name);
      expect(result.name).toEqual(director.name);
      expect(result.birthday).toEqual(director.birthday);
    });
    
    it("should throw an error if the director does not exist", () => {
      try {
        directorData.getDirector("not a valid director");
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
  describe("getDirectorsByMovie", () => {
    
    it("should return all directors", () => {
      const movie = moviesData.getMovies()[0];
      const result = directorData.getDirectorsByMovie(movie.title);
      expect(result.length).toEqual(1); // ToDo: do not use a hard coded value
    });
    
    it("should return empty array if no movies match", () => {
      const result = directorData.getDirectorsByMovie("not a valid movie");
      expect(result.length).toEqual(0); // ToDo: do not use a hard coded value
    });
  });
  
  describe("getDirectorsByMovies", () => {
    
    it("should return all directors", () => {
      const movies = moviesData.getMovies();
      const result = directorData.getDirectorsByMovies(movies.map((movie) => movie.title));
      expect(result.length).toEqual(directorData.getDirectors().length);
    });
    
    it("should return empty array if no movies match", () => {
      const result = directorData.getDirectorsByMovie([]);
      expect(result.length).toEqual(0); // ToDo: do not use a hard coded value
    });
  });
});