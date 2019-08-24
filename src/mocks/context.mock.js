
const usersData = require("../data/users");
const actorsData = require("../data/actors");
const moviesData = require("../data/movies");
const directorsData = require("../data/directors");

module.exports = {
  createContext() {
    return {
      auth: {
        user: {},
      },
      data: {
        user: usersData,
        actor: new actorsData.ActorData(),
        movie: new moviesData.MovieData(),
        director: new directorsData.DirectorsData(),
      }
    };
  },
};