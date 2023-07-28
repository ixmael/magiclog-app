import { UserServiceInterface } from '../../domain/user/service';
import { UserRepositoryInterface } from '../../domain/user/repository';

import createANewUser from './createANewUser';

/**
 * This implements the UserServiceInterface
 * @param repository the repository to handle the users
 * @returns an implementation of the UserServiceInterface
 */
const UserService = (repository: UserRepositoryInterface): UserServiceInterface => {
  return {
    createANewUser: (email: string) => createANewUser(email, repository),
  } as UserServiceInterface;
};

export default UserService;
