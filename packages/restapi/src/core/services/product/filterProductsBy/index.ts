import {
  PublicProductType,
  ProductFilterType,
} from '../../../domain/product';

import {
  ProductServiceServicesType,
} from '../index';

/**
 *
 * @param services
 */
const filterProductsBy = async (filters: ProductFilterType, services: ProductServiceServicesType): Promise<Array<PublicProductType>> => {
  const products = await services.repository.filterProductsBy(filters);

  services.logger.info('filters', filters);

  // Transform the ProductType to PublicProductType
  const publicProducts: Array<PublicProductType> = products.map((internalProduct) => {
    const publicProduct: PublicProductType = {
      id: internalProduct.id,
      name: internalProduct.name,
      sku: internalProduct.sku,
      price: internalProduct.price,
    };

    return publicProduct;
  });

  return publicProducts;
};

export default filterProductsBy;
