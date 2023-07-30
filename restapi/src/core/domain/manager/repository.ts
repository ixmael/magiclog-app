import {
  ManagerType,
} from './';

/**
 * This represents the expectation of a ManagerRepository implementation
 */
export interface ManagerRepositoryInterface {
  getByEmail: (email: string) => Promise<ManagerType | null>;
}
