import { assert } from 'chai';

import filterProductsBy from '../';

import initRepositories from '../../../../../services/repositories/inmemory';

import { ProductServiceServicesType } from '../../index';
import { ProductFilterType, ProductType } from '../../../../domain/product';

let services: ProductServiceServicesType | null = null;
const logger = {
  fatal: (message: string) => { },
  error: (message: string) => { },
  warn: (message: string) => { },
  info: (message: string) => { },
  debug: (message: string) => { },
  trace: (message: string) => { },
};

describe('Test filter products', () => {
  before((done) => {
    initRepositories()
      .then((repositories) => repositories.productRepository)
      .then((repository) => {

        repository.addProduct({
          id: 'a',
          user: 'a@a.a',
          name: 'a',
          sku: 'a',
          price: 5,
        } as ProductType);

        repository.addProduct({
          id: 'b',
          user: 'a@a.a',
          name: 'b',
          sku: 'b',
          price: 10,
        } as ProductType);

        repository.addProduct({
          id: 'c',
          user: 'c@c.c',
          name: 'c',
          sku: 'c',
          price: 10,
        } as ProductType);

        repository.addProduct({
          id: 'd',
          user: 'd@d.d',
          name: 'd',
          sku: 'd',
          price: 10,
        } as ProductType);

        repository.addProduct({
          id: 'e',
          user: 'd@d.d',
          name: 'e',
          sku: 'e',
          price: 7,
        } as ProductType);

        return repository;
      })
      .then((repository) => {
        services = {
          repository,
          logger,
        } as ProductServiceServicesType;

        done();
      });
  });

  after((done) => {
    services = null;
    done();
  });

  it('There are no filters', async () => {
    const filters: ProductFilterType = {};

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 5);
  });

  it('Filter by name', async () => {
    const filters: ProductFilterType = {
      name: 'a',
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 1);
  });

  it('Filter by sku', async () => {
    const filters: ProductFilterType = {
      sku: 'b',
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 1);
  });

  it('Filter by seller', async () => {
    const filters: ProductFilterType = {
      seller: 'd@d.d',
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 2);
  });

  it('Filter by min price', async () => {
    const filters: ProductFilterType = {
      minPrice: 5,
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 5);
  });

  it('Filter by min price', async () => {
    const filters: ProductFilterType = {
      maxPrice: 7,
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 2);
  });

  it('Filter by two filters', async () => {
    const filters: ProductFilterType = {
      seller: 'd@d.d',
      maxPrice: 10,
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 2);
  });

  it('Filter by all filters', async () => {
    const filters: ProductFilterType = {
      seller: 'd@d.d',
      name: 'd',
      sku: 'd',
      minPrice: 10,
      maxPrice: 10,
    };

    const products = await filterProductsBy(filters, services as ProductServiceServicesType);

    assert.equal(products.length, 1);
  });
});
