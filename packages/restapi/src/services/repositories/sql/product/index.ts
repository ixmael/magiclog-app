import mysql from 'mysql2';

import {
  ProductRepositoryInterface,
} from '../../../../core/domain/product/repository';
import {
  ProductFilterType,
  ProductType,
} from '../../../../core/domain/product';

import addProduct from './addProduct';
import getProductsBy from './getProductBy';
import filterProductsBy from './filterProductsBy';

/**
 * Implements the ProductRepositoryInterface in memory
 * @param storage
 * @returns a object that implements ProductRepositoryInterface
 */
const ProductRepository = (connection: any, services: any): ProductRepositoryInterface => {
  return {
    addProduct: (product: ProductType): Promise<boolean> => addProduct(product, connection, services),
    getProductsBy: (field: string, value: string) => getProductsBy(field, value, connection, services),
    filterProductsBy: (filters: ProductFilterType) => filterProductsBy(filters, connection, services),
  } as ProductRepositoryInterface;
};

export default ProductRepository;
