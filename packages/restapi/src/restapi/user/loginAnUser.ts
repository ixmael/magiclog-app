import express from 'express';
import jwt from 'jsonwebtoken';

import {
  PublicUserType,
} from '@/core/domain/user/user';

import {
  EmailNotExistsError,
  PasswordIsInvalidError,
} from '../../core/domain/user/errors';

import {
  APIServices,
} from 'types';

/**
 * Login an user and provide the token
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const loginAnUser = async (request: express.Request, response: express.Response) => {
  const requestLoginUser = request.body;

  // Validate request data: has an email, password and password to match
  if (!(requestLoginUser.hasOwnProperty('email')
    && requestLoginUser.hasOwnProperty('password'))) {
    response
      .status(400)
      .json({
        message: 'The json data is invalid',
      });

    return;
  }

  // Get the services
  const services: APIServices = request.app.get('services');

  // Create a new user
  const userLogged: PublicUserType | null = await services
    .userService
    .login(requestLoginUser.email, requestLoginUser.password)
    .catch((err) => {
      console.log('orror', err);
      // There is an error with the data
      if (err instanceof EmailNotExistsError) {
        response
          .status(400)
          .json({
            message: 'The email is not registered',
          });
      } else if (err instanceof PasswordIsInvalidError) {
        response
          .status(400)
          .json({
            message: 'The password is invalid',
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

  if (userLogged) {
    // Generate the JWT
    const accessToken = jwt.sign(userLogged,
      process.env.RESTAPI_TOKEN as string,
      {
        expiresIn: '3600s',
      });

    return response
      .header('auth-token', accessToken)
      .status(200)
      .json({
        payload: {
          token: accessToken,
        },
      });
  }
};

export default loginAnUser;
