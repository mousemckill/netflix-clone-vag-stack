<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { NOW_PLAYING_MOVIES_QUERY } from "../graphql/queries/getNowPlayingMovies";
import { NowPlayingMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<NowPlayingMovies>(NOW_PLAYING_MOVIES_QUERY);
const movies = computed(() => result.value?.nowPlayingMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Now playing" :items="movies" />
</template>
