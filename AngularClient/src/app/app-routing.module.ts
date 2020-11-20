import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component'
import { AccountComponent } from './admin/verify/accounts/accounts.component';
import { PostsComponent } from './admin/verify/posts/posts.component';
import { AdminComponent } from './admin/admin.component'
import { HomeComponent } from './admin/home/home.component';
import { CreatePostComponent } from './create-post/create-post.component'
import { RegisterComponent } from './register/register.component'
import { PostDetailsComponent } from './post-details/post-details.component'
import { PaymentComponent } from './admin/payment/payment.component'

// Tạo đường dẫn để duyệt tài khoản/bài đăng cho admin với định dạng /admin/verify/...

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children:
      [
        { path: '', component: HomeComponent },
        { path: 'verify/accounts', component: AccountComponent },
        { path: 'verify/posts', component: PostsComponent },
        { path: 'payment', component: PaymentComponent }
      ]
  },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post/create', component: CreatePostComponent },
  { path: 'post/details', component: PostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
