import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "../Styles/moviecard.css";
import Loading from "./Loading";

function MovieCard({ movies, page }) {
  const { currentUser } = useContext(AuthContext);

  return movies && movies.length !== 0 ? (
    <div className={page !== "Home" ? "profile-movie-list" : "home-movie-list"}>
      {movies.map((movie) => {
        if (currentUser) {
          var rating = 0;
          const ratedMovie = currentUser.rated.find(
            (one) => one.movie === movie.title
          );

          if (ratedMovie) rating = ratedMovie.rating;
        }
        return (
          <div key={movie.title} className="card">
            <figure className="card-image-container">
              <Link className="card-title" to={"/movie/" + movie.title}>
                <img className="card-image" src={movie.poster} alt="#" />
              </Link>
            </figure>
            <div className="card-info">
              <div className="card-title-container">
                <Link className="card-title" to={"/movie/" + movie.title}>
                  {movie.title}
                </Link>
              </div>
              {page !== "Watchlist" ? (
                <div className="card-ratings">
                  <div className="card-movie-rating">
                    <i className="fa fa-star card-movie-rating-star" />{" "}
                    {movie.rating.toFixed(1)}
                  </div>
                  {currentUser ? (
                    <div className="card-user-rating">
                      <i className="fa fa-star card-user-rating-star" />{" "}
                      {rating}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  ) : page === "home" ? (
    <Loading />
  ) : (
    <div style={{ textAlign: "center" }}>There is no movie in {page}.</div>
  );
}

export default MovieCard;
