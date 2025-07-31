export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;  
  login: (userData: User) => void;
  logout: () => void;
}

export interface ProfileMenuProps {
  user: User  | null;
  handleLogout: () => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}