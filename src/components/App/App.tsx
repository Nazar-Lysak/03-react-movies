import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showMovie, setShowMovie] = useState<number | null>(null);

  const openPopup = (id:number) => {
    setShowMovie(id)
  }

  const closePopup = () => {
    setShowMovie(null);
  }

  const popupMovie = movies.filter(movie => movie.id === showMovie);

  const handleSearch = async (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.length === 0) {
      toast.error("Please insert your search query.")
      return;
    }

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
      <SearchBar handleClick={handleSearch} />
      {movies.length > 0 && <MovieGrid movies={movies} handleMovie={openPopup} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {showMovie && <MovieModal movie={popupMovie[0]} closePopup={closePopup} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
