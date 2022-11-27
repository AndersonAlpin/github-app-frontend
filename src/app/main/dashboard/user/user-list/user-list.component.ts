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
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
    window.addEventListener('scroll', this.checkEndOfPage.bind(this));
  }

  navigateToUser(userName: string) {
    this.router.navigate([userName], { relativeTo: this.route });
  }

  getUsers() {
    this.userService.getUsers(this.page).subscribe({
      next: (response) => {
        if (response) {
          this.data = this.data.concat(response.data);
          this.loading = false;
        } else {
          this.router.navigate(['login']);
        }
      },
      error: (error) => {
        this.router.navigate(['login']);
      }
    });
  }

  checkEndOfPage() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loading = true;
      this.page++;
      this.getUsers();
    }
  }

}