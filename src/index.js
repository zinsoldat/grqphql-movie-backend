const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const schema = require("./schema/index");
const UsersData = require("./data/users");
const ActorsData = require("./data/actors");
const MoviesData = require("./data/movies");
const DirectorsData = require("./data/directors");
const user = new UsersData();
const server = new ApolloServer({ 
  // typeDefs: schema.typeDefs, 
  // resolvers: schema.resolvers,
  schema: makeExecutableSchema(schema),
  context: ({ req }) => ({
    auth: {
      user: getAuthenticatedUser(req.headers.authorization),
    },
    data: {
      user,
      actor: new ActorsData(),
      movie: new MoviesData(),
      director: new DirectorsData(),
    }
  }),
});
const app = express();
server.applyMiddleware({ app });

function getAuthenticatedUser(authHeader) {
  let user = null;
  if(authHeader) {
    const token = authHeader.substr("Bearer ".length);
    try {
      user = user.getUserByToken(token);
    } catch(error) {
      // do net set a user
    }
  }
  return user;
}

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);