import {Component, Input, OnInit} from '@angular/core';
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {Shoppinglist} from "../../shared/shoppinglist";
import {User} from "../../shared/user";
import {UserService} from "../../servives/user.service";

@Component({
  selector: 'bs-address',
  templateUrl: './address.component.html',
  styles: []
})
export class AddressComponent implements OnInit {

  @Input() shoppinglist: Shoppinglist;

  user:User;
  constructor(public us:UserService) { }

  ngOnInit(): void {

    this.us.getUser(this.shoppinglist.user_id).subscribe(res =>{
      this.user = User.fromObject(res)
    });
  }

  getGMapsLink(){
    return `https://www.google.com/maps/dir/?api=1&destination=${this.user.street}+${this.user.streetnumber}+${this.user.zipcode}+${this.user.city}`;
  }

}
