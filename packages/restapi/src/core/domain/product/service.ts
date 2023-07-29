import { ProductType } from './';

/**
 * This represents the expectation of a ProductService implementation
 */
export interface ProductServiceInterface {
  addProduct: (userId: string, name: string, sku: string, price: number) => Promise<ProductType>;
  getProductsByUserID: (id: string) => Promise<Array<ProductType>>;
}
