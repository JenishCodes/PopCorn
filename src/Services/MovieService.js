import firebaseConfig from "../Config/config";
import sort from "../Utils/sort";

export const getMovies = async (titles = null, sortBy = "Release Date") => {
  if (titles !== null && titles.length === 0) return [];

  const allMovies = [];
  const movies = await firebaseConfig
    .firestore()
    .collection("movie")
    .where(
      "title",
      titles !== null ? "in" : "not-in",
      titles !== null ? titles : [123456789]
    )
    .get();

  movies.forEach((movie) => allMovies.push({ id: movie.id, ...movie.data() }));

  return sort(allMovies, sortBy, titles);
};

export const upadateRating = async (user, movie, newRating, oldRating) => {
  const index = user.rated.indexOf({ movie: movie.title, rating: oldRating });
  const oldMovie = user.rated.pop(index);
  const newMovie = { ...oldMovie, rating: newRating };
  user.rated.push(newMovie);

  await firebaseConfig.firestore().collection("user").doc(user.id).update({
    rated: user.rated,
  });

  const newRate = movie.rating - (oldRating - newRating) / movie.raters;

  await firebaseConfig.firestore().collection("movie").doc(movie.id).update({
    rating: newRate,
  });
};

export const deleteRating = async (user, movie, oldRating) => {
  const index = user.rated.indexOf({ movie: movie.title, rating: oldRating });
  user.rated.pop(index);

  await firebaseConfig.firestore().collection("user").doc(user.id).update({
    rated: user.rated,
  });

  const newRate =
    movie.raters > 1
      ? (movie.rating * movie.raters - oldRating) / (movie.raters - 1)
      : 0;

  await firebaseConfig
    .firestore()
    .collection("movie")
    .doc(movie.id)
    .update({
      rating: newRate,
      raters: Math.max(movie.raters - 1, 0),
    });
};

export const giveNewRating = async (user, movie, rating) => {
  user.rated.push({ movie: movie.title, rating });

  await firebaseConfig.firestore().collection("user").doc(user.id).update({
    rated: user.rated,
  });

  const newRate = (movie.rating * movie.raters + rating) / (movie.raters + 1);

  await firebaseConfig
    .firestore()
    .collection("movie")
    .doc(movie.id)
    .update({
      rating: newRate,
      raters: movie.raters + 1,
    });
};

export const addToWatchlist = async (id, watchlist, title) => {
  watchlist.push(title);
  await firebaseConfig.firestore().collection("user").doc(id).update({
    watchlist,
  });
};

export const removeFromWatchlist = async (id, watchlist, title) => {
  const newWatchlist = watchlist.filter((movie) => movie !== title);
  await firebaseConfig.firestore().collection("user").doc(id).update({
    watchlist: newWatchlist,
  });
};
