const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Query {
    title: String
    year: Int
    rating: Float
    actors: [Actor]
  }
`;

module.exports = {
  typeDef,
}