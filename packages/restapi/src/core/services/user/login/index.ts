import { compareSync } from 'bcrypt';

import {
  UserType,
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
const login = async (email: string, plainPassword: string, services: UserServiceServicesType): Promise<UserType> => {
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

  // Hide the password
  user.passwordHashed = '';

  return user;
};

export default login;
