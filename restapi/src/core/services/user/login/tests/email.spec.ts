import { assert } from 'chai';

import login from '../';

import initRepositories from '../../../../../services/repositories/inmemory';

import {
  UserType,
} from '../../../../domain/user/user';


import {
  EmailNotExistsError,
  PasswordIsInvalidError,
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

describe('Test login', () => {
  before((done) => {
    initRepositories()
      .then((repositories) => repositories.userRepository)
      .then((repository) => {
        const user: UserType = {
          email: 'usertologin@magiclog.mx',
          passwordHashed: '$2b$11$2C6A0v59.Rqum4llsVf5Veva/IKp.xUmNIc0Fh3eJNiUNSb3THhGW',
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

  after((done) => {
    services = null;
    done();
  });

  it('The email is not registered', async () => {
    try {
      await login('imnotregistered@magiclog.mx', 'asimplepassword', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof EmailNotExistsError);
    }
  });

  it('The password not match', async () => {
    try {
      await login('usertologin@magiclog.mx', 'asimplepassword', services as UserServiceServicesType);

      assert.exists(false); // Not reachable
    } catch (err: any) {
      assert.isTrue(err instanceof PasswordIsInvalidError);
    }
  });

  it('The password match', async () => {
      const user: UserType = await login('usertologin@magiclog.mx', 'ThisAMoreComplicatedPassword', services as UserServiceServicesType);

      assert.equal(user.email, 'usertologin@magiclog.mx');
  });
});
