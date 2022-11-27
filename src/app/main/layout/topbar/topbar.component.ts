import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() onToggle = new EventEmitter();

  items: MenuItem[] = [];
  user: any ;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const data = localStorage.getItem('GITHUB_API_SESSION');
    this.user = data ? JSON.parse(data) : undefined;
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];

   if (this.router.url === '/') {
      localStorage.setItem('ndashConnector-activeLink', '/');
    }
  }

  onToggleMenu() {
    this.onToggle.emit();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('GITHUB_API_SESSION');
    const blacklist = ['/', '/login'];
    const returnUrl = this.router.url;
    this.router.navigate(['login'], {
      queryParams: {
        returnUrl: blacklist.includes(returnUrl) ? undefined : returnUrl
      }
    });
  }

}
