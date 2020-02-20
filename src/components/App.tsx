import * as React from "react";
import { useEffect, useState } from "react";
import { List } from "./List";
import "./App.css";

interface IData {
  movies: IMovie[];  
}

export interface IMovie {
  genre_ids: number[];
  overview: string;
  popularity: string;
  title: string;
  vote_average: string;
  release_date: string;
}

export function App(): JSX.Element {
  const [data, setData] = useState<IData>({movies: []});

  useEffect(function () {
    const API_URL = "https://api.themoviedb.org/3/";

    // Check local storage if cached
    let moviesData: IMovie[];
    let storedData = window.localStorage.getItem("data");

    if (!storedData) {
      fetch(API_URL + `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`)
      .then(function (res: any) { return res.json(); })
      .then(function (json: any) { 
        moviesData = json.results.map(function (movie: any) {
          return {
            genre_ids: movie.genre_ids,
            overview: movie.overview,
            popularity: movie.popularity,
            title: movie.title,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
          };
        });
        
        setData({movies: moviesData});
        window.localStorage.setItem("data", JSON.stringify(moviesData));
      });
    } else {
      setData({movies: JSON.parse(storedData)});
    }
  }, []); 

  return (
    <div className="app">
      {data.movies && <List movies={data.movies} />}
    </div>
  );
}