import { Shoppinglist, ShoppingItem } from "./shoppinglist";

export class ShoppingitemFactory {

  static empty(): ShoppingItem {
    return new ShoppingItem(null, null, '', null, null, null, null, null);
    // , []
  }

  static fromObject(rawShoppingItem: any): ShoppingItem {
    return new ShoppingItem(
      rawShoppingItem.id,
      rawShoppingItem.shoppinglist_id,
      rawShoppingItem.title,
      rawShoppingItem.price,
      rawShoppingItem.amount,
      rawShoppingItem.isDone,
      rawShoppingItem.price_max,
      rawShoppingItem.price_payed,
    );
  }
}
