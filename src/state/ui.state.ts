import { createContext } from "react";
import { IReducerAction } from "../interfaces/context.interface";

export interface IUIContext {
  isSideNavOpen: boolean;
}

export const initialUIState: IUIContext = {
  isSideNavOpen: false,
};

export const GlobalUIContext = createContext<[IUIContext, React.Dispatch<any>]>(
  [initialUIState, () => null]
);

export const globalUIReducer = (
  state: IUIContext,
  action: IReducerAction<any>
) => {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return {
        ...state,
        isSideNavOpen: true,
      };
    case "CLOSE_SIDENAV":
      return {
        ...state,
        isSideNavOpen: false,
      };
    default:
      return state;
  }
};
