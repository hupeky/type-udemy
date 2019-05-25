import React from "react";
import { IEpisode } from "../App";

interface IState {
  episodes: IEpisode[];
  favourites: IEpisode[];
}

export interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  episodes: [],
  favourites: []
};

export const Store = React.createContext<any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_DATA": {
      return {
        ...state,
        episodes: action.payload
      };
    }
    case "ADD_FAV": {
      return { ...state, favourites: [...state.favourites, action.payload] };
    }
    default:
      return state;
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
