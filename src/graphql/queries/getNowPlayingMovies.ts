import { gql } from "@apollo/client/core";

export const NOW_PLAYING_MOVIES_QUERY = gql`
  query getNowPlayingMovies {
    nowPlayingMovies
      @rest(type: "NowPlayingMovies", path: "/movie/now_playing") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
