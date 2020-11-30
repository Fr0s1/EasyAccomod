import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component'
import { LogInComponent } from './log-in/log-in.component'
import { AdminAccountsComponent } from './admin/verify/accounts/accounts.component';
import { AdminPostsComponent } from './admin/verify/posts/posts.component';
import { AdminComponent } from './admin/admin.component'
import { HomeComponent } from './admin/home/home.component';
import { CreatePostComponent } from './create-post/create-post.component'
import { RegisterComponent } from './register/register.component'
import { PostDetailsComponent } from './post-details/post-details.component'
import { PaymentComponent } from './admin/payment/payment.component'
import { PostsComponent } from './posts/posts.component'
import { ExtendDurationComponent } from './admin/extend-duration/extend-duration.component';

import { AuthGuard } from './_helpers/auth.guard'
import { Role } from './_model/role'
import { VerifyCommentsComponent } from './admin/verify/comments/verify-comments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children:
      [
        { path: '', component: HomeComponent },
        { path: 'verify/accounts', component: AdminAccountsComponent },
        { path: 'verify/posts', component: AdminPostsComponent },
        { path: 'verify/comments', component: VerifyCommentsComponent},
        { path: 'payment', component: PaymentComponent },
        { path: 'extend', component: ExtendDurationComponent}
      ],
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] } // Only admin account can access
  },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'post/create', component: CreatePostComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Landlord, Role.Admin] } // Only account with right type can access
  },
  { path: 'post/details/:id', component: PostDetailsComponent },
  { path: 'posts', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
