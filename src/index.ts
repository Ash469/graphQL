import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
// import cors from 'cors';

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(bodyParser.json());
  // app.use(cors());

  const gqlServer = new ApolloServer({
    //schema layer 
    typeDefs: `
      type Query {
        hello: String
        say(name: String!): String
      }
    `,
    //actual functions for graphql
    resolvers: {
      Query: {
        hello: () => 'Hello from GraphQL Server!',
        say: (_, { name }) => `Hello, ${name}!`
      }
    }
  });

  await gqlServer.start();
  app.use('/graphql', expressMiddleware(gqlServer));

  // A simple REST endpoint
  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running!' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint is at http://localhost:${PORT}/graphql`);
  });
}

init();
