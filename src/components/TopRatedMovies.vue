<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { TOP_RATED_MOVIES } from "../graphql/queries/getTopRatedMovies";
import { TopRatedMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<TopRatedMovies>(TOP_RATED_MOVIES);
const movies = computed(() => result.value?.topRatedMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Top rated" :items="movies" />
</template>
