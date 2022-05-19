<script setup lang="ts">
import originals from "../assets/originals.json";
import MoviesSection from "./MoviesSection.vue";
</script>

<template>
  <MoviesSection title="Originals" :items="originals.results" />
</template>
