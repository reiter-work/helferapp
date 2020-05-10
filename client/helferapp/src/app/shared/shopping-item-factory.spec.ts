import { ShoppingItemFactory } from './shopping-item-factory';

describe('ShoppingItemFactory', () => {
  it('should create an instance', () => {
    expect(new ShoppingItemFactory()).toBeTruthy();
  });
});
