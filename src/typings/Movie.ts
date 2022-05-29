export type Movie = {
  title: string;
  backdrop_path: string;
  id: number;
};

export type FullMovie = Movie & {
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
};

type ResultGn<T extends string> = Record<`${T}`, { results: Movie[] }>;

export type UpcomingMovies = ResultGn<"upcomingMovies">;
export type TrendingMovies = ResultGn<"trendingMovies">;
export type TopRatedMovies = ResultGn<"topRatedMovies">;
export type PopularMovies = ResultGn<"popularMovies">;
export type OriginalsMovies = ResultGn<"originalMovies">;
export type NowPlayingMovies = ResultGn<"nowPlayingMovies">;
