import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { MoviesList } from "../movies-list/movies-list";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [token, setToken] = useState(storedToken);
  //const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://ramtin-movies-flix-1cd0d9c183b1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          id: doc._id,
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
        }));

        dispatch(setMovies(moviesFromApi));
      });
  }, [token, dispatch]);

  const onLoggedOut = () => {
    dispatch(setUser(null));
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView /> {/* No movies prop needed */}
                </Col>
              )
            }
          />
          <Route
            path="/profile/:username"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <MoviesList />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};