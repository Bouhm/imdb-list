import * as React from "react";
import { useEffect, useState } from "react";
import { List } from "./List";
import "./App.css";

export interface IMovie {
  genres: string[];
  overview: string;
  popularity: string;
  title: string;
  vote_average: string;
  release_date: string;
}

export interface IGenre {
  [id: number]: string;
}

const API_URL = "https://api.themoviedb.org/3/";

/**
 * Fetch genres, map genre id to name in state, cache to local storage
 */
export function App(): JSX.Element {
  const [genreMap, setGenreMap] = useState<IGenre>({});
  useEffect(function () {
    // Check local storage if cached
    let genreData: IGenre = {};
    let storedData = window.localStorage.getItem("genres");

    if (!storedData) {
      fetch(
        API_URL +
        `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      )
        .then(function (res: any) {
          return res.json();
        })
        .then(function (data: any) {
          data.genres.forEach(function (genre: any) {
            genreData[genre.id] = genre.name;
          });

          setGenreMap(genreData);
          window.localStorage.setItem("genres", JSON.stringify(genreData));
        });
    } else {
      setGenreMap(JSON.parse(storedData));
    }
  }, []);

  /**
   * Fetch movies, set state, and cache to local storage
   */
  const [movieData, setMovieData] = useState<IMovie[]>([]);
  useEffect(function () {
    // Check local storage if cached
    let movieData: IMovie[];
    let storedData = window.localStorage.getItem("movieList");

    if (!storedData) {
      fetch(
        API_URL +
        `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`,
      )
        .then(function (res: any) {
          return res.json();
        })
        .then(function (data: any) {
          movieData = data.results.map(function (movie: any) {
            return {
              genres: movie.genre_ids.map(function (id: number) { return genreMap[id]; }),
              overview: movie.overview,
              popularity: movie.popularity,
              title: movie.title,
              vote_average: movie.vote_average,
              release_date: movie.release_date,
            };
          });

          setMovieData(movieData);
          window.localStorage.setItem("movieList", JSON.stringify(movieData));
        });
    } else {
      setMovieData(JSON.parse(storedData));
    }
  }, [genreMap]);

  return (
    <div className="app">{movieData && <List movies={movieData} />}</div>
  );
}
