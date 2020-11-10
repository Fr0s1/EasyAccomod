import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component'
import { AccountComponent } from './admin/verify/accounts/accounts.component';
import { PostsComponent } from './admin/verify/posts/posts.component';
import { HomeComponent } from './admin/home/home.component';

// Tạo đường dẫn để duyệt tài khoản/bài đăng cho admin với định dạng /admin/verify/...

const routes: Routes = [
  { path: 'admin/verify/accounts', component: AccountComponent },
  { path: 'admin/verify/posts', component: PostsComponent },
  { path: 'admin', component: HomeComponent },
  { path: 'login', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
