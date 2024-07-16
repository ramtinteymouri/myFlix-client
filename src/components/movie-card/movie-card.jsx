import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MovieCard = ({movie}) => {
  const placeholderImage = 'https://placehold.co/2592x3840';
  const movieImage = placeholderImage;
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieImage} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Genre: {movie.genre.name}</Card.Text>
        <Card.Text>Director: {movie.director.name}</Card.Text>
        <Card.Text>Rate: {movie.rating}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">
            Open
          </Button>
        </Link>
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
};