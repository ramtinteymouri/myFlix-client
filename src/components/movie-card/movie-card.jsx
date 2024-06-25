import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Genre: {movie.genre.name}</Card.Text>
        <Card.Text>Director: {movie.director.name}</Card.Text>
        <Card.Text>Rate: {movie.rating}</Card.Text>
        <Button variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired
    }),
    additionalAttributes: PropTypes.shape({
      runtime: PropTypes.number.isRequired,
      mainActors: PropTypes.array.isRequired
    }),
    releaseYear: PropTypes.number.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};