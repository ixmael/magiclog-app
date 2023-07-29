import pino from 'pino';

import UserService, {
  UserServiceServicesType,
} from './core/services/user';

import sqlInitRepositories from './services/repositories/sql';
import inmemoryInitRepositories from './services/repositories/inmemory';

import {
  APIServices,
  RepositoriesServices,
} from './types';

import ProductService, {
  ProductServiceServicesType,
} from './core/services/product';

/**
 * Init the services required by the app
 * @returns the services required for the app
 */
const initializeServices = async (): Promise<APIServices> => {
  // Start the logger service
  const logger = pino();

  // Init the repositories
  let repositories: RepositoriesServices;
  if (process.env.REPOSITORY === 'sql') {
    repositories = await sqlInitRepositories({
      logger,
    });
  } else {
    repositories = await inmemoryInitRepositories({
      logger,
    });
  }

  // Prepare the services
  const userRequiredServices: UserServiceServicesType = {
    repository: repositories.userRepository,
    logger: logger,
  } as UserServiceServicesType;
  const userService = UserService(userRequiredServices);

  const productRequiredServices: ProductServiceServicesType = {
    repository: repositories.productRepository,
    logger: logger,
  } as ProductServiceServicesType;
  const productService = ProductService(productRequiredServices);

  return {
    logger,
    productService,
    userService,
    close: () => {
      console.log('closea');
      if (repositories.close) {
        console.log('closeb');
        repositories.close();
        console.log('closec');
      }
    },
  } as APIServices;
};

export default initializeServices;
