const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema/index");

const server = new ApolloServer({ typeDefs: schema.typeDefs, resolvers: schema.resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);