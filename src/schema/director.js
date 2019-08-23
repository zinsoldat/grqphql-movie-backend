const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
  type Director {
    name: String
    birthday: Date
    country: String
  }
`;

const resolvers = {
  Director: {
    birthday(director) {
      // return directors for all movies the actor had a role
      return  director.birthday.toISOString();
    }
  }
};

module.exports = {
  typeDef,
};