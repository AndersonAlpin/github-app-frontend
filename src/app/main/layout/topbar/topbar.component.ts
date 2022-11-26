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

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
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
    const blacklist = ['/', '/login'];
    const returnUrl = this.router.url;
    this.router.navigate(['login'], {
      queryParams: {
        returnUrl: blacklist.includes(returnUrl) ? undefined : returnUrl
      }
    });
  }

}
