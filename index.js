// const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@as-integrations/express5");
// const cors = require("cors");
// const axios = require("axios");

// async function startServer() {
//   const app = express();

//   const server = new ApolloServer({
//     typeDefs: `
//       type User {
//         id: ID!
//         name: String!
//         email: String!
//         username: String!
//         phone: String!
//         website: String!
//       }

//       type Todo {
//         id: ID!
//         title: String!
//         completed: Boolean!
//         userId: ID!
//         user: User      
//       }

//       type Query {
//         getTodos: [Todo!]!
//         getAllUsers: [User!]!
//         getUser(id: ID!): User
//       }
//     `,
//     resolvers: {
//       Query: {
//         getTodos: async () => {
//           const { data } = await axios.get(
//             "https://jsonplaceholder.typicode.com/todos"
//           );
//           return data;
//         },
//         getAllUsers: async () => {
//           const { data } = await axios.get(
//             "https://jsonplaceholder.typicode.com/users"
//           );
//           return data;
//         },
//         getUser: async (_, { id }) => {
//           const { data } = await axios.get(
//             `https://jsonplaceholder.typicode.com/users/${id}`
//           );
//           return data;
//         },
//       },
//       Todo: {
//         user: async (parent) => {
//           const { data } = await axios.get(
//             `https://jsonplaceholder.typicode.com/users/${parent.userId}`
//           );
//           return data;
//         },
//       },
//     },
//   });

//   await server.start();

//   app.use(cors());
//   app.use(express.json());
//   app.use("/graphql", expressMiddleware(server));

//   app.listen(4000, () => {
//     console.log("🚀 Server running at http://localhost:4000/graphql");
//   });
// }

// startServer();
