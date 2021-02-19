import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import {
  addToWatchlist,
  deleteRating,
  getMovies,
  giveNewRating,
  removeFromWatchlist,
  upadateRating,
} from "../Services/MovieService";
import StarRating from "react-rating-stars-component";
import { getUser } from "../Services/UserService";
import BreadCrumbs from "./BreadCrumbs";
import "../Styles/moviepage.css";
import Loading from "./Loading";

function MoviePage(props) {
  const [currentMovie, setCurrentMovie] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userRating, setUserRating] = useState(0);
  const [movieRating, setMovieRating] = useState(0);
  const [inWatchlist, hasInWatchlist] = useState();
  const ratingStars = useRef();

  const getData = () => {
    getUser(currentUser.id).then((user) => setCurrentUser(user));

    getMovies([props.match.params.title]).then((movie) => {
      if (currentUser.watchlist.indexOf(movie[0].title) !== -1) {
        hasInWatchlist(true);
      } else {
        hasInWatchlist(false);
      }

      setCurrentMovie(movie[0]);
      setMovieRating(movie[0].rating);

      const ratedMovie = currentUser.rated.find((one) => {
        return one.movie === movie[0].title;
      });

      if (ratedMovie) setUserRating(ratedMovie.rating);
    });
  };

  useEffect(() => {
    if (currentUser) getData();
    // eslint-disable-next-line
  }, [inWatchlist, userRating]);

  if (!currentUser) return <Redirect to="/signin" />;

  return currentMovie ? (
    <div id="site-content">
      <div className="main-content">
        <div className="container">
          <div className="page">
            <BreadCrumbs elements={[currentMovie.title]} />
            <div className="content">
              <div className="row">
                <div className="movie-image-container">
                  <figure className="movie-image">
                    <img
                      style={{ width: "100%" }}
                      src={currentMovie.poster}
                      alt="#"
                    />
                  </figure>
                </div>
                <div className="movie-info-container">
                  <div className="movie-title-container">
                    <div className="flex-title">
                      <h1 className="bookmark-icon">
                        <i
                          className={
                            inWatchlist ? "fa fa-bookmark" : "fa fa-bookmark-o"
                          }
                          onClick={() => {
                            try {
                              if (!inWatchlist) {
                                addToWatchlist(
                                  currentUser.id,
                                  currentUser.watchlist,
                                  currentMovie.title
                                ).then(() => hasInWatchlist(true));
                              } else {
                                removeFromWatchlist(
                                  currentUser.id,
                                  currentUser.watchlist,
                                  currentMovie.title
                                ).then(() => hasInWatchlist(false));
                              }
                            } catch (err) {
                              return;
                            }
                          }}
                        />
                      </h1>
                      <h2 className="movie-title">{currentMovie.title}</h2>
                    </div>
                    <div className="flex-rating">
                      <h2 className="star-icon">
                        <i
                          className="fa fa-star"
                          style={{ color: "#eede6a" }}
                        />
                      </h2>
                      <h2>{movieRating.toFixed(1)}</h2>/10
                    </div>
                  </div>
                  <div className="movie-summary">
                    {currentMovie.shortDiscription}
                  </div>
                  <div className="movie-ratings">
                    <strong>Your Rating: </strong>
                    <button
                      className="rating-values"
                      onClick={() =>
                        ratingStars.current.style.display === "none"
                          ? (ratingStars.current.style.display = "flex")
                          : (ratingStars.current.style.display = "none")
                      }
                    >
                      {userRating !== 0 ? (
                        <span>
                          <i
                            className="fa fa-star"
                            style={{
                              color: "#e35b63",
                              fontSize: "1.2rem",
                              marginRight: "2px",
                            }}
                          />
                          <span
                            style={{ fontSize: "1.2rem", color: "#9ea1a6" }}
                          >
                            {userRating}
                          </span>
                        </span>
                      ) : (
                        <span style={{ color: "#9ea1a6" }}>Not Rated</span>
                      )}
                    </button>
                    <span
                      ref={ratingStars}
                      style={{
                        display: "none",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <StarRating
                        count={10}
                        value={userRating}
                        filledIcon={
                          <i
                            className="fa fa-star"
                            style={{ color: "#e35b63" }}
                          />
                        }
                        emptyIcon={
                          <i className="fa fa-star" style={{ color: "grey" }} />
                        }
                        onChange={(rating) => {
                          if (userRating === 0) {
                            giveNewRating(
                              currentUser,
                              currentMovie,
                              rating
                            ).then(() => {
                              setUserRating(rating);
                              ratingStars.current.style.display = "none";
                            });
                          } else {
                            upadateRating(
                              currentUser,
                              currentMovie,
                              rating,
                              userRating
                            ).then(() => {
                              setUserRating(rating);
                              ratingStars.current.style.display = "none";
                            });
                          }
                        }}
                      />
                      {userRating !== 0 ? (
                        <>
                          <span className="ver-line" />
                          <h3
                            onClick={() => {
                              deleteRating(
                                currentUser,
                                currentMovie,
                                userRating
                              ).then(() => {
                                setUserRating(0);
                                ratingStars.current.style.display = "none";
                              });
                            }}
                          >
                            <i className="fa fa-trash-o" />
                          </h3>
                        </>
                      ) : null}
                    </span>
                  </div>
                  <div className="movie-data">
                    <div className="movie-info-value">
                      <strong>Length: </strong>
                      <span>{currentMovie.runtime + " min"}</span>
                    </div>
                    <div className="movie-info-value">
                      <strong>Premiere: </strong>{" "}
                      <span>
                        {new Date(
                          currentMovie.releaseDate.seconds * 1000
                        ).toDateString()}
                      </span>
                    </div>
                    <div className="movie-info-value">
                      <strong>Category: </strong>
                      <span>{currentMovie.genres.join(" | ")}</span>
                    </div>
                  </div>
                  <div className="movie-collections">
                    <div className="movie-info-value">
                      <strong>Budget: </strong>
                      <span>{currentMovie.budget}</span>
                    </div>
                    <div className="movie-info-value">
                      <strong>Box Office: </strong>
                      <span>{currentMovie.collection}</span>
                    </div>
                  </div>
                  <div className="movie-starring">
                    <div className="movie-info-value">
                      <strong>Directors: </strong>
                      <span>{currentMovie.directors.join(", ")}</span>
                    </div>
                    <div className="movie-info-value">
                      <strong>Writers: </strong>
                      <span>{currentMovie.writers.join(", ")}</span>
                    </div>
                    <div className="movie-info-value">
                      <strong>Stars: </strong>
                      <span>{currentMovie.stars.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="movie-cast-container">
                <h2 style={{ marginBottom: 1 + "rem" }}>Cast</h2>
                <table className="movie-cast">
                  {currentMovie.cast
                    ? currentMovie.cast.map((one) => (
                        <tr
                          key={one.name}
                          className={
                            currentMovie.cast.indexOf(one) % 2 === 0
                              ? "odd-cast"
                              : "even-cast"
                          }
                        >
                          <td style={{ width: 40 + "%" }}>{one.name}</td>
                          <td style={{ width: 10 + "%" }}>
                            <strong>---</strong>
                          </td>
                          <td style={{ width: 50 + "%" }}>{one.role}</td>
                        </tr>
                      ))
                    : null}
                </table>
              </div>
              <div className="story-container">
                <h2 style={{ marginBottom: 1 + "rem" }}>Story Line</h2>
                {currentMovie.story.map((para) => (
                  <p style={{ textAlign: "justify" }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MoviePage;
