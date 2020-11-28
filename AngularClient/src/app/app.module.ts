import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAccountsComponent } from './admin/verify/accounts/accounts.component';
import { AdminPostsComponent } from './admin/verify/posts/posts.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { HomeComponent } from './admin/home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component'
import { HomepageComponent } from './homepage/homepage.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ExtendDurationComponent } from './admin/extend-duration/extend-duration.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminAccountsComponent,
    AdminPostsComponent,
    NavbarComponent,
    HomeComponent,
    LogInComponent,
    CreatePostComponent,
    PostDetailsComponent,
    PaymentComponent,
    RegisterComponent,
    HomepageComponent,
    MainNavComponent,
    PostsComponent,
    ExtendDurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
