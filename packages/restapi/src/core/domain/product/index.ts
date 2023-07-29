/**
 * This represents a product
 */
export type ProductType = {
  id: string;
  user: string;
  name: string;
  sku: string;
  price: number;
  createdAt: number;
};

/**
 * Represents the filters to fetch products
 */
export type ProductFilterType = {
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
  seller?: string;
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
