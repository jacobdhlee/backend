import bcrypt from 'bcryptjs';
import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => 'dummy need to fix',
  },
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments) => {
      const { email, password, firstName, lastName } = args;

      const emailExist = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (emailExist) {
        return [
          {
            path: "email",
            message: "email has already exists!!"
          }
        ];
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });
      await user.save();

      return null;
    }
  }
}