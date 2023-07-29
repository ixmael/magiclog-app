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
  const uriConnection: string | any = process.env.REPOSITORY_CONNECTION;
  if (!uriConnection) {
    throw new Error('There is not the URI string to establish the connection');
  }

  const connection: mysql.Connection = await mysql.createConnection(uriConnection);

  return {
    userRepository: UserRepository(connection, services),
    productRepository: ProductRepository(connection, services),
    close: () => {
      connection.end();
    },
  } as RepositoriesServices;
};

export default initRepositories;
