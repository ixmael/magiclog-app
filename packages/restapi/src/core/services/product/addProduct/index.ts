import { ProductType } from '../../../domain/product';

/*
import {
  InvalidUserDataError,
  EmailExistsError,
} from '../../../domain/user/errors';
*/

import { ProductServiceServicesType } from '../index';

/**
 * This create a new product
 * @param email
 * @param userRepository
 * @returns a ProductType
 */
const addProduct = async (user: string, sku: string, price: number, services: ProductServiceServicesType): Promise<ProductType> => {
  const productWithSameSKUExists = await services.repository.getByIDAndSKU(user, sku);
  if (productWithSameSKUExists) {
    const message = `There is a product with the same SKU '${sku}')`;
    services.logger.error(message);
    return Promise.reject(new Error(message));
  }

  // Prepare the user
  const product: ProductType = {
    user,
    sku,
    price,
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
