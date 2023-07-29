import { ProductRepositoryInterface } from '../../../../core/domain/product/repository';
import { ProductType } from '../../../../core/domain/product';

import getByIDAndSKU from './getByIDAndSKU';
import addProduct from './addProduct';
import getProductsBy from './getProductBy';

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
  } as ProductRepositoryInterface;
};

export default ProductRepositoryInMemory;
