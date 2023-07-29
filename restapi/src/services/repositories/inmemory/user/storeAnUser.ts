import {
  UserType,
} from '../../../../core/domain/user/user';

/**
 * Save an user in the storage
 * @param user
 * @param storage
 * @returns a boolean that represents if the user has stored or not
 */
const storeAnUser = async (user: UserType, storage: Array<UserType>): Promise<boolean> => {
  let isStored: boolean = false;

  const isUserStored: UserType | undefined = storage.find((userStored) => user.email === userStored.email);

  if (!isUserStored) {
    storage.push(user);
    isStored = true;
  }

  return isStored;
};

export default storeAnUser;
