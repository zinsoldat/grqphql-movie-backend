
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
      model: {
        user: usersData,
        actor: actorsData,
        movie: moviesData,
        director: directorsData,
      }
    };
  },
};