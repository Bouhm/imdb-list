import * as React from "react";
import { useReducer } from "react";
import { IMovie, IGenre } from "../interfaces";

interface IState {
  genres: IGenre[];
  movies: IMovie[];
}

export const initialState: IState = {
  genres: [],
  movies: [],
};

export const Store = React.createContext<[IState, React.Dispatch<any>]>([
  initialState,
  () => { },
]);

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={[state, dispatch]}>{props.children}</Store.Provider>
  );
};

// REDUCERS

interface IAction {
  type: string;
  payload?: any;
}

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "SET_GENRES":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "DELETE_MOVIE":
      let newMovies = [...state.movies];
      const index = newMovies.indexOf(action.payload);

      if (index > -1) {
        newMovies.splice(index, 1);
      }

      return { ...state, movies: newMovies };
    default:
      return state;
  }
};
