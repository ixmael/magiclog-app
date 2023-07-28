import bcrypt from 'bcrypt';

import { UserType } from '../../../domain/user/user';

import {
  InvalidUserDataError,
  EmailExistsError,
} from '../../../domain/user/errors';

import { UserServiceServicesType } from '../index';

/**
 * This create a new user
 * @param email
 * @param userRepository
 * @returns a UserType
 */
const createANewUser = async (email: string, plainPassword: string, services: UserServiceServicesType): Promise<UserType> => {
  // Check if the email has a valid email format
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!regexEmail.test(email)) {
    const message = `The email '${email}' is not valid`;
    services.logger.error(message);
    return Promise.reject(new InvalidUserDataError(message));
  }

  // Validate password
  // @TODO: validate if the password is strong
  if (plainPassword === '') {
    const message = `The password for the '${email}' is not valid`;
    services.logger.error(message);
    return Promise.reject(new InvalidUserDataError(message));
  }

  // Rule: If the email exists, this email cannot created a new user
  const existedUser = await services.repository.getByEmail(email);
  if (existedUser) {
    const message = `The email '${email}' was registered`;
    services.logger.error(message);
    return Promise.reject(new EmailExistsError(message));
  }

  const passwordHashed: string = await bcrypt
    .genSalt(10)
    .then((salt: any) => bcrypt.hash(plainPassword, salt))
    .then((hash: any) => hash)
    .catch((err: any) => services.logger.error(err));

  // Prepare the user
  const user: UserType = {
    email,
    passwordHashed,
  } as UserType;

  // Store the user in the repository
  const userWasStored = await services.repository.storeAnUser(user);
  if (!userWasStored) {
    const message = `The user with the email '${email}' cannot be stored`;
    services.logger.error(message);
    return Promise.reject(new Error(message));
  }

  return user;
};

export default createANewUser;
