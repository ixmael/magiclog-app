import { UserType } from '@/core/domain/user/user';

import { RepositoriesServices } from '../../../types';

import UserRepositoryInMemory from './user';

const userStorage = new Map<string, UserType>();

/**
 * This initialize the repositories required
 * @returns RepositoriesServices
 */
const initRepositories = async (): Promise<RepositoriesServices> => {
  return {
    userRepository: UserRepositoryInMemory(userStorage),
  } as RepositoriesServices;
};

export default initRepositories;
