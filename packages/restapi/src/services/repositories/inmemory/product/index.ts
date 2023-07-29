import {
  ProductRepositoryInterface,
} from '../../../../core/domain/product/repository';
import {
  ProductFilterType,
  ProductType,
} from '../../../../core/domain/product';

import getByIDAndSKU from './getByIDAndSKU';
import addProduct from './addProduct';
import getProductsBy from './getProductBy';
import filterProductsBy from './filterProductsBy';

/**
 * Implements the ProductRepositoryInterface in memory
 * @param storage
 * @returns a object that implements ProductRepositoryInterface
 */
const ProductRepositoryInMemory = (storage: Array<ProductType>): ProductRepositoryInterface => {
  return {
    getByIDAndSKU: (id: string, sku: string): Promise<ProductType> => getByIDAndSKU(id, sku, storage),
    addProduct: (product: ProductType): Promise<boolean> => addProduct(product, storage),
    getProductsBy: (field: string, value: string) => getProductsBy(field, value, storage),
    filterProductsBy: (filters: ProductFilterType) => filterProductsBy(filters, storage),
  } as ProductRepositoryInterface;
};

export default ProductRepositoryInMemory;
