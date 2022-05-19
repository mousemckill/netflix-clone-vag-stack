# Vue 3 + Apollo + GraphQL + TypeScript + Vite

### Stack:
- [Vite](https://vitejs.dev/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)

## Introduction
1. Clone repository
   ```bash
   git clone https://github.com/mousemckill/netflix-clone-vag-stack.git
   ```
2. Navigate to folder with source code
   ```bash
   cd netflix-clone-vag-stack
   ```
3. Install dependencies
   ```bash
   yarn
   ```
   or
   ```bash
   npm install
   ```
4. Run dev
   ```bash
   yarn dev
   ```
   or
   ```bash
   npm run dev
   ```

## Setup
1. Install dependencies
   ```bash
   yarn add @vue/apollo-composable graphql @apollo/client apollo-link-rest
   ```
   or
   ```bash
   npm install @vue/apollo-composable graphql @apollo/client apollo-link-rest
   ```

2. Get TMDB API key
   - Open in browser https://www.themoviedb.org/
   - Click by Join TMDB
   - Fill SignUp form and press SignUp button
   - Login with email and password
   - Go to https://www.themoviedb.org/settings/api
   - Copy `API Key (v3 auth)` value
   - Open file `.env` and enter that key value

## Work with code
1. Create Apollo Client
   Create file `src/apolloClient.ts` and add
   ```javascript
    import { ApolloClient, InMemoryCache } from "@apollo/client/core";
    import { RestLink } from "apollo-link-rest";

    const API_KEY = import.meta.env.VITE_API_KEY;

    const customFetch = (uri: RequestInfo, options: RequestInit) => {
      return fetch(`${uri}?api_key=${API_KEY}`, options);
    };

    const restLink = new RestLink({
      uri: "https://api.themoviedb.org/3",
      customFetch,
    });

    const cache = new InMemoryCache();

    export const apolloClient = new ApolloClient({
      link: restLink,
      cache,
    });
   ```
2. Connect Apollo Client to Vue 
   Open `src/main.ts` and replace all to
    ```javascript
    import { createApp, provide, h } from "vue";
    import { DefaultApolloClient } from "@vue/apollo-composable";

    import App from "./App.vue";
    import { apolloClient } from "./apolloClient";

    import "./index.css";

    const app = createApp({
      setup() {
        provide(DefaultApolloClient, apolloClient);
      },
      render: () => h(App),
    });

    app.mount("#app");
    ```
3. Create file `src/graphql/schema.graphql`
    ```graphql
    directive @type(name: String!) on FIELD
    directive @type(name: String!) on FIELD
    directive @rest(path: String!, type: String) on FIELD

    type Movie {
      title: String!
      backdrop_path: String!
      id: Int!
    }

    type MovieFull {
      id: Int
      title: String
      backdrop_path: String
      release_date: String
      overview: String
      vote_average: Int
      vote_count: Int
    }

    type MoviePayload {
      results: Movie
    }

    type Query {
      trendingMovies: MoviePayload!
      nowPlayingMovies: MoviePayload!
      originalMovies: MoviePayload!
      topRatedMovies: MoviePayload!
      popularMovies: MoviePayload!
      upcomingMovies: MoviePayload!
      movie(id: String!): MovieFull!
    }

    schema {
      query: Query
    }
    ```
4. Create file `src/graphql/queries/getUpcomingMovies.ts`
    ```typescript
    import { gql } from "@apollo/client/core";

    export const UPCOMING_MOVIES_QUERY = gql`
      query getUpcomingMovies {
        upcomingMovies @rest(path: "/movie/upcoming") {
          results @type(name: "Movie") {
            title
            backdrop_path
            id
          }
        }
      }
    `;

    ```
5. Open file `src/components/UpcomingMovies.vue` and replace all to
    ```html
    <script setup lang="ts">
    import { useQuery } from "@vue/apollo-composable";

    import MoviesSection from "./MoviesSection.vue";
    import { UpcomingMovies } from "../typings/Movie";
    import { UPCOMING_MOVIES_QUERY } from "../graphql/queries/getUpcomingMovies";

    const { result } = useQuery<UpcomingMovies>(UPCOMING_MOVIES_QUERY);
    </script>

    <template>
      <MoviesSection
        v-if="result"
        title="Upcoming"
        :items="result.upcomingMovies.results"
      />
    </template>
    ```
6. Repeat 4 and 5 steps for other components contains `MovieSection` 
7. Create file `src/graphql/queries/getMovie.ts`
    ```TypeScript
    import { gql } from "@apollo/client/core";

    export const MOVIE_QUERY = gql`
      query getMovie($id: String!) {
        movie(id: $id) @rest(type: "Movie", path: "/movie/{args.id}") {
          id
          title
          backdrop_path
          release_date
          overview
          vote_average
          vote_count
        }
      }
    `;
    ```
8. Edit file `src/components/MoviePreview.vue`
    ```typescript
    const props = defineProps<{
      id: number;
    }>();

    const { result } = useQuery<{ movie: FullMovie }>(MOVIE_QUERY, {
      id: props.id,
    });
    ```
## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [VS Code Apollo](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)

## Recommended browser extension

- [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## TMDB HTTP endpoints
TMDB `API_URL` - `https://api.themoviedb.org/3` 

Movie Details
```http
GET {API_URL}/movie/338953?api_key={API_KEY} HTTP/1.1
```
Popular movies
```http
GET {API_URL}/movie/popular?api_key={API_KEY} HTTP/1.1
```
Top Rated movies
```http
GET {API_URL}/movie/top_rated?api_key={API_KEY} HTTP/1.1
```
Now playing movies
```http
GET {API_URL}/movie/now_playing?api_key={API_KEY} HTTP/1.1
```
Upcoming movies
```http
GET {API_URL}/movie/upcoming?api_key={API_KEY} HTTP/1.1
```
Trending movies
```http
GET {API_URL}/trending/movie/week?api_key={API_KEY} HTTP/1.1
```
