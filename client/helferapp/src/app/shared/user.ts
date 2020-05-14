import {Shoppinglist} from "./shoppinglist";

export class User {

  constructor(public id:number, public name:string, public email:string, public street:string, public streetnumber:number, public zipcode:number, public city:string){
  }


  static empty(): User {
    return new User(null, '', '', '', null, null, '');
  }

  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.name,
      rawUser.email,
      rawUser.street,
      rawUser.streetnumber,
      rawUser.zipcode,
      rawUser.city
    );
  }
}

