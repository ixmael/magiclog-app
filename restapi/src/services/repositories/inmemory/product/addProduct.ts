import {
  ProductType,
} from '../../../../core/domain/product';

/**
 * Save a product in the storage
 * @param user
 * @param storage
 * @returns a boolean that represents if the product has stored or not
 */
const addProduct = async (product: ProductType, storage: Array<ProductType>): Promise<boolean> => {
  // There is not validation
  storage.push(product);

  return true;
};

export default addProduct;
