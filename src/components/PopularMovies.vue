<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { POPULAR_MOVIES_QUERY } from "../graphql/queries/getPopularMovies";
import { PopularMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<PopularMovies>(POPULAR_MOVIES_QUERY);
const movies = computed(() => result.value?.popularMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Popular" :items="movies" />
</template>
