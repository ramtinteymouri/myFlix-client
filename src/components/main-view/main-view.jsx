import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch("https://ramtin-movies-flix-1cd0d9c183b1.herokuapp.com/movies")
    .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id.$oid,
            title: doc.title,
            genre: {
              name: doc.genre.name,
              description: doc.genre.description,
            },
            director: {
              name: doc.director.name,
              nationality: doc.director.nationality,
              bio: doc.director.bio,
              birthDate: doc.director.birthDate,
            },
            rating: doc.rating,
            description: doc.description,
            additionalAttributes: {
              runtime: doc.additionalAttributes.runtime,
              mainActors: doc.additionalAttributes.mainActors,
            },
            releaseYear: doc.releaseYear,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

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