const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const actor = require("./actor");
const director = require("./director");
const movie = require("./movie");
const movieData = require("../data/movies");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Query {
    movies: [Movie]
  }
  
  scalar Date
`;

const resolvers = {
  Query: {
    movies() {
      return movieData.getMovies();
    },
  },
};

module.exports = {
  typeDefs: [
    actor.typeDef,
    director.typeDef,
    movie.typeDef,
    typeDef,
  ],
  resolvers: Object.assign(resolvers, movie.resolvers, actor.resolvers),
};