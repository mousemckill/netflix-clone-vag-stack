<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { ORIGINAL_MOVIES_QUERY } from "../graphql/queries/getOriginalMovies";
import { OriginalsMovies } from "../typings/Movie";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery<OriginalsMovies>(ORIGINAL_MOVIES_QUERY);
const movies = computed(() => result.value?.originalMovies.results ?? []);
</script>

<template>
  <MoviesSection title="Originals" :items="movies" />
</template>
