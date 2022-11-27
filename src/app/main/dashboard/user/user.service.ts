import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = localStorage.getItem('GITHUB_API_SESSION');
  user = this.data ? JSON.parse(this.data) : undefined;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(token: string, page: number): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/user/${this.user.token}/${page}` );
  }

  getUser(name: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/user/detail/${name}/${this.user.token}` );
  }

  getRepos(name: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/user/repos/${name}/${this.user.token}` );
  }

}