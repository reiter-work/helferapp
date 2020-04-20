import {ShoppingItem} from "./shopping-item";
export {ShoppingItem} from "./shopping-item";

export class Shoppinglist {

  constructor(public id:string, public user_id:number, public title:string, public dueDate:Date, public created_at:Date, public updated_at?:Date, public item?:ShoppingItem[]){
  }

}
