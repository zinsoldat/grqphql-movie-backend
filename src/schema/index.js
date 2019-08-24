const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const actor = require("./actor");
const director = require("./director");
const movie = require("./movie");
const user = require("./user");

const { AuthDirective } = require("../directives/auth");

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

const typeDef = gql`
  directive @auth on FIELD_DEFINITION

  scalar Date
  
  type Query {
    movies: [Movie]
  }
`;

const resolvers = {
  Query: {
    movies(parent, args, context) {
      return context.model.movie.getMovies();
    },
  },
  Date: dateScalarType,
};



module.exports = {
  typeDefs: [
    actor.typeDef,
    director.typeDef,
    movie.typeDef,
    user.typeDef,
    typeDef,
  ],
  schemaDirectives: {
    auth: AuthDirective
  },
  resolvers: Object.assign(
    resolvers,
    movie.resolvers, 
    actor.resolvers, 
    director.resolvers,
    user.resolvers
  ),
};