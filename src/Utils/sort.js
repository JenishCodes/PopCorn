import _ from "lodash";

export default function sort(itemArray, sortBy, sortingArray) {
  if (sortBy === "Alphabetical")
    return _.sortBy(itemArray, ["title", "releaseDate"]);
  else if (sortBy === "PopCorn Rating")
    return _.sortBy(itemArray, ["rating", "title"]);
  else if (sortBy === "Release Date")
    return _.sortBy(itemArray, ["releaseDate", "title"]);
  else if (sortBy === "Number of Raters")
    return _.sortBy(itemArray, ["raters", "title"]);
  else if (sortBy === "Date Added") {
    return itemArray.sort((a, b) => {
      return sortingArray.indexOf(a.title) - sortingArray.indexOf(b.title);
    });
  }
  return itemArray;
}
