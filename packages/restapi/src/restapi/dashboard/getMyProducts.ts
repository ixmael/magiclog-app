import express from 'express';

import {
  ProductType,
} from '@/core/domain/product';

import {
  APIServices,
} from 'types';

/**
 * Create a new product
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const getMyProducts = async (request: express.Request, response: express.Response) => {
  if (!response.locals.user || !response.locals.user.hasOwnProperty('id')) {
    return response
      .sendStatus(401);
  }

  // Get the services
  const services: APIServices = request.app.get('services');
  const products: Array<ProductType> = await services
    .productService
    .getProductsByUserID(response.locals.user);

  if (products) {
    return response
      .status(200)
      .json({
        payload: {
          products,
        },
      });
  } else {
    return response
      .sendStatus(500);
  }
};

export default getMyProducts;
