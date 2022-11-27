import { UserService } from './../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  user: any;
  page: number = 1;
  data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('GITHUB_API_SESSION');
    this.user = data ? JSON.parse(data) : undefined;
    this.getUsers();
  }

  navigateToUser(userName: string) {
    this.router.navigate([userName], { relativeTo: this.route });
  }

  getUsers() {
    this.userService.getUsers(this.user.token, this.page).subscribe({
      next: (response) => {
        this.data = this.data.concat(response.data);
      }
    });
  }

  nextPage() {
    this.page++;
    this.getUsers();
  }

}