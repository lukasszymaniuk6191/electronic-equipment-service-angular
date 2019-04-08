import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }


  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post('http://localhost:8080/token/generate-token', credentials);
  }
}
