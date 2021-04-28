import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import "./style.css";

const MovieItem = ({ movie, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { _id, title, stars, format, year } = movie;

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const deleteConfirmation = (event) => {
    event.preventDefault();

    if (
      window.confirm(`Do tou want to delete the movie ${title} permanently?`)
    ) {
      onDelete(_id);
      //window.location.reload()
    }
  };
  return (
    <div className="movie-card">
      <div className="movie-content">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className="movie-content__front">
            <div className="movie-content__front--inner">
              <div className="movie-content__front--date">
                <span className="movie-content__front--day">{year}</span>
              </div>
            </div>
            <h1 className="movie-content__front--title">{title}</h1>
            <p className="movie-content--text">{format}</p>
            <button
              className="movie-content__front--details"
              onClick={handleClick}
            >
              Details
            </button>
            <button
              onClick={(event) => deleteConfirmation(event)}
              className="movie-content__front--delete btn-outline-danger btn-sm float-right"
            >
              <i className="fa fa-trash-o" />
            </button>
          </div>
          <div>
            <div className="movie-content__inner">
              <div className="movie-content__inner--description">
                <p>Stars:</p>
                <ul>
                  {stars.map((star, index) => (
                    <li key={index}>{star}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="button movie-content__front--details"
              onClick={handleClick}
            >
              Click to flip
            </button>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
};

export default MovieItem;
