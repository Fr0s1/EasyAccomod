import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

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
import { VerifyCommentsComponent } from './admin/verify/comments/verify-comments.component';
import { CommentsComponent } from './comments/comments.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyReportComponent } from './admin/verify/reports/verify-report.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
    LogInComponent,
    PostDetailsComponent,
    PaymentComponent,
    RegisterComponent,
    HomepageComponent,
    MainNavComponent,
    PostsComponent,
    ExtendDurationComponent,
    VerifyCommentsComponent,
    CommentsComponent,
    ProfileComponent,
    VerifyReportComponent,
    NotFoundComponent,
    ChatComponent,
    FooterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
