const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Movie {
    title: String
    year: Int
    rating: Float
    scoutbase_rating: String @auth
    actors: [Actor]
  }
`;

const resolvers = {
  Movie: {
    scoutbase_rating() {
      // random string between 5.0-9.0
      return Math.floor(Math.random() * (90 - 50) + 50)/10;
    },
    actors(movie, args, context) {
      return context.data.actor.getActorsByMovie(movie.title);
    }
  },
};

module.exports = {
  typeDef,
  resolvers,
};