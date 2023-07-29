import mysql from 'mysql2/promise';

import {
  RepositoriesServices,
} from '../../../types';

import UserRepository from './user';
import ProductRepository from './product';

/**
 * This initialize the repositories required
 * @returns RepositoriesServices
 */
const initRepositories = async (services: any): Promise<RepositoriesServices> => {
  const connection: mysql.Connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'magiclog',
  });

  return {
    userRepository: UserRepository(connection, services),
    productRepository: ProductRepository(connection, services),
    close: () => {
      connection.end();
    },
  } as RepositoriesServices;
};

export default initRepositories;
