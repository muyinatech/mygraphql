const express = require('express');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');

const app = express();

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

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
