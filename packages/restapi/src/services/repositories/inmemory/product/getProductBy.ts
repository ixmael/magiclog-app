import { ProductType } from '../../../../core/domain/product';

/**
 *
 * @param field
 * @param value
 * @param storage
 * @returns
 */
const getProductsBy = async (field: string, value: string, storage: Array<ProductType>): Promise<Array<ProductType>> => {
  return storage;
};

export default getProductsBy;
