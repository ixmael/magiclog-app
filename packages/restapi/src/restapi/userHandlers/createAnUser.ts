import express from 'express';

/**
 * Create a new user
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const createAnUser = async (request: express.Request, response: express.Response) => {
  const requestUserData = request.body;

  // Validate request data
  if (!requestUserData.hasOwnProperty('email') || !requestUserData.hasOwnProperty('password')) {
    response
      .status(400)
      .json({
        message: 'malformed',
      });

    return;
  }

  // Get the services
  // const services = request.app.get('services');

  response.send('ok');
};

export default createAnUser;
