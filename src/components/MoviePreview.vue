<script setup lang="ts">
import { computed } from "vue";

import ThumbUpIcon from "../assets/thumb-up.svg";
import ThumbDownIcon from "../assets/thumb-down.svg";
import Close from "../assets/close.svg";

const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

const props = defineProps<{
  imageUrl: string;
  title: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
}>();

const emits = defineEmits<{
  (event: "close"): void;
}>();

const imageFullPath = computed(() => `${POSTER_PREFIX}${props.imageUrl}`);

const year = computed(() => props.releaseDate.split("-")[0]);
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
            :src="imageFullPath"
            :alt="props.title"
            class="absolute top-0 left-0"
          />
        </div>
      </div>
      <div class="px-10 py-5">
        <div class="mb-4 flex items-center">
          {{ year }}
          <span class="w-4"></span>
          <button>
            <ThumbUpIcon />
          </button>
          <span class="px-2 font-bold">{{ props.voteAverage }}</span>
          <button>
            <ThumbDownIcon />
          </button>
          <span class="pl-2">({{ props.voteCount }})</span>
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ props.title }}</h2>
        <div>
          {{ props.overview }}
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
