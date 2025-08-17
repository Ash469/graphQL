// user/index.js
import { mutationTypeDefs } from './mutations.js';
import { userQueries } from './queries.js';
import { userResolvers } from './resolver.js';
import { userTypeDefs } from './typedef.js';

export const User = {
  typeDefs: userTypeDefs,
  queries: userQueries,
  mutations: mutationTypeDefs,
  resolvers: userResolvers,
};

export default User;