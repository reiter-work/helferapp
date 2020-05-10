export class ShoppingItem {

  constructor(public id:string, public shoppinglist_id:number, public title:string, public price:number, public amount:number, public isDone:boolean, public price_max?:number, public price_payed?:number){}

}

