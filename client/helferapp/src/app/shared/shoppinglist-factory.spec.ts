import { ShoppinglistFactory } from './shoppinglist-factory';

describe('ShoppinglistFactory', () => {
  it('should create an instance', () => {
    expect(new ShoppinglistFactory()).toBeTruthy();
  });
});
