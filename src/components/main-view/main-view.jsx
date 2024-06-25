import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://ramtin-movies-flix-1cd0d9c183b1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
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
  }, [token]);
  if (!user) {
    return ( 
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
        }}
      />
      or
      <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }}/>;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
          <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}/>
      ))}
    </div>
    <button onClick={() => { 
        setUser(null); 
        setToken(null); 
        localStorage.clear();
      }}>Logout</button>
    </div>

  );
};