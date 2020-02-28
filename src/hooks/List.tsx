import * as React from "react";
import { useContext } from "react";
import { IMovie } from "../interfaces";
import { Store } from "./redux/Store";
import "../styles/List.css";

export type ListProps = {
  onDeleteMovie(id: number): void,
};

type ListItemProps = IMovie & {
  index: number,
};

function ListItem({
  id,
  title,
  genres,
  vote_average,
  overview,
  release_date,
  index,
}: ListItemProps) {
  const [state, dispatch] = useContext(Store);
  const { genreMap } = state;

  function deleteItem() {
    dispatch({ type: "DELETE_ITEM", payload: index });
  }

  return (
    <div key={`${index}__${id}`} className="list-item">
      <div className="list-item-buttons">
        <span onClick={deleteItem}>
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

export function List(): JSX.Element {
  const [state] = useContext(Store);
  const { movies } = state;

  function renderItem(movie: IMovie, index: number) {
    return (
      <ListItem
        {...movie}
        key={movie.id}
        index={index}
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
