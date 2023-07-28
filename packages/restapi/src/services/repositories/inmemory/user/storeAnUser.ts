import { UserType } from '../../../../core/domain/user/user';

/**
 * Save an user in the storage
 * @param user
 * @param storage
 * @returns a boolean that represents if the user has stored or not
 */
const storeAnUser = async (user: UserType, storage: Map<string, UserType>): Promise<boolean> => {
    let isStored: boolean = false;

    if (!storage.has(user.email)) {
        storage.set(user.email, user);
        isStored = true;
    }

    return isStored;
};

export default storeAnUser;
