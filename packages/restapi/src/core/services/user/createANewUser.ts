import { UserType } from '../../domain/user/user';
import { UserRepositoryInterface } from '../../domain/user/repository';

/**
 * This create a new user
 * @param email
 * @param userRepository
 * @returns a UserType
 */
const createANewUser = async (email: string, userRepository: UserRepositoryInterface): Promise<UserType> => {
  // Rule: If the email exists, this email cannot created a new user
  const existedUser = await userRepository.getByEmail(email);
  if (!existedUser) {
    throw new Error('The email was registered');
  }

  // Prepare the user
  const user: UserType = {
    email,
  } as UserType;

  // Store the user in the repository
  const userWasStored = await userRepository.storeAnUser(user);
  if (!userWasStored) {
    throw new Error(`The user with the email '${email}' cannot be stored`);
  }

  return user;
};

export default createANewUser;
