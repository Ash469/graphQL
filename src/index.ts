import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
import cors from 'cors';
import createApolloServer from './graphQL/index.js';
import UserService from './services/user.js';

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(cors());
  app.use(bodyParser.json());

  // A simple REST endpoint
  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running!' });
  });
  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(await createApolloServer(), {
    context: async ({ req }) => {
      const token = req.headers.authorization;
      try {
        if (token) {
          const user = UserService.decodeJWTToken(token);
          return { user };
        }
        return {};
      } catch (error) {
        return {};
      }
    }
  }));

  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint is at http://localhost:${PORT}/graphql`);
  });
}

init();
