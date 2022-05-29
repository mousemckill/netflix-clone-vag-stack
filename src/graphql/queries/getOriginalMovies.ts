import { gql } from "@apollo/client/core";

export const ORIGINAL_MOVIES_QUERY = gql`
  query getOriginalMovies {
    originalMovies @rest(type: "OriginalMovies", path: "/discover/movie") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
