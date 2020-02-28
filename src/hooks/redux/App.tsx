import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { List } from "./List";
import { IMovie, IGenreMap } from "../../interfaces";
import "../styles/App.css";
import { Store } from "./Store";

const API_URL = "https://api.themoviedb.org/3/";

/**
 * Fetch genres, map genre id to name in state, cache to local storage
 */
export function HooksApp(): JSX.Element {
  const [state, dispatch] = useContext(Store);
  const { movies, genreMap } = state;

  useEffect(function () {
    // Check local storage if cached
    let genreData: IGenreMap = {};
    let storedData = window.localStorage.getItem("genres");

    if (!storedData) {
      fetch(
        API_URL + `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      )
        .then(function (res: any) {
          return res.json();
        })
        .then(function (data: any) {
          data.genres.forEach(function (genre: any) {
            genreData[genre.id] = genre.name;
          });

          dispatch({ type: "SET_GENRES", payload: genreData });
          window.localStorage.setItem("genres", JSON.stringify(genreData));
        });
    } else {
      dispatch({ type: "SET_GENRES", payload: JSON.parse(storedData) });
    }
  }, []);

  /**
   * Fetch movies, set state, and cache to local storage
   */
  useEffect(
    function () {
      // Check local storage if cached
      let storedData = window.localStorage.getItem("movieList");

      if (!storedData) {
        async function fetchMovies() {
          const numPages = 25; // 500 results

          let allMovies: IMovie[] = [];

          for (let i = 1; i <= numPages; i++) {
            await fetch(
              API_URL +
              `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${i}`,
            )
              .then(function (res: any) {
                return res.json();
              })
              .then(function (data: any) {
                data.results.forEach(function (movie: any) {
                  allMovies.push({
                    id: movie.id,
                    genres: movie.genre_ids.map(function (id: number) {
                      return genreMap[id];
                    }),
                    overview: movie.overview,
                    popularity: movie.popularity,
                    title: movie.title,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                  });
                });
              });
          }

          return allMovies;
        }

        fetchMovies().then(function (allMovies: IMovie[]) {
          dispatch({ type: "SET_MOVIES", payload: allMovies });
          window.localStorage.setItem("movieList", JSON.stringify(allMovies));
        });
      } else {
        dispatch({ type: "SET_MOVIES", payload: JSON.parse(storedData) });
      }
    },
    [genreMap],
  );

  const [showList, setShowList] = useState<boolean>(false);
  function handleToggleView() {
    setShowList(!showList);
  }

  return (
    <div className="app">
      {!showList ? (
        <div className="home">
          <h1>
            Classes vs <span className="highlight">Hooks</span>
          </h1>
          <img src={process.env.PUBLIC_URL + "image.png"} alt="hooks" />
          <br />
          <button onClick={handleToggleView}>Render List</button>
        </div>
      ) : (
          <div className="list-container">
            <div className="stickybar">
              <button onClick={handleToggleView}>Back</button>
            </div>
            {movies.length && (
              <List />
            )}
          </div>
        )}
    </div>
  );
}
