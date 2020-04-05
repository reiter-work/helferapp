import { Item } from './item';
export { Item } from './item';

export class Shoppinglist {

  constructor(public id:number, public title:string, public dueDate:Date, public items:Item[])
  {

  }

}
