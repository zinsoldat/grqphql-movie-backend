const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Author {
    name: String
    birthday: Date
    country: String
    directors: [Director]
  }
`;

const resolvers = {
  
}

module.exports = {
  typeDef,
}