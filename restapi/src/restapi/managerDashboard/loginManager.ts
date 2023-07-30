import express from 'express';
import jwt from 'jsonwebtoken';

import {
  ManagerType,
} from '../../core/domain/manager';

import {
  NotExistsManagerError,
  InvalidPasswordManagerError,
} from '../../core/domain/manager/errors';

import {
  APIServices,
} from 'types';

/**
 * Login an user and provide the token
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const loginManager = async (request: express.Request, response: express.Response) => {
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
  const managerLogged: ManagerType | null = await services
    .managerService
    .login(requestLoginUser.email, requestLoginUser.password)
    .catch((err) => {
      console.log('orror', err);
      // There is an error with the data
      if (err instanceof NotExistsManagerError) {
        response
          .status(400)
          .json({
            message: 'The manager is not registered',
          });
      } else if (err instanceof InvalidPasswordManagerError) {
        response
          .status(400)
          .json({
            message: 'The password manager is invalid',
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

  if (managerLogged) {
    // Generate the JWT
    const accessToken = jwt.sign({
      id: managerLogged.email,
    },
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

export default loginManager;
