
const UsersData = require("../data/users");
const ActorsData = require("../data/actors");
const MoviesData = require("../data/movies");
const DirectorsData = require("../data/directors");

module.exports = {
  createContext() {
    return {
      auth: {
        user: {},
      },
      data: {
        user: new UsersData(),
        actor: new ActorsData(),
        movie: new MoviesData(),
        director: new DirectorsData(),
      }
    };
  },
};