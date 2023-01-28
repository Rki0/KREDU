import { createContext } from "react";

export const AuthContext = createContext<boolean | null | any>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  manager: null,
});
