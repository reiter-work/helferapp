import { Shoppinglist, ShoppingItem } from "./shoppinglist";

export class ShoppinglistFactory {

  static empty(): Shoppinglist {
    return new Shoppinglist(null, null, '', new Date(), []);
  }

  static fromObject(rawShoppinglist: any): Shoppinglist {
    return new Shoppinglist(
      rawShoppinglist.id,
      rawShoppinglist.userID,
      rawShoppinglist.title,
      typeof(rawShoppinglist.dueDate) === 'string' ? new Date(rawShoppinglist.dueDate) : rawShoppinglist.dueDate,
      rawShoppinglist.items,
    );
  }
}
