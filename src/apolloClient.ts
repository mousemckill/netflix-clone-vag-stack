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
