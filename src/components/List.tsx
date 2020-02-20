import * as React from "react";
import { IMovie } from "./App";
// import "./List.css";

export type ListProps = {
  movies: IMovie[];
};

export function List({movies}: ListProps): JSX.Element {
  
  function renderItem({ popularity, title, vote_average, overview, release_date, genre_ids }: IMovie, index: number) {
    return (
      <div key={index}>
        {title}
        {popularity}
        {vote_average}
        {overview}
        {release_date}
        {genre_ids}
      </div>  
    )
  }

  return (
    <div className="list">
      {movies.map(function (movie, i) {
        return renderItem(movie, i);
      })}
    </div>
  );
}