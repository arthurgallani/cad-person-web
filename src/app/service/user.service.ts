import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/cad-person-api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/persons`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/persons/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/persons`, user);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/persons/${user.id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/persons/${id}`;
    return this.http.delete(url);
  }
}