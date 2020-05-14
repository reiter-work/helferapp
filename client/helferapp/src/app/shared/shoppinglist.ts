import {ShoppingItem} from "./shopping-item";
export {ShoppingItem} from "./shopping-item";

import {Comment} from "./comment";
export {Comment} from "./comment";
export class Shoppinglist {

  constructor(
    public id:string,
    public user_id:number,
    public helper_id:number,
    public title:string,
    public dueDate:Date,
    public created_at:Date,
    public updated_at?:Date,
    public item?:ShoppingItem[],
    // public comment?:Comment[],
  ){}

}
