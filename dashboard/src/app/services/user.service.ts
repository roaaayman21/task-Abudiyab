import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

// This is what a basic user looks like in our app
// We keep it simple with just the essentials for the user list
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

// When we need more details about a user, we use this extended version
// It includes everything from the basic User plus additional info
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

// This is what the API sends us when we ask for a list of users
// It includes the users array plus pagination info
export interface UsersResponse {
  users: UserDetail[];
  total: number;
  skip: number;
  limit: number;
}

// This service handles all our user data needs
// It talks to the DummyJSON API to get real user information
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  // Get a bunch of users from the API with pagination
  // limit = how many users you want, skip = how many to skip (for pagination)
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

  // Get one specific user by their ID
  // Returns null if the user doesn't exist
  getUserById(id: number): Observable<UserDetail | null> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<UserDetail>(url).pipe(
      catchError(error => {
        console.error(`Error fetching user ${id}:`, error);
        return of(null);
      })
    );
  }

  // Search for users by typing their name or whatever
  // Just pass in what you want to search for
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
