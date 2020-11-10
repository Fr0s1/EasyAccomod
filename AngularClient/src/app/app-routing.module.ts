import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component'
import { AccountComponent } from './admin/verify/accounts/accounts.component';
import { PostsComponent } from './admin/verify/posts/posts.component';
import { AdminComponent } from './admin/admin.component'
import { HomeComponent } from './admin/home/home.component';
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
      ]
  },
  { path: 'login', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
