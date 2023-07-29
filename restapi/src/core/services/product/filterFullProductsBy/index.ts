import {
  ProductType,
  ProductFilterType,
} from '../../../domain/product';

import {
  ProductServiceServicesType,
} from '../index';

/**
 *
 * @param services
 */
const filterFullProductsBy = async (filters: ProductFilterType, services: ProductServiceServicesType): Promise<Array<ProductType>> => {
  const products = await services.repository.filterProductsBy(filters);

  return products;
};

export default filterFullProductsBy;
