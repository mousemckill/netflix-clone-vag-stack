<script setup lang="ts">
import { computed } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";

import ThumbUpIcon from "../assets/thumb-up.svg";
import ThumbDownIcon from "../assets/thumb-down.svg";
import Close from "../assets/close.svg";
import { FullMovie } from "../typings/Movie";
import { MOVIE_QUERY } from "../graphql/queries/getMovie";
import { addLikeMutation } from "../graphql/mutations/addLike";

const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

const props = defineProps<{
  id: number;
}>();

const { result } = useQuery<{ movie: FullMovie }>(MOVIE_QUERY, {
  id: props.id,
});

const emits = defineEmits<{
  (event: "close"): void;
}>();

const movie = computed(() => result.value?.movie);
const imageFullPath = computed(
  () => `${POSTER_PREFIX}${movie.value?.backdrop_path}`
);

const year = computed(() => movie.value?.release_date?.split("-")[0]);

const { mutate: like } = useMutation<{}, { id: number }>(addLikeMutation, {
  update: (cache, {}, { variables }) => {
    const id = variables!.id;

    cache.modify({
      id: cache.identify({ __typename: "Movie", id }),
      fields: {
        vote_count: (cachedValue) => {
          return cachedValue + 1;
        },
      },
    });
  },
});
</script>

<template>
  <div class="absolute justify-center flex top-0 left-0 w-full h-full">
    <div
      role="dialog"
      class="absolute w-2/3 drop-shadow-lg z-50 top-10 rounded-lg overflow-hidden bg-black"
    >
      <div class="relative overflow-hidden bg-black">
        <div class="w-full overflow-hidden pt-[calc(9/16*100%)]">
          <img
            v-if="movie"
            :src="imageFullPath"
            :alt="movie.title"
            class="absolute top-0 left-0"
          />
        </div>
      </div>
      <div class="px-10 py-5" v-if="movie">
        <div class="mb-4 flex items-center">
          {{ year }}
          <span class="w-4"></span>
          <button @click="like({ id: movie!.id })">
            <ThumbUpIcon />
          </button>
          <span class="px-2 font-bold">{{ movie.vote_average }}</span>
          <button>
            <ThumbDownIcon />
          </button>
          <span class="pl-2">({{ movie.vote_count }})</span>
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
        <div>
          {{ movie.overview }}
        </div>
      </div>
      <button
        class="absolute top-2 right-2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center"
        @click="emits('close')"
      >
        <Close />
      </button>
    </div>
  </div>
  <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-30"></div>
</template>

<style></style>
