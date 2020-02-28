import * as React from "react";
import { useContext, useCallback } from "react";
import { IMovie } from "../interfaces";
import { Store } from "./Store";
import "../styles/List.css";

export type ListProps = {
  onDeleteMovie(id: number): void,
};

type ListItemProps = IMovie & {
  index: number
  onDeleteMovie(id: number): void,
};

const [state] = useContext(Store);
const { movies, genres } = state;

function ListItem({
  id,
  title,
  vote_average,
  overview,
  release_date,
  onDeleteMovie,
  index,
}: ListItemProps) {
  const memoizedDeleteMovie = useCallback(() => {
    onDeleteMovie(id);
  }, [id, movies]);

  return (
    <div key={`${index}__${id}`} className="list-item">
      <div className="list-item-buttons">
        <span onClick={memoizedDeleteMovie}>
          <i className="fa fa-trash" aria-hidden="true" />
        </span>
      </div>
      <div>
        <h2>
          {index + 1}. {title}
        </h2>
        <p>{overview}</p>
        <div>
          <span>
            <b>Score:</b> {vote_average} |{" "}
          </span>
          <span>
            <b>Released:</b> {release_date} |{" "}
          </span>
          <span>
            <b>Genres:</b>{" "}
            {genres.map(function (genre, i) {
              return i === genres.length - 1 ? genre : genre + ", ";
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export function List({ onDeleteMovie }: ListProps): JSX.Element {
  function renderItem(movie: IMovie, index: number) {
    return (
      <ListItem
        {...movie}
        key={movie.id}
        index={index}
        onDeleteMovie={onDeleteMovie}
      />
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
