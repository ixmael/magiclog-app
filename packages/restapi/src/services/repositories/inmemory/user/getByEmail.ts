import { UserType } from '../../../../core/domain/user/user';

/**
 * Fetch the user with the email given
 * @param email
 * @param storage
 * @returns a UserType
 * @throws an error if the email not exists in the storage
 */
const getByEmail = async (email: string, storage: Map<string, UserType>): Promise<UserType> => {
    if (!storage.has(email)) {
        throw new Error('The user not exists');
    }

    return storage.get(email) as UserType;
};

export default getByEmail;
