import { ProductType } from '../../domain/product';
import { ProductServiceInterface } from '../../domain/product/service';
import { ProductRepositoryInterface } from '../../domain/product/repository';

import addProduct from './addProduct';
import getProductsByUserID from './getProductsByUserID';

export type ProductServiceServicesType = {
  repository: ProductRepositoryInterface;
  logger: any;
};

/**
 * This implements the ProductServiceInterface
 * @param repository the repository to handle the users
 * @returns an implementation of the UserServiceInterface
 */
const ProductService = (services: ProductServiceServicesType): ProductServiceInterface => {
  return {
    addProduct: (userId: string, name: string, sku: string, price: number): Promise<ProductType> => addProduct(userId, name, sku, price, services),
    getProductsByUserID: (userId: string): Promise<Array<ProductType>> => getProductsByUserID(userId, services),
  } as ProductServiceInterface;
};

export default ProductService;
