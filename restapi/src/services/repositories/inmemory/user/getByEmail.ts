import {
  UserType,
} from '../../../../core/domain/user/user';

/**
 * Fetch the user with the email given
 * @param email
 * @param storage
 * @returns a UserType
 * @throws an error if the email not exists in the storage
 */
const getByEmail = async (email: string, storage: Array<UserType>): Promise<UserType | null> => {
  let user: UserType | null = null;

  const userSearched: UserType | undefined = storage.find((user) => user.email === email);
  if (userSearched) {
    user = userSearched;
  }

  return user;
};

export default getByEmail;
