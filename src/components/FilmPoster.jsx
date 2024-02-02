import React, { useState } from "react";
import { Link } from "react-router-dom";
import './FilmPoster.css';

const FilmPoster = ({ film }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePosterClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`film-poster ${isFlipped ? "flipped" : ""}`} onClick={handlePosterClick}>
      <div className="poster front">
        <img src={film["#IMG_POSTER"]} alt={film["#TITLE"]} />
      </div>
      <div className="poster back">
        <h2 className="font-bold text-xl">{film["#TITLE"]}</h2>
        <p>Year: {film["#YEAR"]}</p>
        <p>Actors: {film["#ACTORS"]}</p>
        <Link
          to={`/filmDetails/${film["#IMDB_ID"]}`}
          className="reserve-button"
        >
          Comprar entrada
        </Link>
      </div>
    </div>
  );
};

export default FilmPoster;
