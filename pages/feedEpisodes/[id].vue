<template>
    <h1>Hello episodes from feed {{ id }}</h1>
    <div v-for="episode in episodes">
        <NuxtImg :src="episode.feedImage" width="100" height="100" fit="contain" />
        <p>{{ episode.title }}</p>
    </div>
</template>
<script setup lang="ts">
import type { EpisodeItem } from '~/types/PodcastFeedEpisodesTypes';

const { id } = useRoute().params

const { data: episodes, error } = useFetch<EpisodeItem[]>(`/api/podcastFeedEpisodes?feedId=${id}`)



</script>