import mysql from 'mysql2/promise';
import {
  UserType,
} from '../../../../core/domain/user/user';

import {
  EmailExistsError,
} from '../../../../core/domain/user/errors';

/**
 * Save an user in the storage
 * @param user
 * @param storage
 * @returns a boolean that represents if the user has stored or not
 */
const storeAnUser = async (user: UserType, connection: mysql.Connection, services: any): Promise<boolean | EmailExistsError | Error> => {
  return await connection
    .execute('INSERT INTO sellers(id,email,hashed_password,created_at) VALUES (?,?,?,?)', [user.id, user.email, user.passwordHashed, user.createdAt])
    .then(() => true)
    .catch((err: TypeError) => {
      services.logger.error(err);
      // Determining if the error is because the email exists
      if (err.message.includes('sellers.email_UNIQUE')) {
        return new EmailExistsError('The email was registered');
      }

      return err;
    });
};

export default storeAnUser;
