import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const ramdomColor = require('randomcolor');

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  username: string = "";
  user: any;
  repos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    if (this.username) {
      this.getUser();
      this.getRepos();
    } else {
      this.router.navigate(['login']);
    }
  }

  getUser() {
    this.userService.getUser(this.username).subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }

  getRepos() {
    this.userService.getRepos(this.username).subscribe({
      next: (response) => {
        this.repos = response.data.map((repo: any) => {
          repo.color = ramdomColor({
            luminosity: 'light',
            seed: repo.language,
          });
          return repo;
        });
      },
    });
  }
}
