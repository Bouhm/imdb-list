import * as React from "react";
import { IMovie } from "./App";
import "./List.css";

export type ListProps = {
  movies: IMovie[];
  onDeleteMovie(id: number): void;
};

export function List({ movies, onDeleteMovie }: ListProps): JSX.Element {
  
  function renderItem({ id, title, vote_average, overview, release_date, genres }: IMovie, index: number) {
    function handleDeleteMovie() {
      console.log("m to d in child::", id);
      onDeleteMovie(id);
    }

    return (
      <div key={index} className="list-item">
        <div className="list-item-buttons">
          <span onClick={handleDeleteMovie}>
            <i className="fa fa-bookmark-o" aria-hidden="true" />
          </span>
        </div>
        <div>
          <h2>{index + 1}. {title}</h2>
          <p>{overview}</p>
          <div>
            <span><b>Score:</b> {vote_average} | </span>
            <span><b>Released:</b> {release_date} | </span>
            <span>
              <b>Genres:</b> {genres.map(function (genre, i) {
                return i === genres.length - 1 ? genre : genre + ", ";
              })}
            </span>
          </div>
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