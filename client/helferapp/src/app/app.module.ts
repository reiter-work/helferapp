import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingItemComponent } from './components/shopping-item/shopping-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
