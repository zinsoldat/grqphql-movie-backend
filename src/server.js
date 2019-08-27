const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const schema = require("./schema/index");
const UsersData = require("./data/users");
const ActorsData = require("./data/actors");
const MoviesData = require("./data/movies");
const DirectorsData = require("./data/directors");

const userData = new UsersData();

function getAuthenticatedUser(authHeader) {
  let user = null;
  if(authHeader) {
    const token = authHeader.substr("Bearer ".length);
    try {
      user = userData.getUserByToken(token);
    } catch(error) {
      // do net set a user
    }
  }
  return user;
}

let app;
let server;
function start(serverConfig) {
  const apolloServer = new ApolloServer({ 
    // typeDefs: schema.typeDefs, 
    // resolvers: schema.resolvers,
    schema: makeExecutableSchema(schema),
    context ({ req }){
      return {
        auth: {
          user: getAuthenticatedUser(req.headers.authorization),
        },
        data: {
          user: userData,
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
  app = express();
  apolloServer.applyMiddleware({ 
    app, 
    async onHealthCheck () {
      return true;
    },
  });
  
  
  server = app.listen({ port: serverConfig.port }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(
      `Try your health check at: ${server.graphqlPath}.well-known/apollo/server-health`,
    );
    addShutdownHandlers();
  });
  
}

// Do graceful shutdown
function shutdown() {
  console.log("graceful shutdown express");
  server.close(function () {
    console.log("Closed server");
  });
}

function addShutdownHandlers() {
  //do something when app is closing
  process.on("exit", shutdown);

  //catches ctrl+c event
  process.on("SIGINT", shutdown);

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", shutdown);
  process.on("SIGUSR2", shutdown);
}

module.exports = {
  start,
};