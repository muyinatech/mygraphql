const express = require('express');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');

const app = express();

// The GraphQL schema in string form
const typeDefs = require('./typeDefs');

// The resolvers
const resolvers = require('./resolvers');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: 'http://localhost:4000/graphql',
    settings: {
      'editor.theme': 'light',
    },
  },
  cacheControl: {
    defaultMaxAge: 600,
  },
});

apolloServer.applyMiddleware({
  app,
});

app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphql to run queries!');
});
