const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const schema = require("./schema/index");
const UsersData = require("./data/users");
const ActorsData = require("./data/actors");
const MoviesData = require("./data/movies");
const DirectorsData = require("./data/directors");

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

function start(serverConfig) {

  const user = new UsersData();
  const server = new ApolloServer({ 
    // typeDefs: schema.typeDefs, 
    // resolvers: schema.resolvers,
    schema: makeExecutableSchema(schema),
    context ({ req }){
      return {
        auth: {
          user: getAuthenticatedUser(req.headers.authorization),
        },
        data: {
          user,
          actor: new ActorsData(),
          movie: new MoviesData(),
          director: new DirectorsData(),
        }
      };
    },
    debug: process.env.NODE_ENV !== "production",
    playground: process.env.NODE_ENV !== "production",
    tracing: process.env.NODE_ENV !== "production",
  });
  const app = express();
  server.applyMiddleware({ 
    app, 
    async onHealthCheck () {
      return true;
    },
  });
  
  app.listen({ port: serverConfig.port }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(
      `Try your health check at: ${server.graphqlPath}.well-known/apollo/server-health`,
    );
  });
  
}

module.exports = {
  start,
};