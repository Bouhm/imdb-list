import * as React from "react";
import { IMovie } from "./App";
import "./List.css";

export type ListProps = {
  movies: IMovie[];
};

export function List({ movies }: ListProps): JSX.Element {

  function renderItem({ popularity, title, vote_average, overview, release_date, genres }: IMovie, index: number) {
    return (
      <div key={index} className="list-item">
        <h3>{title}</h3>
        <p>{overview}</p>
        <div>
          <span>Score: {vote_average} | </span>
          <span>Released: {release_date} | </span>
          <span>
            Genres: {genres.map(function (genre, i) {
              return i === genres.length - 1 ? genre : genre + ", ";
            })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="list">
      {movies.map(function (movie, i) {
        return renderItem(movie, i);
      })}
    </div>
  );
}