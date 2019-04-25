import bcrypt from 'bcryptjs';
import { ResolverMap } from "./types/graphql-utils";
import { User } from './entity/User';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
  },

  Mutation: {
    createUser: async (_, { email, password, firstName, lastName }: GQL.ICreateUserOnMutationArguments) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });
      await user.save();
      return true;
    }
  }
}