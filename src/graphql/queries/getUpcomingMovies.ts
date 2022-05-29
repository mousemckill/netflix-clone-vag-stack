import { gql } from "@apollo/client/core";

export const UPCOMING_MOVIES_QUERY = gql`
  query getUpcomingMovies {
    upcomingMovies @rest(type: "UpcomingMovies", path: "/movie/upcoming") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
