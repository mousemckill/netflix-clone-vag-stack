import { gql } from "@apollo/client/core";

export const GET_TRENDING_MOVIES_QUERY = gql`
  query getTrendingMovies {
    trendingMovies @rest(type: "TrendingMovies", path: "/trending/movie/day") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
