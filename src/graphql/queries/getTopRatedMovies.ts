import { gql } from "@apollo/client/core";

export const TOP_RATED_MOVIES = gql`
  query getTopRatedMovies {
    topRatedMovies @rest(type: "TopRatedMovies", path: "/movie/top_rated") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
