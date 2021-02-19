import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router-dom";
import MovieCard from "./MovieCard";
import { getMovies } from "../Services/MovieService";
import { deleteUser, updateUser } from "../Services/UserService";
import BreadCrumbs from "./BreadCrumbs";
import { logout } from "../Services/AuthService";
import "../Styles/profile.css";

function Profile() {
  const [active, setActive] = useState("Rated Movies");
  const { currentUser } = useContext(AuthContext);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState();
  const [sortBy, setSortBy] = useState("Date Added");
  const [order, setOrder] = useState(false);
  const [name, setName] = useState(currentUser && currentUser.name);
  const picker = useRef();

  useEffect(() => {
    sortRated();
    sortWatchlist();
    // eslint-disable-next-line
  }, [order, sortBy]);

  const sortWatchlist = () => {
    const watchlist = [];

    currentUser.watchlist.forEach((one) => watchlist.push(one));

    getMovies(watchlist, sortBy).then((movies) => {
      if (sortBy === "Your Rating")
        movies.sort((a, b) => {
          const aMovie = ratedMovies.find((one) => {
            return one.title === a.title;
          });
          const bMovie = ratedMovies.find((one) => {
            return one.title === b.title;
          });
          const aRating = aMovie ? aMovie.rating : 0;
          const bRating = bMovie ? bMovie.rating : 0;
          return aRating - bRating;
        });
      if (!order) movies.reverse();
      setWatchlistMovies(movies);
    });
  };

  const sortRated = () => {
    const rated = [];

    currentUser.rated.forEach((one) => rated.push(one.movie));

    getMovies(rated, sortBy).then((movies) => {
      if (sortBy === "Your Rating")
        movies.sort((a, b) => {
          const aMovie = ratedMovies.find((one) => {
            return one.title === a.title;
          });
          const bMovie = ratedMovies.find((one) => {
            return one.title === b.title;
          });
          const aRating = aMovie ? aMovie.rating : 0;
          const bRating = bMovie ? bMovie.rating : 0;
          return aRating - bRating;
        });
      if (!order) movies.reverse();
      setRatedMovies(movies);
    });
  };

  return !currentUser ? (
    <Redirect to="/signin" />
  ) : (
    <div id="site-content">
      <div className="main-content">
        <div className="container">
          <div className="page">
            <BreadCrumbs elements={[currentUser.name, active]} />
            <div className="profile-container">
              <div className="profile">
                <div className="info">
                  <div className="profile-img-container">
                    <img
                      className="profile-img"
                      alt="Profile"
                      src={
                        !photo ? currentUser.photo : URL.createObjectURL(photo)
                      }
                      onClick={() => {
                        if (picker.current) picker.current.click();
                      }}
                    />
                    {editing ? (
                      <input
                        type="file"
                        ref={picker}
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="profile-img-picker"
                      />
                    ) : null}
                  </div>
                  <div className="profile-info-container">
                    <div className="profile-name-container">
                      <span>
                        Name:{" "}
                        {!editing ? (
                          name
                        ) : (
                          <input
                            className="profile-name-input"
                            autoFocus={true}
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                          />
                        )}
                      </span>
                    </div>
                    <div className="profile-email-container">
                      Email: {currentUser.email}
                    </div>
                    <div
                      className="profile-watchlist-btn"
                      onClick={() => setActive("Watchlist")}
                    >
                      <span>Watchlist</span>
                      <span>{currentUser.watchlist.length}</span>
                    </div>
                    <div
                      className="profile-rated-btn"
                      onClick={() => setActive("Rated Movies")}
                    >
                      <span>Rated Movies</span>
                      <span>{currentUser.rated.length}</span>
                    </div>
                    <div
                      className="profile-signout-container"
                      onClick={() => logout()}
                    >
                      <span>Sign Out</span>
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                  <button
                    className="profile-btn"
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = "deepskyblue";
                      if (editing) {
                        updateUser(currentUser.id, name, photo);
                      }
                      setEditing(!editing);
                    }}
                    onMouseUp={(e) =>
                      (e.currentTarget.style.backgroundColor = "blue")
                    }
                  >
                    {editing ? "Save" : "Edit Profile"}
                  </button>
                  <button
                    className="delete-btn"
                    onMouseDown={(e) => {
                      const response = window.confirm(
                        "Deleting account will remove all your data and settings."
                      );
                      if (response) deleteUser(currentUser.id);
                      e.currentTarget.style.backgroundColor = "#e35b63";
                    }}
                    onMouseUp={(e) =>
                      (e.currentTarget.style.backgroundColor = "red")
                    }
                  >
                    Delete Account
                  </button>
                </div>
              </div>
              <div className="profile-line" />
              <div className="movie-container">
                <div>
                  <select
                    className="home-dropdown"
                    defaultValue="All"
                    style={{ margin: "0 10px 15px 0" }}
                    onChange={(input) => setSortBy(input.target.value)}
                  >
                    <option value="Date Added">Date Added</option>
                    <option value="PopCorn Rating">PopCorn Rating</option>
                    <option value="Your Rating">Your Rating</option>
                    <option value="Alphabetical">Alphabetical</option>
                    <option value="Release Date">Release Date</option>
                    <option value="Number of Raters">Number of Raters</option>
                  </select>
                  <i
                    className={
                      order ? "fa fa-sort-amount-asc" : "fa fa-sort-amount-desc"
                    }
                    onClick={() => setOrder(!order)}
                    style={{
                      padding: "10px",
                      border: "solid 1px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                {active === "Watchlist" ? (
                  <MovieCard movies={watchlistMovies} page="Watchlist" />
                ) : (
                  <MovieCard movies={ratedMovies} page="Rated Movies" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
