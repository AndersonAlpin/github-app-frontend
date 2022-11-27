import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  param: string = "";
  user: any;
  repos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('name') || '';
    if (this.param) {
      this.getUser();
      this.getRepos();
    }
  }

  getUser() {
    this.userService.getUser(this.param).subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }

  getRepos() {
    this.userService.getRepos(this.param).subscribe({
      next: (response) => {
        this.repos = response.data;
      },
    });
  }
}
