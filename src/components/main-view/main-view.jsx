import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Pulp Fiction", image: "https://fakeimg.pl/150x220?text=Pup+Fiction", director:"Quentin Tarantino" },
    { id: 2, title: "The Shawshank Redemption", image: "https://fakeimg.pl/150x220?text=The+Shawshank+Redemption", director:"Frank Darabont" },
    { id: 3, title: "The Godfather", image: "https://fakeimg.pl/150x220?text=The+Godfather", director:"Francis Ford Coppola" },
    { id: 4, title: "The Dark Knight", image: "https://fakeimg.pl/150x220?text=The+Dark+Knight", director:"Christopher Nolan" },
    { id: 5, title: "12 Angry Men", image: "https://fakeimg.pl/150x220?text=12+Angry+Men", director:"Sidney Lumet" }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => {setSelectedMovie(null)}}/>;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}/>
      ))}
    </div>
  );
};