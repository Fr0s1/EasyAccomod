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
import { ProfileComponent } from './profile/profile.component'
import { ExtendDurationComponent } from './admin/extend-duration/extend-duration.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './_helpers/auth.guard'
import { Role } from './_model/role'
import { VerifyCommentsComponent } from './admin/verify/comments/verify-comments.component';
import { VerifyReportComponent } from './admin/verify/reports/verify-report.component';
import { ChatComponent } from './chat/chat.component'
import { NotificationComponent } from './notification/notification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'ea/admin',
    component: AdminComponent,
    children:
      [
        { path: '', component: HomeComponent },
        { path: 'verify/accounts', component: AdminAccountsComponent },
        { path: 'verify/posts', component: AdminPostsComponent },
        { path: 'verify/comments', component: VerifyCommentsComponent },
        { path: 'verify/reports', component: VerifyReportComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'extend', component: ExtendDurationComponent }
      ],
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] } // Only admin account can access
  },
  { path: 'messenger', component: ChatComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'create/post', component: CreatePostComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Landlord, Role.Admin] } // Only account with right type can access
  },
  {
    path: 'edit/:id', component: EditPostComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Landlord, Role.Admin] } // Only account with right type can access
  },
  {
    path: 'notification', component: NotificationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Landlord, Role.Admin, Role.Renter] } // Only account with right type can access
  },
  {
    path: 'changePassword', component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Landlord, Role.Admin, Role.Renter] } // Only account with right type can access
  },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':username', component: ProfileComponent },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
