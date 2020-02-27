import * as React from "react";
import { IMovie } from "../interfaces";
import "../styles/List.css";

export type ListProps = {
  movies: IMovie[];
  onDeleteMovie(id: number): void;
};

type ListItemProps = IMovie & {
  index: number;
  onDeleteMovie(id: number): void;
};

function ListItem({ id, title, vote_average, overview, release_date, genres, onDeleteMovie, index }: ListItemProps) {
  return (
    <div key={`${index}__${id}`} className="list-item">
      <div className="list-item-buttons">
        <span onClick={function () { onDeleteMovie(id); }}>
          <i className="fa fa-trash" aria-hidden="true" />
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

export function List({ movies, onDeleteMovie }: ListProps): JSX.Element {

  function renderItem(movie: IMovie, index: number) {
    return (
      <ListItem
        {...movie}
        key={movie.id}
        index={index}
        onDeleteMovie={onDeleteMovie}
      />
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