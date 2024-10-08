import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const ProfileView = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    fetch(`https://ramtin-movies-flix-1cd0d9c183b1.herokuapp.com/users/${user.username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Profile response: ", response);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data: ", data);
        const userFromApi = {
          id: data._id.$oid,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName, 
          favoriteMovies: data.favoriteMovies,
        };
        dispatch(setUser({ user: userFromApi, token }));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [token, user, dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
        <h2>User Profile</h2>
          <div><strong>Username:</strong> {user.username}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>First Name:</strong> {user.firstName}</div>
          <div><strong>Last Name:</strong> {user.lastName}</div>
          <div><strong>Favorite Movies:</strong> {user.favoriteMovies.join(', ') || "None"}</div>
        </Col>
      </Row>
    </Container>
  );
};
