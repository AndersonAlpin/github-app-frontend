import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/utils/alert.service';

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
    private alertService: AlertService
  ) {
    this.formGroup = this.fb.group({
      user: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

ngOnInit(): void {
  }

  login() {
    this.showInstructions();
  }

  redirectToGithubAuth() {
    // this.router.navigate(['/']);
    this.alertService.showSuccess('Login success');
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
