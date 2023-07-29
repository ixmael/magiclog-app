import { v4 as uuidv4 } from 'uuid';

import {
  ProductType,
} from '../../../domain/product';

import {
  ProductServiceServicesType,
} from '../index';

/**
 * This create a new product
 * @param email
 * @param userRepository
 * @returns a ProductType
 */
const addProduct = async (user: string, name: string, sku: string, price: number, services: ProductServiceServicesType): Promise<ProductType> => {
  // Check if the user exists

  // Prepare the user
  const product: ProductType = {
    id: uuidv4(),
    createdAt: Date.now(),
    user,
    sku,
    price,
    name,
  } as ProductType;

  // Store the user in the repository
  const productWasStored = await services.repository.addProduct(product);
  if (!productWasStored) {
    const message = `The product with the SKU '${sku}' cannot be stored`;
    services.logger.error(message);
    return Promise.reject(new Error(message));
  }

  return product;
};

export default addProduct;
