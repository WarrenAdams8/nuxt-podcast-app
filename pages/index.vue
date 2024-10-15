<template>
  <h1>Hello World</h1>
  <p v-for="feed in data">{{ feed.title }}</p>
</template>
<script setup lang="ts">
import type { Feed } from "~/types/PodcastTypes"
const { data, error } = await useFetch<Feed[]>("/api/podcastFetcher");


if (error.value) {
  console.error("Error fetching podcast data:", error.value);
} 
</script>
