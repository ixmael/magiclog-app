import express from 'express';
import jwt from 'jsonwebtoken';

import {
  APIServices,
} from 'types';

const ManagerAuthMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const services: APIServices = request.app.get('services');

  const authorizationHeader = request.header('Authorization');
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token) {
    services.logger.error('The authorization header is invalid');
    return response
      .sendStatus(401);
  }

  jwt.verify(token, process.env.RESTAPI_TOKEN as string, (err: any, user: any) => {
    if (err) {
      return response
        .sendStatus(401);
    };

    response.locals.user = user;

    return next();
  });
};

export default ManagerAuthMiddleware;
