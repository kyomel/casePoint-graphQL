'use strict'

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const port = process.env.port || 3000
const { typeDefs, resolvers } = require('./src/graphql/index');
const app = express();
app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: {
      settings: {
        'schema.polling.enable': false,
      },
    },
});
apolloServer.applyMiddleware({ app, path: '/v1/api'});  

app.get('/', (req, res) => {
    res.send('Welcome to the server!!!')
})

app.listen(port, () => {
    console.log(`Server Start at ${Date()}`);
    console.log(`Listening at http://localhost:${port}`);
})