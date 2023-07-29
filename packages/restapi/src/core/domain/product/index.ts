/**
 * This represents a product
 */
export type ProductType = {
  id: string;
  user: string;
  name: string;
  sku: string;
  price: number;
};

export type ProductFilterType = {
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
};

/**
 * Represents the public view of a product
 */
export type PublicProductType = {
  id: string;
  name: string;
  sku: string;
  price: number;
};
