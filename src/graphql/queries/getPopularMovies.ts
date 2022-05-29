import { gql } from "@apollo/client/core";

export const POPULAR_MOVIES_QUERY = gql`
  query getPopularMovies {
    popularMovies @rest(type: "PopularMovies", path: "/movie/popular") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
