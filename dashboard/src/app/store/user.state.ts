import { User, UserDetail } from '../services/user.service';

// This is what our app remembers about users
export interface UserState {
  // List of users we're showing
  users: User[];

  // The user someone clicked on to see details
  selectedUser: UserDetail | null;

  // Whether we're loading something right now
  loading: boolean;

  // Any error message we need to show
  error: string | null;

  // What page we're on
  currentPage: number;

  // How many pages there are total
  totalPages: number;

  // Total number of users that exist
  totalUsers: number;
}

// What everything starts as when the app loads
export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0
};
