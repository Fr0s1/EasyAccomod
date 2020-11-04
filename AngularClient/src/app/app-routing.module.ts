import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './admin/verify/accounts/accounts.component';
import { PostsComponent } from './admin/verify/posts/posts.component';
import { HomeComponent} from './admin/home/home.component';

// Tạo đường dẫn để duyệt tài khoản/bài đăng cho admin với định dạng /admin/verify/...

const routes: Routes = [
  { path: 'admin', component: HomeComponent},
  { path: 'admin/verify/accounts', component: AccountComponent },
  { path: 'admin/verify/posts', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
