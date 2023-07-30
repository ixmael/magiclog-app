import fs from 'fs/promises';

import {
  ManagerType,
} from '../../../core/domain/manager';

import {
  ManagerRepositoryInterface,
} from '../../../core/domain/manager/repository';

/**
 *
 */
const initManagerRepository = async (): Promise<ManagerRepositoryInterface> => {
  // Read the managers from the file
  const managers = await fs.readFile('./managers.json', { encoding: 'utf-8' })
    .then((data) => {
      return JSON.parse(data.toString());
    });

  return {
    getByEmail: async (email: string): Promise<ManagerType | null> => {
      if (managers.hasOwnProperty(email)) {
        return {
          email,
          hashedPassword: managers[email],
        } as ManagerType;
      } else {
        return null;
      }
    },
  } as ManagerRepositoryInterface;
};

export default initManagerRepository;
