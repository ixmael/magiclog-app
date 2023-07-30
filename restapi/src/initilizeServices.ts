import fs from 'fs/promises';
import pino from 'pino';

import UserService, {
  UserServiceServicesType,
} from './core/services/user';

import sqlInitRepositories from './services/repositories/sql';
import inmemoryInitRepositories from './services/repositories/inmemory';
import initManagerRepository from './services/repositories/manager';

import ProductService, {
  ProductServiceServicesType,
} from './core/services/product';

import ManagerService, {
  ManagerServiceServicesType,
} from './core/services/manager';

import crypt from './services/utils/crypt';

import {
  APIServices,
  RepositoriesServices,
} from './types';

/**
 * Init the services required by the app
 * @returns the services required for the app
 */
const initializeServices = async (): Promise<APIServices> => {
  // Start the logger service
  const fileTransport = pino.transport({
    target: 'pino/file',
    options: {
      destination: './restapi.log',
    },
  });
  const logger = pino({}, fileTransport);

  // Load the swagger options
  const swaggerOptions = await fs.readFile('./swagger.json', {
    encoding: 'utf-8',
  })
    .then((data) => {
      return JSON.parse(data.toString());
    });

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

  // Init the manager repository
  repositories.managerRepository = await initManagerRepository();

  // Prepare the services
  const userRequiredServices: UserServiceServicesType = {
    repository: repositories.userRepository,
    logger,
    crypt,
  } as UserServiceServicesType;
  const userService = UserService(userRequiredServices);

  const productRequiredServices: ProductServiceServicesType = {
    repository: repositories.productRepository,
    logger,
  } as ProductServiceServicesType;
  const productService = ProductService(productRequiredServices);

  const managerRequiredServices: ManagerServiceServicesType = {
    repository: repositories.managerRepository,
    logger,
  };
  const managerService = ManagerService(managerRequiredServices);

  return {
    logger,
    productService,
    userService,
    managerService,
    swaggerOptions,
    close: async () => {
      if (repositories.close) {
        await repositories.close();
      }

      logger.info('The services are stopped');
    },
  } as APIServices;
};

export default initializeServices;
