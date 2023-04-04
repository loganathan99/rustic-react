import React, { createContext } from "react";
import { IReducerAction } from "../interfaces/context.interface";

export interface IAuthContext {
  isAuthenticated: boolean;
  user: any;
}

export const initialAuthState: IAuthContext = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<[IAuthContext, React.Dispatch<any>]>([
  initialAuthState,
  () => null,
]);

export const authReducer = (
  state: IAuthContext,
  action: IReducerAction<any>
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "RESTORE":
      const user = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: user ? true : false,
        user: user ? JSON.parse(user) : null,
      };
    default:
      return state;
  }
};
