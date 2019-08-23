const { gql } = require("apollo-server-express");

const directorsData = require("../data/directors");

const typeDef = gql`
  type Actor {
    name: String
    birthday: Date
    country: String
    " should directors not be part of the Movie? "
    directors: [Director]
  }
`;

const resolvers = {
  Actor: {
    directors(actor) {
      // return directors for all movies the actor had a role
      return directorsData.getDirectors()
        .filter((director) => {
          const moviesWorkedTogether = director.movies.filter((movie) => (actor.movies.includes(movie)));
          return moviesWorkedTogether.length > 0;
        });
    }
  }
};

module.exports = {
  typeDef,
  resolvers,
};