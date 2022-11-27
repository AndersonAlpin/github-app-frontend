import { GithubAuthGuard } from './guards/github-auth.guard';
import { UserDetailsComponent } from './main/dashboard/user/user-details/user-details.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './main/dashboard/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent,
    canActivate: [GithubAuthGuard],
    children: [
      { path: '', component: UserListComponent },
      { path: ':username', component: UserDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
