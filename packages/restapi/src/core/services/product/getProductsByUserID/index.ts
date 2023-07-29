import { ProductType } from '../../../domain/product';

/*
import {
  InvalidUserDataError,
  EmailExistsError,
} from '../../../domain/user/errors';
*/

import { ProductServiceServicesType } from '../index';

/**
 * Fetch the products stored
 * @param id
 * @param services
 * @returns an array of ProductType
 */
const getProductsByUserID = async (id: string, services: ProductServiceServicesType): Promise<Array<ProductType>> => {
  const products: Array<ProductType> = await services.repository.getProductsBy('user', id);

  return products;
};

export default getProductsByUserID;
