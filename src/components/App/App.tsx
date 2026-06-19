import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showMovie, setShowMovie] = useState<Movie | null>(null);

  const openPopup = (movie:Movie) => {
    setShowMovie(movie);
  }

  const closePopup = () => {
    setShowMovie(null);
  }

  const onSubmit = async (query: string) => {

    try {
      setIsError(false);
      setMovies([]);
      setIsLoading(true);
      const response = await fetchMovies(query);
      setMovies(response);
    } catch {
      setIsError(true);
      toast.error("No movies found for your request.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openPopup} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {showMovie && <MovieModal movie={showMovie} onClose={closePopup} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
