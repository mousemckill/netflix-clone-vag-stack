<script setup lang="ts">
import popular from "../assets/popular.json"
import MoviesSection from "./MoviesSection.vue"
</script>

<template>
  <MoviesSection title="Popular" :items="popular.results" />
</template>
