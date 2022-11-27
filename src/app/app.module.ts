import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { TopbarComponent } from './main/layout/topbar/topbar.component';

import { AlertService } from './services/utils/alert.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { UserDetailsComponent } from './main/dashboard/user/user-details/user-details.component';
import { TooltipModule } from 'primeng/tooltip';
import { UserListComponent } from './main/dashboard/user/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TopbarComponent,
    UserListComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ToastModule,
    MenuModule,
    TooltipModule,
    HttpClientModule,
    // StoreModule.forRoot(, {}),
  ],
  providers: [
    AlertService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
