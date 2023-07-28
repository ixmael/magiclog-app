import express from 'express';

import initializeServices from './initilizeServices';

import restapiRoutes from './restapi';

/**
 * Initilize the services and the RestAPI server
 */
(async () => {
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
  restapiServer.listen(3000, () => {
    console.log('The server started');
  });
})();
