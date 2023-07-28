import pino from 'pino';

import UserService, { UserServiceServicesType } from './core/services/user';

import initRepositories from './services/repositories/inmemory';

import { APIServices, RepositoriesServices } from './types';

/**
 * Init the services required by the app
 * @returns the services required for the app
 */
const initializeServices = async (): Promise<APIServices> => {
  // Start the logger service
  const logger = pino();

  // Init the repositories
  const repositories: RepositoriesServices = await initRepositories();

  // Prepare the services
  const userRequiredServices: UserServiceServicesType = {
    repository: repositories.userRepository,
    logger: logger,
  } as UserServiceServicesType;
  const userService = UserService(userRequiredServices);

  return {
    userService,
    logger,
  } as APIServices;
};

export default initializeServices;
