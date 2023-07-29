import {
  ProductType,
  ProductFilterType,
} from './';

/**
 * This represents the expectation of a ProductRepository implementation
 */
export interface ProductRepositoryInterface {
  addProduct: (product: ProductType) => Promise<boolean>;
  getProductsBy: (field: string, value: string) => Promise<Array<ProductType>>;
  filterProductsBy: (filters: ProductFilterType) => Promise<Array<ProductType>>;
}
