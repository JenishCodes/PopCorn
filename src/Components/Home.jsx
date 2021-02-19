import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import { paginate } from "../Utils/paginate";
import { getMovies } from "../Services/MovieService";
import "../Styles/home.css";
import Loading from "./Loading";

function Home() {
  const [movies, setMovies] = useState([]);
  const [finalMovies, setFinalMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [rating, setRating] = useState("All");

  useEffect(() => {
    getMovies().then((movie) => {
      movie.reverse();
      setMovies(movie);
      setFinalMovies(movie);
    });
  }, []);

  useEffect(() => {
    var filteredMovies = movies;
    if (rating !== "All") {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.rating > rating;
      });
    }

    if (year !== "All") {
      filteredMovies = filteredMovies.filter((movie) => {
        return (
          new Date(movie.releaseDate.seconds * 1000)
            .getFullYear()
            .toString() === year
        );
      });
    }

    if (genre !== "All") {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.genres.includes(genre);
      });
    }

    if (query !== "") {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.title.startsWith(
          query.slice(0, 1).toUpperCase() + query.slice(1).toLowerCase()
        );
      });
    }
    setCurrentPage(1);
    setFinalMovies(filteredMovies);
  }, [query, year, rating, genre, movies]);

  const mobile_menu = useRef();

  return finalMovies ? (
    <div id="site-content">
      <div className="main-content">
        <div className="container">
          <div className="page">
            <div className="refine-container">
              <div className="web-refine-container">
                <input
                  type="text"
                  className="home-refine-search"
                  placeholder="Search..."
                  onChange={(text) => setQuery(text.target.value.trim())}
                />
                <div className="web-refines">
                  <select
                    className="home-dropdown"
                    onChange={(input) => setGenre(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Biography">Biography</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Drama">Drama</option>
                    <option value="Family">Family</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="History">History</option>
                    <option value="Horror">Horror</option>
                    <option value="Music">Music</option>
                    <option value="Musical">Musical</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="War">War</option>
                  </select>
                  <select
                    className="home-dropdown"
                    onChange={(input) => setYear(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                  </select>
                  <select
                    className="home-dropdown"
                    onChange={(input) => setRating(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="9">9+</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                    <option value="2">2+</option>
                    <option value="1">1+</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    mobile_menu.current.style.display === "flex"
                      ? (mobile_menu.current.style.display = "none")
                      : (mobile_menu.current.style.display = "flex");
                  }}
                  className="home-refine-toggle"
                >
                  Refines
                </button>
              </div>
              <div className="mob-refine-container">
                <div ref={mobile_menu} className="mob-refines">
                  <select
                    className="home-dropdown"
                    onChange={(input) => setGenre(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Frictional">Frictional</option>
                    <option value="Biography">Biography</option>
                    <option value="Crime">Crime</option>
                    <option value="Religious">Religious</option>
                    <option value="Family">Family</option>
                    <option value="Thriller">Thriller</option>
                  </select>
                  <select
                    className="home-dropdown"
                    onChange={(input) => setYear(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                  </select>
                  <select
                    className="home-dropdown"
                    onChange={(input) => setRating(input.target.value)}
                    defaultValue="All"
                  >
                    <option value="All">All</option>
                    <option value="9">9+</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                    <option value="2">2+</option>
                    <option value="1">1+</option>
                  </select>
                </div>
              </div>
            </div>

            <MovieCard
              movies={paginate(finalMovies, currentPage, pageSize)}
              page="Home"
            />
            <Pagination
              pageSize={pageSize}
              itemCount={finalMovies.length}
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
