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

describe('Test the email', () => {
  before((done) => {
    initRepositories()
      .then((repositories) => repositories.userRepository)
      .then((repository) => {
        services = {
          repository,
          logger,
        } as UserServiceServicesType;

        done();
      });
  });

  it('The email is empty', async () => {
    try {
      await createANewUser('', '', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof InvalidUserDataError);
    }
  });

  it('The email parameter is a text', async () => {
    try {
      await createANewUser('this is not an email', '', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof InvalidUserDataError);
    }
  });

  it('The email parameter is an URL', async () => {
    try {
      await createANewUser('http://localhost', '', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof InvalidUserDataError);
    }
  });
});
