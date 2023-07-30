import express from 'express';

import {
  PublicProductType,
  ProductFilterType,
} from '../../core/domain/product';

import {
  APIServices,
} from 'types';

/**
 * Get the products
 * @param request a HTTP request
 * @param response the HTTP response
 * @returns
 */
const filterProducts = async (request: express.Request, response: express.Response) => {
  // Load the filters
  const sku = request.query.sku as string | undefined;
  const name = request.query.name as string | undefined;
  const minPrice = request.query.minPrice as number | undefined;
  const maxPrice = request.query.maxPrice as number | undefined;

  const filters: ProductFilterType = {
    sku,
    name,
    minPrice,
    maxPrice,
  };

  // Get the services
  const services: APIServices = request.app.get('services');
  const products: Array<PublicProductType> = await services
    .productService
    .filterProductsBy(filters);

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
