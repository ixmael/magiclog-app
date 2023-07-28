import { UserType } from './user';

/**
 * This represents the expectation of a UserRepository implementation
 */
export interface UserRepositoryInterface {
  getByEmail: (email: string) => Promise<UserType | null>;
  storeAnUser: (user: UserType) => Promise<boolean>;
}
