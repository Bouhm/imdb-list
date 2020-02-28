import * as React from "react";
import { IMovie } from "../interfaces";
import { memoize } from "../helpers";
import "../styles/List.css";

export type ListProps = {
  movies: IMovie[];
  onDeleteMovie(id: number): void;
};

type ListItemProps = IMovie & {
  index: number;
  onDeleteMovie(id: number): void;
};

export class ListItem extends React.PureComponent<ListItemProps> {
  private memoizeDeleteMovie = memoize((id: number) => {
    this.props.onDeleteMovie(id);
  });

  private handleGenerateGenres(genres: string[]): string {
    return genres.join(",");
  }

  public render() {
    const { id, title, vote_average, overview, release_date, genres, index } = this.props;
    return (
      <div key={`${index}__${id}`} className="list-item">
        <div className="list-item-buttons">
          <span onClick={this.memoizeDeleteMovie(id.toString(), id)}>
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
              <b>Genres:</b> {this.handleGenerateGenres(genres)})}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export class List extends React.Component<ListProps> {

  private renderItem = (movie: IMovie, index: number) => {
    return (
      <ListItem
        {...movie}
        key={movie.id}
        index={index}
        onDeleteMovie={this.props.onDeleteMovie}
      />
    )
  }

  public render() {
    return (
      <div className="list">
        {this.props.movies.map(this.renderItem)}
      </div>
    );
  }
}