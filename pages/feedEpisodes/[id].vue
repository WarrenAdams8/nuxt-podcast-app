<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
            <h1
                class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                {{ feedInfo?.feed?.title }}
            </h1>

            <!-- Image with shadow and rounded corners -->
            <div class="mb-8 flex justify-center">
                <NuxtImg :src="feedInfo?.feed?.image" width="300" height="300" fit="contain"
                    class="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300" loading="eager"
                    :alt="feedInfo?.feed?.title" />
            </div>

            <!-- Description with better typography and max width -->
            <div class="max-w-2xl mx-auto">
                <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {{ feedInfo?.feed?.description }}
                </p>
            </div>
        </div>

        <USeparator size="lg" class="my-8" />

        <!-- Episodes List -->
        <div class="space-y-4">
            <div v-for="episode in episodes" :key="episode.id"
                @click="store.changeEpisode(episode, feedInfo?.feed?.author)" class="group p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer 
            transition-all duration-200 rounded-xl border border-gray-200 
            dark:border-gray-700 hover:shadow-md">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <UIcon :name="audioSrc === episode.enclosureUrl && store.playing
                    ? 'i-heroicons-pause'
                    : 'i-heroicons-play'"
                            class="w-8 h-8 text-primary-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-lg mb-1 truncate"
                            :class="{ 'text-primary-500': audioSrc === episode.enclosureUrl }">
                            {{ episode.title }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ episode.persons }}
                        </p>
                    </div>
                </div>
            </div>
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


</script>