<template>
    <div class="flex items-start space-x-4 w-72 flex-shrink-0">
        <div class="w-16 h-16 flex-shrink-0 bg-gray-800 rounded">
            <img v-if="coverArt" :src="coverArt" alt="Album Art" class="w-full h-full object-cover rounded">
        </div>
        <div class="min-w-0 flex-1 pt-1">
            <div class="overflow-hidden">
                <h3 :class="[
                'text-lg font-semibold text-white whitespace-nowrap',
                title.length > 25 ? 'animate-scroll hover:pause' : ''
            ]">
                    {{ title }}
                </h3>
            </div>
            <div class="overflow-hidden">
                <p :class="[
                'text-sm text-gray-400 whitespace-nowrap',
                artist.length > 25 ? 'animate-scroll hover:pause' : ''
            ]">
                    {{ artist }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const store = useAudioPlayerStore()
const { coverArt, title, artist } = storeToRefs(store)

</script>
<style>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-scroll {
    display: inline-block;
    padding-right: 2rem;
    animation: scroll 15s linear infinite;
}

.animate-scroll.pause {
    animation-play-state: paused;
}

.hover\:pause:hover {
    animation-play-state: paused;
}
</style>