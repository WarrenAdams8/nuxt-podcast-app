<template>
  <h1>{{ debouncedSearchQuery }}</h1>
  <input v-model="searchQuery" placeholder="search" />

  <div v-for="feed in feeds">
    <NuxtLink :to="{ name: 'feedEpisodes-id', params: { id: feed.id } }">
      <h1>{{ feed.title }}</h1>
      <NuxtImg :src="feed.artwork" width="400" height="400" fit="contain" />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import type { Feed } from "~/types/PodcastTypes";

const searchQuery = ref("At the letters");
const debouncedSearchQuery = refDebounced(searchQuery, 800);

const { data: feeds, error } = await useLazyAsyncData<Feed[]>(
  `searchQuery:${debouncedSearchQuery.value}`,
  () =>
   // @ts-ignore
    $fetch(`/api/podcastFeedByTerm?searchQuery=${debouncedSearchQuery.value}`),
  {
    watch: [debouncedSearchQuery],
  },
);

if (error.value) {
  console.error("Error fetching podcast data:", error.value);
}
</script>
