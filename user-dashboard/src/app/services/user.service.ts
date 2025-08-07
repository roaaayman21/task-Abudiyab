import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UsersResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  /**
   * Fetch paginated users from the API
   * @param limit Number of users to fetch
   * @param skip Number of users to skip (for pagination)
   * @returns Observable of UsersResponse
   */
  getUsers(limit: number = 10, skip: number = 0): Observable<UsersResponse> {
    const url = `${this.baseUrl}?limit=${limit}&skip=${skip}`;
    return this.http.get<UsersResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch a single user by ID
   * @param id User ID
   * @returns Observable of User
   */
  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Search for a user by ID (same as getUserById but with different error handling)
   * @param id User ID to search for
   * @returns Observable of User or null if not found
   */
  searchUserById(id: number): Observable<User | null> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      map(user => user),
      catchError(error => {
        if (error.status === 404) {
          return [null]; // Return null if user not found
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Handle HTTP errors
   * @param error HTTP error response
   * @returns Observable that throws an error
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('UserService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
