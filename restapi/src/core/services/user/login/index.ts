import { compareSync } from 'bcrypt';

import {
  UserType,
  PublicUserType,
} from '../../../domain/user/user';

import {
  EmailNotExistsError,
  PasswordIsInvalidError,
} from '../../../domain/user/errors';

import {
  UserServiceServicesType,
} from '../index';

/**
 * Login an user
 * @param email
 * @param plainPassword
 * @param userRepository
 * @returns a token
 */
const login = async (email: string, plainPassword: string, services: UserServiceServicesType): Promise<PublicUserType> => {
  // Fetch the user from the repository
  const user: UserType | null = await services.repository.getByEmail(email);
  if (!user) {
    const message = `The email '${email}' is not registered`;
    services.logger.error(message);
    return Promise.reject(new EmailNotExistsError(message));
  }

  // Check the password
  if (!compareSync(plainPassword, user.passwordHashed)) {
    const message = 'The user password is incorrect';
    services.logger.error(message);
    return Promise.reject(new PasswordIsInvalidError(message));
  }

  return {
    id: user.id,
  } as PublicUserType;
};

export default login;
