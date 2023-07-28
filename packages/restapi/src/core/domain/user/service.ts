import { UserType } from './user';

/**
 * This represents the expectation of a UserService implementation
 */
export interface UserServiceInterface {
  createANewUser: (email: string) => Promise<UserType>;
}
