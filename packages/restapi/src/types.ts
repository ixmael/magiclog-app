import { UserServiceInterface } from './core/domain/user/service';
import { UserRepositoryInterface } from './core/domain/user/repository';
import { ProductRepositoryInterface } from './core/domain/product/repository';

import { ProductServiceInterface } from './core/domain/product/service';

/**
 * Represents the services that the RestAPI requires
 */
export type APIServices = {
  logger: any;
  productService: ProductServiceInterface;
  userService: UserServiceInterface;
};

/**
 * Represents the repositories services that the RestAPI requires
 */
export type RepositoriesServices = {
  userRepository: UserRepositoryInterface,
  productRepository: ProductRepositoryInterface,
};
