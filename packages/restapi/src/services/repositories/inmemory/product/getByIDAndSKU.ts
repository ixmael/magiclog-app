import { ProductType } from '../../../../core/domain/product';

/**
 * Fetch the product with the SKU and the ID given
 * @param sku
 * @param storage
 * @returns a ProductType
 */
const getByIDAndSKU = async (id: string, sku: string, storage: Array<ProductType>): Promise<ProductType> => {
  const product = storage.find((storedProduct: ProductType) => storedProduct.sku === sku && storedProduct.id === id);

  return product as ProductType;
};

export default getByIDAndSKU;
