import { assert } from 'chai';

import createANewUser from '../';

import initRepositories from '../../../../../services/repositories/inmemory';

import {
  EmailExistsError,
} from '../../../../domain/user/errors';

import { UserServiceServicesType } from '../../index';
import { UserType } from '../../../../domain/user/user';

let services: UserServiceServicesType | null = null;
const logger = {
  fatal: (message: string) => { },
  error: (message: string) => { },
  warn: (message: string) => { },
  info: (message: string) => { },
  debug: (message: string) => { },
  trace: (message: string) => { },
};

describe('Test the users', () => {
  before((done) => {
    initRepositories()
      .then((repositories) => repositories.userRepository)
      .then((repository) => {
        const user: UserType = {
          email: 'exists@magiclog.mx',
          passwordHashed: 'thisisnotimportanttothistest',
        } as UserType;
        repository.storeAnUser(user);

        return repository;
      })
      .then((repository) => {
        services = {
          repository,
          logger,
        } as UserServiceServicesType;

        done();
      });
  });

  it('The user exists in the repository', async () => {
    try {
      await createANewUser('exists@magiclog.mx', 'avalidplainpassword', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof EmailExistsError);
    }
  });
});
