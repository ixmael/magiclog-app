import { UserServiceInterface } from './core/domain/user/service';
import { UserRepositoryInterface } from './core/domain/user/repository';

/**
 * Represents the services that the RestAPI requires
 */
export type APIServices = {
  userService: UserServiceInterface;
};

/**
 * Represents the repositories services that the RestAPI requires
 */
export type RepositoriesServices = {
  userRepository: UserRepositoryInterface,
};
