const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

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
  scalar Date
`;

const resolvers = {
  Date: dateScalarType,
};

module.exports = {
  typeDef,
  resolvers,
};