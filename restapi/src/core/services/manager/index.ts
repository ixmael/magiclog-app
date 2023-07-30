import {
  ManagerServiceInterface,
} from '../../domain/manager/service';
import {
  ManagerRepositoryInterface,
} from '../../domain/manager/repository';

import login from './login';

export type ManagerServiceServicesType = {
  repository: ManagerRepositoryInterface;
  logger: any;
};

/**
 * This implements the ManagerServiceInterface
 * @param repository the repository to handle the managers
 * @returns an implementation of the ManagerServiceInterface
 */
const UserService = (services: ManagerServiceServicesType): ManagerServiceInterface => {
  return {
    login: (email: string, plainPassword: string) => login(email, plainPassword, services),
  } as ManagerServiceInterface;
};

export default UserService;
