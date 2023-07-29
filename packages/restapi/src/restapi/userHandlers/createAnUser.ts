import express from 'express';

import { UserType } from '@/core/domain/user/user';
import {
  InvalidUserDataError,
  EmailExistsError,
} from '../../core/domain/user/errors';

import { APIServices } from 'types';

/**
 * Create a new user
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const createAnUser = async (request: express.Request, response: express.Response) => {
  const requestUserData = request.body;

  // Validate request data: has an email, password and password to match
  if (!(requestUserData.hasOwnProperty('email')
    && requestUserData.hasOwnProperty('password')
    && requestUserData.hasOwnProperty('passwordToMatch'))) {
    response
      .status(400)
      .json({
        message: 'The json data is not valid',
      });

    return;
  }

  // Validate that the passwords match
  if (requestUserData.password !== requestUserData.passwordToMatch) {
    response
      .status(400)
      .json({
        message: 'The password is invalid',
      });

    return;
  }

  // Get the services
  const services: APIServices = request.app.get('services');

  // Create a new user
  const userWasCreated: UserType | null = await services
    .userService
    .createANewUser(requestUserData.email, requestUserData.password)
    .catch((err) => {
      // There is an error with the data
      if (err instanceof InvalidUserDataError
        || err instanceof EmailExistsError) {
        response
          .status(400)
          .json({
            message: 'The data is invalid',
          });
      } else {
        // An unknown error
        response
          .status(500)
          .json({
            message: 'internal error',
          });
      }

      return null;
    });

  if (userWasCreated) {
    response
      .status(201)
      .json({
        message: `The user with the email '${userWasCreated.email} was created'`,
      });
  } else {
    response
      .status(500)
      .json({
        message: 'An unknown error occurred'
      });
  }
};

export default createAnUser;
