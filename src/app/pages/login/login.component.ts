import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/utils/alert.service';
import { environment } from 'src/environments/environment';

import * as qs from 'query-string';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private loginService: LoginService
  ) {
    this.formGroup = this.fb.group({
      user: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    const { code } = qs.parseUrl(window.location.href).query;

    if (code) {
      this.loginService.getUserData(code.toString()).subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem('GITHUB_API_SESSION', JSON.stringify(response));
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  login() {
    this.showInstructions();
  }

  redirectToGithubAuth() {
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: environment.GITHUB_CLIENT_ID,
      redirect_uri: environment.GITHUB_REDIRECT_URL
    };

    const url = `${environment.GITHUB_URL}/authorize?${qs.stringify(params)}`;
    window.location.href = url;
  }

  redirectToGoogleAuth() {
    this.showInstructions();
  }

  redirectToFaceAuth() {
    this.showInstructions();
  }

  showInstructions() {
    this.alertService.showInfo('Please, login with your GitHub account');
  }

}
