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
const addProduct = async (request: express.Request, response: express.Response) => {
  if (!response.locals.user || !response.locals.user.hasOwnProperty('id')) {
    return response
      .sendStatus(401);
  }

  // Validate the request data
  const requestProductData = request.body;
  if (!requestProductData.hasOwnProperty('sku')
    || !requestProductData.hasOwnProperty('price')
    || !requestProductData.hasOwnProperty('name')) {
    return response
      .status(400)
      .json({
        message: 'The json product data is not valid',
      });
  }

  // We can try to store
  // Get the services
  const services: APIServices = request.app.get('services');
  const product: ProductType | null = await services
    .productService
    .addProduct(response.locals.user.id, requestProductData.name, requestProductData.sku, requestProductData.price)
    .catch((_: any) => {
      response
        .status(500)
        .json({
          message: 'internal error',
        });

      return null;
    });

  if (product) {
    return response
      .status(201)
      .json({
        message: `The product was created`,
        payload: {
          product,
        },
      });
  }
};

export default addProduct;
