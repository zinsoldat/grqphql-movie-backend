const { gql } = require("apollo-server-express");

const actorsData = require("../data/actors");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Movie {
    title: String
    year: Int
    rating: Float
    actors: [Actor]
  }
`;

const resolvers = {
  Movie: {
    actors(movie) {
      return actorsData.getActors()
        .filter((actor) => (actor.movies.includes(movie.title)));
    }
  },
};

module.exports = {
  typeDef,
  resolvers,
};