import {
  ProductFilterType,
  ProductType,
} from '../../../../core/domain/product';

/**
 *
 * @param storage
 */
const filterProductsBy = async (filters: ProductFilterType, storage: Array<ProductType>): Promise<Array<ProductType>> => {
  return storage.filter((product) => {
    // Check if the product has the filter name
    if (filters.name && filters.name !== product.name) {
      return false;
    }

    if (filters.sku && filters.sku !== product.sku) {
      return false;
    }

    if (filters.minPrice && filters.minPrice > product.price) {
      return false;
    }

    if (filters.maxPrice && filters.maxPrice < product.price) {
      return false;
    }

    return true;
  });
};

export default filterProductsBy;
