import { compareSync } from 'bcrypt';

import {
  ManagerType,
} from '../../domain/manager';
import {
  NotExistsManagerError,
  InvalidPasswordManagerError,
} from '../../domain/manager/errors';

/**
 *
 * @param email
 * @param plainPassword
 * @param services
 */
const login = async (email: string, plainPassword: string, services: any): Promise<ManagerType> => {
  const manager: ManagerType | null = await services.repository.getByEmail(email);
  if (!manager) {
    const message = `The email '${email}' is not registered as manager`;
    services.logger.error(message);
    return Promise.reject(new NotExistsManagerError(message));
  }

  // Check the password
  if (!compareSync(plainPassword, manager.hashedPassword)) {
    const message = 'The manager password is incorrect';
    services.logger.error(message);
    return Promise.reject(new InvalidPasswordManagerError(message));
  }

  return manager;
};

export default login;
