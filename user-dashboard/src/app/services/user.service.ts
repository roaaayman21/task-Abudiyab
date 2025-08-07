import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

// User interfaces
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface UserDetail extends User {
  email: string;
  phone: string;
  age: number;
  gender: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface UsersResponse {
  users: UserDetail[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  /**
   * Fetch paginated users from the API
   * @param limit Number of users to fetch
   * @param skip Number of users to skip
   * @returns Observable of users response
   */
  getUsers(limit: number = 12, skip: number = 0): Observable<UsersResponse> {
    const url = `${this.baseUrl}/users?limit=${limit}&skip=${skip}`;
    return this.http.get<UsersResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of({
          users: [],
          total: 0,
          skip: 0,
          limit: 0
        });
      })
    );
  }

  /**
   * Fetch a single user by ID
   * @param id User ID
   * @returns Observable of user detail or null if not found
   */
  getUserById(id: number): Observable<UserDetail | null> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<UserDetail>(url).pipe(
      catchError(error => {
        console.error(`Error fetching user ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Search users by name or other criteria
   * @param query Search query
   * @returns Observable of users response
   */
  searchUsers(query: string): Observable<UsersResponse> {
    const url = `${this.baseUrl}/users/search?q=${encodeURIComponent(query)}`;
    return this.http.get<UsersResponse>(url).pipe(
      catchError(error => {
        console.error('Error searching users:', error);
        return of({
          users: [],
          total: 0,
          skip: 0,
          limit: 0
        });
      })
    );
  }
}
