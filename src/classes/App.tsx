import * as React from "react";
import { List } from "./List";
import { IMovie, IGenreMap } from "../interfaces";
import "../styles/App.css";

const API_URL = "https://api.themoviedb.org/3/";

export type ClassesAppProps = {};

type ClassesAppState = {
  allMovies?: IMovie[];
  genreMap?: IGenreMap;
  showList?: boolean;
};

export class ClassImdbApp extends React.Component<ClassesAppProps, ClassesAppState> {
  state: ClassesAppState = {};

  public async componentDidMount() {
    // Check local storage if cached
    let storedGenres = window.localStorage.getItem("genres");

    if (!storedGenres) {
      await fetch(
        API_URL +
        `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      )
        .then(this.handleGenerateJson)
        .then(this.handleGenerateGenreMap);
    } 
    else {
      this.setState({ genreMap: JSON.parse(storedGenres) });
    }

    // Check local storage if cached
    let storedMovies = window.localStorage.getItem("movieList");

    if (!storedMovies) {
      const allMovies: IMovie[] = await this.handleFetchMovies();
      this.setState({ allMovies });
      window.localStorage.setItem("movieList", JSON.stringify(allMovies));
    }
    else {
      this.setState({ allMovies: JSON.parse(storedMovies) });
    }
  }

  private handleGenerateJson(res: any) {
    return res.json();
  }

  private handleGenerateGenreMap(data: any): IGenreMap {
    const genreMap: IGenreMap = {};

    for (let i = 0; i < data.genres.length; i++) {
      const g = data.genres[i];
      genreMap[g.id] = g.name;
    }

    window.localStorage.setItem("genres", JSON.stringify(genreMap));

    return genreMap;
  }
  
  private handleGenerateMovieSet = (data: any) => {
    const movieSet: IMovie[] = [];
    for (let i = 0; i < data.results.length; i++) {
      const movie = data.results[i];
      movieSet.push({
        id: movie.id,
        genres: movie.genre_ids.map(this.handleFindGenre),
        overview: movie.overview,
        popularity: movie.popularity,
        title: movie.title,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      });
    }
    return movieSet;
  }

  private handleFindGenre = (id: number) => {
    return (this.state.genreMap || {})[id];
  }
  
  private async handleFetchMovies(): Promise<IMovie[]> {
    let allMovies: IMovie[] = [];
    for (let i = 1; i <= 25; i++) {
      const mSet = await fetch(
        API_URL +
        `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${i}`,
      )
        .then(this.handleGenerateJson)
        .then(this.handleGenerateMovieSet);

      allMovies = allMovies.concat(mSet);
    }
    return allMovies;
  }

  private handleToggleView = () => {
    this.setState({ showList: !this.state.showList });
  }

  private handleDeleteMovie = (id: number) => {
    const allMovies = this.state.allMovies;

    if (!Array.isArray(allMovies)) {
      return;
    }

    const filteredMovies: IMovie[] = [];     
    
    for (let i = 0; i < allMovies.length; i++) {
      if (allMovies[i].id !== id) {
        filteredMovies.push(allMovies[i]);
      }
    }

    this.setState({ allMovies: filteredMovies });
  }

  public render() {
    const { showList, allMovies } = this.state;
    return (
      <div className="app">
        {!showList ?
          (
            <div className="home">
              <h1><span className="highlight">Classes</span> vs Hooks</h1>
              <img src={process.env.PUBLIC_URL + "image.png"} alt="hooks" />
              <br />
              <button onClick={this.handleToggleView}>Render List</button>
            </div>
          ) : (
            <div className="list-container">
              <div className="stickybar">
                <button onClick={this.handleToggleView}>Back</button>
              </div>
              {Array.isArray(allMovies) && <List movies={allMovies} onDeleteMovie={this.handleDeleteMovie} />}
            </div>
          )}
      </div>
    );
  }
}