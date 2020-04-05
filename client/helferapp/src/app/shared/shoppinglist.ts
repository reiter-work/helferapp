import { Item } from './item';
export { Item } from './item';

export class Shoppinglist {

  constructor(public dueDate:Date, public items:Item[])
  {

  }

}
