export interface IMovie {
  id: number;
  genres: string[];
  overview: string;
  popularity: string;
  title: string;
  vote_average: string;
  release_date: string;
}

export interface IGenreMap {
  [id: number]: string;
}