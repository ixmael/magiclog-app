import express from 'express';

import {
  ProductType,
  ProductFilterType,
} from '@/core/domain/product';

import {
  APIServices,
} from 'types';

/**
 * Get the filtered products
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const filterProducts = async (request: express.Request, response: express.Response) => {
  // Load the filters
  const seller = request.query.seller as string | undefined;

  const filters: ProductFilterType = {
    seller,
  };

  // Get the services
  const services: APIServices = request.app.get('services');
  const products: Array<ProductType> = await services
    .productService
    .filterFullProductsBy(filters);

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

export default filterProducts;
