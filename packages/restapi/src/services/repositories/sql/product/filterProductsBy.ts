import {
  ProductFilterType,
  ProductType,
} from '../../../../core/domain/product';

/**
 *
 * @param storage
 */
const filterProductsBy = async (filters: ProductFilterType, connection: any, services: any): Promise<Array<ProductType>> => {
  const fieldsValues: Array<string | number> = Array<string | number>();

  const filterProductsByFilters: Array<string> = Array<string>();

  if (filters.name) {
    filterProductsByFilters.push('name = ?');
    fieldsValues.push(filters.name);
  }

  if (filters.sku) {
    filterProductsByFilters.push('sku = ?');
    fieldsValues.push(filters.sku);
  }

  if (filters.minPrice) {
    filterProductsByFilters.push('price >= ?');
    fieldsValues.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    filterProductsByFilters.push('price <= ?');
    fieldsValues.push(filters.maxPrice);
  }

  if (filters.seller) {
    filterProductsByFilters.push('seller_id = ?');
    fieldsValues.push(filters.seller);
  }

  let filterQuery: string = '';
  if (filterProductsByFilters.length > 0) {
    filterQuery = `WHERE ${filterProductsByFilters.join(' AND ')}`;
  }

  return await connection
    .execute(`SELECT * FROM products ${filterQuery}`, fieldsValues)
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

export default filterProductsBy;
