import * as React from "react";
import { IMovie } from "./App";
import * as genres from "../data/genres.json"
import "./List.css";

export type ListProps = {
  movies: IMovie[];
};

export function List({movies}: ListProps): JSX.Element {
  
  function renderItem({ popularity, title, vote_average, overview, release_date, genre_ids }: IMovie, index: number) {
    return (
      <div key={index} className="list-item">
        <h3>{title}</h3>
        <p>{overview}</p>

        <span>Score: {vote_average} | </span>
        <span>Released: {release_date} | </span>
        <span>
          Genres: {genre_ids.map(function (genreId, i) { 
            console.log(genres);
            const genre = genres.find(function (genre) {
              return genre.id === genreId;
            });

            return i === genre_ids.length - 1 ? genre : genre + ", ";
          })}
        </span>
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