const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Director {
    name: String
    birthday: Date @date
    country: String
  }
`;

const resolvers = {
  Director: {}
};

module.exports = {
  typeDef,
  resolvers,
};