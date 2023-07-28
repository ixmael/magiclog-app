import UserService from './core/services/user';

import initRepositories from './services/repositories/inmemory';

import { APIServices, RepositoriesServices } from './types';

/**
 * Init the services required by the app
 * @returns the services required for the app
 */
const initializeServices = async (): Promise<APIServices> => {
  // Init the repositories
  const repositories: RepositoriesServices = await initRepositories();

  // Prepare the services
  const userService = UserService(repositories.userRepository);

  return {
    userService,
  } as APIServices;
};

export default initializeServices;
