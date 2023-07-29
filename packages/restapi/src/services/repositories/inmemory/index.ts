import { UserType } from '../../../core/domain/user/user';

import { RepositoriesServices } from '../../../types';

import UserRepositoryInMemory from './user';
import ProductRepositoryInMemory from './product';
import { ProductType } from '@/core/domain/product';

const userStorage = new Map<string, UserType>();
const productStorage = new Array<ProductType>();

/**
 * This initialize the repositories required
 * @returns RepositoriesServices
 */
const initRepositories = async (): Promise<RepositoriesServices> => {
  return {
    userRepository: UserRepositoryInMemory(userStorage),
    productRepository: ProductRepositoryInMemory(productStorage),
  } as RepositoriesServices;
};

export default initRepositories;
