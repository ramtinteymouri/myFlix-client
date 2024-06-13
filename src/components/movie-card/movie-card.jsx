import PropTypes from "prop-types";
export const MovieCard = ({movie, onMovieClick}) => {
  return (<div onClick={() => {
    onMovieClick(movie);
  }}>{movie.title}</div>
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