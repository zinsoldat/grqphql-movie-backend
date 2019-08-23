const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema/index");
const usersData = require("./data/users");
const actorsData = require("./data/actors");
const moviesData = require("./data/movies");
const directorsData = require("./data/directors");

const server = new ApolloServer({ 
  typeDefs: schema.typeDefs, 
  resolvers: schema.resolvers,
  context: ({ req }) => ({
    auth: {
      user: {},
    },
    model: {
      user: usersData,
      actor: actorsData,
      movie: moviesData,
      director: directorsData,
    }
  }),
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);