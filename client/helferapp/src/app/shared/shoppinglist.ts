import {ShoppingItem} from "./shopping-item";
export {ShoppingItem} from "./shopping-item";

export class Shoppinglist {

  constructor(public id:string, public title:string, public dueDate:Date, public items:ShoppingItem[]){

  }

}

