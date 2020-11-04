import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './admin/verify/accounts/accounts.component';
import { PostsComponent } from './admin/verify/posts/posts.component';
import { NavbarComponent } from './admin/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AccountComponent,
    PostsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
