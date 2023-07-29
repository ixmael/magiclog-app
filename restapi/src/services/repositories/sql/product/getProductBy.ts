import mysql from 'mysql2';

import {
  ProductType,
} from '../../../../core/domain/product';

/**
 *
 * @param field
 * @param value
 * @param storage
 * @returns
 */
const getProductsBy = async (field: string, value: string, connection: any, services: any): Promise<Array<ProductType>> => {
  const tableColumnName: string = {
    user: 'seller_id',
  }[field] as string;

  return await connection
    .execute(`SELECT * FROM products WHERE  ${tableColumnName} = ?`, [value])
    .then((rows: any) => {
      if (rows[0].length > 0) {
        return rows[0].map((productRow: any) => ({
          id: productRow.id,
          user: productRow.seller_id,
          name: productRow.name,
          sku: productRow.sku,
          price: parseFloat(productRow.price),
          createdAt: parseInt(productRow.created_at),
        } as ProductType)) as Array<ProductType>;
      } else {
        return [] as Array<ProductType>;
      }
    })
    .catch((err: TypeError) => {
      services.logger.error(err);
      return [] as Array<ProductType>;
    });
};

export default getProductsBy;
