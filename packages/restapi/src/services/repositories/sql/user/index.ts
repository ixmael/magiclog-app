import {
  UserRepositoryInterface,
} from '../../../../core/domain/user/repository';

import {
  UserType,
} from '../../../../core/domain/user/user';

import {
  EmailExistsError,
} from '../../../../core/domain/user/errors';

import getByEmail from './getByEmail';
import storeAnUser from './storeAnUser';

/**
 * Implements the UserRepositoryInterface in memory
 * @param storage
 * @returns a object that implements UserRepositoryInterface
 */
const UserRepository = (connection: any, services: any): UserRepositoryInterface => {
  return {
    getByEmail: (email: string): Promise<UserType | null> => getByEmail(email, connection, services),
    storeAnUser: (user: UserType): Promise<boolean | EmailExistsError | Error> => storeAnUser(user, connection, services),
  } as UserRepositoryInterface;
};

export default UserRepository;
