<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";

import { UPCOMING_MOVIES_QUERY } from "../graphql/queries/getUpcomingMovies";
import { UpcomingMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<UpcomingMovies>(UPCOMING_MOVIES_QUERY);
const movies = computed(() => result.value?.upcomingMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Upcoming" :items="movies" />
</template>
