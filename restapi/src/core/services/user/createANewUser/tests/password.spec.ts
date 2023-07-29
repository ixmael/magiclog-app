import { assert } from 'chai';

import createANewUser from '../';

import initRepositories from '../../../../../services/repositories/inmemory';

import {
  InvalidUserDataError,
  EmailExistsError,
} from '../../../../domain/user/errors';

import { UserServiceServicesType } from '../../index';

let services: UserServiceServicesType | null = null;
const logger = {
  fatal: (message: string) => { },
  error: (message: string) => { },
  warn: (message: string) => { },
  info: (message: string) => { },
  debug: (message: string) => { },
  trace: (message: string) => { },
};

describe('Test create a new user: the password', () => {
  before((done) => {
    initRepositories(null)
      .then((repositories) => repositories.userRepository)
      .then((repository) => {
        services = {
          repository,
          logger,
        } as UserServiceServicesType;

        done();
      });
  });

  after((done) => {
    services = null;
    done();
  });

  it('The password is empty', async () => {
    try {
      await createANewUser('test@magiclog.mx', '', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof InvalidUserDataError);
    }
  });

  // @TODO: wait for password rules
});
