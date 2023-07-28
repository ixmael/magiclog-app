import express from 'express';
import * as dotenv from 'dotenv';

import initializeServices from './initilizeServices';

import restapiRoutes from './restapi';

/**
 * Initilize the services and the RestAPI server
 */
(async () => {
  // Load the environment variables
  dotenv.config();

  // Load the services
  const services = await initializeServices();

  // Prepare the server
  const restapiServer = express();
  restapiServer.use(express.json());

  // Add services to the server
  restapiServer.set('services', services);

  // Set the routes
  restapiServer.use('/', restapiRoutes);

  // Start the server
  const port = process.env.RESTAPI_PORT || 3000;
  restapiServer.listen(port, () => {
    console.log(`The server started and listens in ${port}`);
  });
})();
