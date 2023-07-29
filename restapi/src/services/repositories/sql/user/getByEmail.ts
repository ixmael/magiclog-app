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
const getByEmail = async (email: string, connection: any, services: any): Promise<UserType | null> => {
  return await connection
    .execute('SELECT * FROM sellers WHERE email = ? LIMIT 1', [email])
    .then((rows: Array<any>) => {
      // Check if the results has one item
      if (rows[0].length === 1) {
        return {
          id: rows[0][0].id,
          email: rows[0][0].email,
          passwordHashed: rows[0][0].hashed_password,
          createdAt: rows[0][0].created_at,
        } as UserType;
      } else {
        return null;
      }
    })
    .catch((err: TypeError) => {
      services.logger.error(err);
      return null;
    });
};

export default getByEmail;
