import bcrypt from 'bcryptjs';
import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';
import { loginError, emailNotConfirmed } from './errorMessage';

const errorLogin = [
  {
    path: "email",
    message: loginError
  }
];
const errorConfirm = [
  {
    path: "email",
    message: emailNotConfirmed
  }
];


export const resolvers: ResolverMap = {
  Query: {
    dummyLogin: () => 'dummy Login need to fix',
  },
  Mutation: {
    loginUser: async (_, { email, password }: GQL.ILoginUserOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });
      if (!user) { return errorLogin; }
      if (!user.comfirmEmail) { return errorConfirm; }
      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) { return errorLogin; }
      return null;
    }
  }
}