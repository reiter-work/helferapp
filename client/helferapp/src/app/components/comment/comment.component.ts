import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../servives/comments.service";
import {Shoppinglist} from "../../shared/shoppinglist";
import {Comment} from "../../shared/comment";
import {AuthService} from "../../servives/auth.service";
import {UserService} from "../../servives/user.service";
import {empty} from "rxjs";
import {User} from "../../shared/user";

@Component({
  selector: 'bs-comment',
  templateUrl: './comment.component.html',
  styles: []
})


export class CommentComponent implements OnInit {

  @Input() shoppinglist:Shoppinglist;

  comments:Comment[];
  newComment:Comment = Comment.empty();
  UserList = {user: User.empty(), helper: User.empty()};

  constructor(public cs:CommentsService, public as:AuthService, public us:UserService) { }

  ngOnInit(): void {

    this.us.getUser(this.shoppinglist.user_id).subscribe(res => {
      this.UserList.user = res;
    });
    this.us.getUser(this.shoppinglist.helper_id).subscribe(res => {
      this.UserList.helper = res;
    });


    this.cs.getComments(this.shoppinglist.id).subscribe(res => {
      this.comments = [];
      for(let comment of res){
        let newComment = Comment.fromObject(comment);
        if(newComment.user_id === this.UserList.user.id){
          newComment.username = this.UserList.user.name
        }
        else{
          newComment.username = this.UserList.helper.name
        }
        this.comments.push(newComment);
      }

    })

  }

  addComment(){

    this.newComment.user_id = this.as.getCurrentUserId();
    this.newComment.shoppinglist_id = +this.shoppinglist.id;

    console.log(this.newComment);

    this.cs.addComment(this.newComment).subscribe(res => {
      let comment = Comment.fromObject(res);
      comment.username = localStorage.getItem("username");
      this.comments.push(comment);
    });
    this.newComment = Comment.empty();
  }
}
