<template>
    <NuxtImg :src="feedInfo?.feed?.image" width="300" height="300" fit="contain" />
    <h3>{{ feedInfo?.feed?.description }}</h3>
    <USeparator size="lg" />
    <div v-for="episode in episodes">
        <div @click="changeAudioPlayer(episode)">
            <p>{{ episode.title }}</p>
            <p>{{ episode.persons}}</p>
            <USeparator size="lg" />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { EpisodeItem } from '~/types/PodcastFeedEpisodesTypes';
import type { FeedInfo } from '~/types/PodcastFeedTypes';

const { id } = useRoute().params

const { data: feedInfo, error: feedInfoError } = useLazyFetch<FeedInfo>(`/api/podcastFeedById?feedId=${id}`)
const { data: episodes, error } = useLazyFetch<EpisodeItem[]>(`/api/podcastFeedEpisodes?feedId=${id}`)

const store = useAudioPlayerStore()
const { audioSrc, coverArt, title, artist } = storeToRefs(store)

const changeAudioPlayer = (episode: EpisodeItem) =>{
    title.value = episode.title,
    audioSrc.value = episode.enclosureUrl,
    coverArt.value = episode.feedImage
    if(feedInfo){
        artist.value = feedInfo.value?.feed?.author || "unknown artist"
    }
}




</script>