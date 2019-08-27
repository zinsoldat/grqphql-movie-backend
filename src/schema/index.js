const { gql } = require("apollo-server-express");

const actor = require("./types/actor");
const director = require("./types/director");
const movie = require("./types/movie");
const user = require("./types/user");
const date = require("./types/date");

const { AuthDirective } = require("./directives/auth");

const typeDef = gql`
  directive @auth on FIELD_DEFINITION
  
  type Query {
    movies: [Movie]
  }
`;

const resolvers = {
  Query: {
    movies(parent, args, context) {
      return context.data.movie.getMovies();
    },
  },
};

module.exports = {
  typeDefs: [
    actor.typeDef,
    director.typeDef,
    movie.typeDef,
    user.typeDef,
    date.typeDef,
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
    date.resolvers,
    user.resolvers
  ),
};