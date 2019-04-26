import bcrypt from 'bcryptjs';
import * as yup from 'yup';
import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';
import { formatError } from '../../utils/formatError';
import { emailExistErr } from './errorMessage';
import { confirmEmailLink } from '../../utils/confirmEmailLink';

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(7).max(200),
  firstName: yup.string(),
  lastName: yup.string()
});

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => 'dummy need to fix',
  },
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments, { redis, url }) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatError(err);
      }

      const { email, password, firstName, lastName } = args;
      const emailExist = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (emailExist) {
        return [
          {
            path: "email",
            message: emailExistErr
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
      const link = await confirmEmailLink(url, user.id, redis)
      return null;
    }
  }
}