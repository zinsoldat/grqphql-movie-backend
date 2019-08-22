const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Query {
    name: String
    birthday: Date
    country: String
  }
`;

module.exports = {
  typeDef,
}