import {User} from "./user";

export class Comment {

  constructor(
    public id:number,
    public comment:string,
    public user_id:number,
    public shoppinglist_id:number,
    public created_at:Date,
    public username,
  ){}


  static empty(): Comment {
    return new Comment(null, '', null, null, new Date(), '');
  }

  static fromObject(raw: any): Comment {
    return new Comment(
      raw.id,
      raw.comment,
      raw.user_id,
      raw.shoppinglist_id,
      typeof (raw.created_at) === 'string' ? new Date(raw.created_at) : raw.created_at,
      raw.username
    );
  }
}

