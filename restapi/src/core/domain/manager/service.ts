import {
  ManagerType,
} from './';

/**
 * This represents the expectation of a ManagerService implementation
 */
export interface ManagerServiceInterface {
  login: (email: string, plainPassword: string) => Promise<ManagerType>;
}
