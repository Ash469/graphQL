import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
import prisma from './lib/db.js';
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
      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean!
      }
      type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
      }
    `,
    //actual functions for graphql
    resolvers: {
      Query: {
        hello: () => 'Hello from GraphQL Server!',
        say: (_, { name }) => `Hello, ${name}!`
      },
      Mutation:{
        createUser: async (_, { firstName, lastName, email, password }:{
          firstName:string;lastName:string;email:string;password:string;
        }) => {
          await prisma.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: 'random_salt_value' // In a real application, ensure to hash the password before storing it
            },
          });
          return true;
        }
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
