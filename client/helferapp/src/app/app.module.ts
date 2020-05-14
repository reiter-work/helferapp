import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddShoppinglistDialog, ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {MarkItemAsDoneDialog, ShoppingItemComponent} from './components/shopping-item/shopping-item.component';
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './components/home/home.component';
import {GreetingComponent} from './components/greeting/greeting.component';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from "./servives/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ShoppinglistDetailComponent} from './components/shoppinglist-detail/shoppinglist-detail.component';
import {ShoppinglistService} from "./servives/shoppinglist.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ConfirmationDialogComponent} from './components/shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { InputDialogComponent } from './components/shared/input-dialog/input-dialog.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { AddressComponent } from './components/address/address.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingItemComponent,
    HomeComponent,
    GreetingComponent,
    LoginComponent,
    ShoppinglistDetailComponent,
    ConfirmationDialogComponent,
    InputDialogComponent,
    AddShoppinglistDialog,
    MarkItemAsDoneDialog,
    AddressComponent,
    CommentComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    InputDialogComponent,
  ],

  providers: [ShoppinglistService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
