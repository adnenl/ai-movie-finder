export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}