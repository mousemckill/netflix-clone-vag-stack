<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { GET_TRENDING_MOVIES_QUERY } from "../graphql/queries/getTrendingMovies";
import { TrendingMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<TrendingMovies>(GET_TRENDING_MOVIES_QUERY);
const movies = computed(() => result.value?.trendingMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Trending" :items="movies" />
</template>
