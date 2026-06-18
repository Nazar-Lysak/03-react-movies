import axios from "axios";
import type { Movie } from "../types/movie";


const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      query
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data.results;
};
