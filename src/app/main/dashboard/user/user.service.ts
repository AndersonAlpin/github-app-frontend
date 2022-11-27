import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = localStorage.getItem('GITHUB_API_SESSION');
  user = this.data ? JSON.parse(this.data) : undefined;
  header = {
    headers: new HttpHeaders().set(
      'Authorization', this.user.token
    )
  }

  constructor(
    private http: HttpClient
  ) { }

  getUsers(page: number): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/users?since=${page}`, this.header);
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/users/${username}/details`, this.header);
  }

  getRepos(username: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/users/${username}/repos`, this.header);
  }

}