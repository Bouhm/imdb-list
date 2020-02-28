import * as React from "react";
import { useReducer } from "react";
import { IMovie, IGenreMap } from "../../interfaces";

interface IState {
  genreMap: IGenreMap;
  movies: IMovie[];
}

export const initialState: IState = {
  genreMap: {},
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
      return { ...state, genreMap: action.payload };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "DELETE_MOVIE":
      return { ...state, movies: state.movies.filter(function (movie) { return movie.id === action.payload; }) };
    default:
      return state;
  }
};
