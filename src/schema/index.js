const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const actor = require("./actor");
const director = require("./director");
const movie = require("./movie");
const movieData = require("../data/movies");

const dateScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date formatted as ISO string",
  serialize(value) {
    if(value instanceof Date) {
      return value.toISOString();
    }
    return null;
  },
  parseValue(value) {
    if(typeof value === "string") {
      const parsedValue = new Date(value);
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return null;
  },
  parseLiteral(ast) {
    if(ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

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
  Date: dateScalarType,
};

module.exports = {
  typeDefs: [
    actor.typeDef,
    director.typeDef,
    movie.typeDef,
    typeDef,
  ],
  resolvers: Object.assign(resolvers, movie.resolvers, actor.resolvers, director.resolvers),
};