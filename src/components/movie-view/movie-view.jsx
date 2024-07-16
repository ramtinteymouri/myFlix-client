import { useParams } from "react-router";
import { Link } from "react-router-dom";
export const MovieView = ({ movies}) => {
  const placeholderImage = 'https://placehold.co/259x384';
  const movieImage = placeholderImage;
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
    return (
      <div>
      <div>
        <img className="W-100" src={movieImage} />
      </div>
       <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Nationality: </span>
        <span>{movie.director.nationality}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Director Birth Date: </span>
        <span>{movie.director.birthDate}</span>
      </div>
      <div>
        <span>Rating: </span>
        <span>{movie.rating}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Runtime: </span>
        <span>{movie.additionalAttributes.runtime} minutes</span>
      </div>
      <div>
        <span>Main Actors: </span>
        <span>{movie.additionalAttributes.mainActors.join(', ')}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.releaseYear}</span>
      </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    );
  };