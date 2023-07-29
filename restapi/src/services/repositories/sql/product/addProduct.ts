import mysql from 'mysql2';

import {
  ProductType,
} from '../../../../core/domain/product';

/**
 * Save a product in the storage
 * @param user
 * @param storage
 * @returns a boolean that represents if the product has stored or not
 */
const addProduct = async (product: ProductType, connection: any, services: any): Promise<boolean> => {
  return await connection
    .execute('INSERT INTO products(id,seller_id,sku,name,price,created_at) VALUES (?,?,?,?,?,?)',
      [product.id, product.user, product.sku, product.name, product.price, product.createdAt])
    .then(() => true)
    .catch((err: TypeError) => {
      services.logger.error(err);
      return false;
    });
};

export default addProduct;
