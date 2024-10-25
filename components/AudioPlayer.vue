<template>
  <div class="fixed bottom-0 left-0 right-0 z-50">
    <!-- Mini player stays the same -->
    <div v-if="isCollapsed"
      class="w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800 py-2 px-4 cursor-pointer"
      @click="isCollapsed = false">
      <!-- ... mini player content ... -->
    </div>

    <!-- Full player with updated layout -->
    <div v-else class="w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800 px-4 pt-2 pb-4">
      <div class="flex justify-end">
        <UButton color="white" variant="ghost" icon="i-heroicons-chevron-down" size="xs" @click="isCollapsed = true" />
      </div>

      <audio ref="audio" :src="audioSrc" />

      <div class="flex items-start lg:items-center">
        <!-- Track Info - Left aligned -->
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

        <!-- Progress and Controls - Centered -->
        <div class="flex-1 flex flex-col items-center">
          <!-- Progress Bar Container -->
          <div class="w-full max-w-2xl px-6 mb-3">
            <USlider v-model="sliderValue" :min="0" :max="duration" :step="0.1" @update:model-value="handleSeek" />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-center space-x-6">
            <UButton color="white" variant="ghost" @click="skipBackward">
              <div class="flex items-center text-sm">
                <span class="i-heroicons-backward-15 mr-1" />
                15
              </div>
            </UButton>
            <UButton color="white" variant="ghost" size="xl" :icon="playing ? 'i-heroicons-pause' : 'i-heroicons-play'"
              @click="playing = !playing" />
            <UButton color="white" variant="ghost" @click="skipForward">
              <div class="flex items-center text-sm">
                15
                <span class="i-heroicons-forward-15 ml-1" />
              </div>
            </UButton>
          </div>
        </div>

        <!-- Empty div for balance -->
        <div class="w-72 flex-shrink-0 hidden lg:block"></div>
      </div>
    </div>
  </div>

  <!-- Spacer -->
  <div :style="{ height: isCollapsed ? '64px' : '140px' }" class="w-full"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMediaControls } from '@vueuse/core'


const audio = ref()
const isCollapsed = ref(false)
const sliderValue = ref(0)

const store = useAudioPlayerStore()
const { audioSrc,coverArt,title,artist } = storeToRefs(store)

console.log(audioSrc.value)

const {
  playing,
  currentTime,
  duration
} = useMediaControls(audio, {
  src: audioSrc.value
})

watch(currentTime, (newTime) => {
  sliderValue.value = newTime
})

const handleSeek = (value) => {
  if (audio.value) {
    audio.value.currentTime = value
  }
}

const formatTime = (time) => {
  if (!time) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const skipForward = () => {
  if (audio.value) {
    audio.value.currentTime = Math.min(currentTime.value + 15, duration.value)
  }
}

const skipBackward = () => {
  if (audio.value) {
    audio.value.currentTime = Math.max(currentTime.value - 15, 0)
  }
}
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